"use client"

import type React from "react"

import { useState } from "react"
import { signIn, getSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog"
import Link from "next/link"

export function SignInForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [forgotEmail, setForgotEmail] = useState("")
  const [resetToken, setResetToken] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [forgotStep, setForgotStep] = useState(1)
  const [forgotLoading, setForgotLoading] = useState(false)
  const [forgotError, setForgotError] = useState("")
  const [forgotSuccess, setForgotSuccess] = useState("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [loginType, setLoginType] = useState<"customer" | "veterinarian">("customer")
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      })

      if (result?.error) {
        setError("Invalid credentials")
      } else {
        const session = await getSession()
        if (session) {
          if (loginType === "veterinarian" && session.user.role === "veterinarian") {
            router.push("/vet-dashboard")
          } else if (loginType === "customer" && session.user.role !== "veterinarian") {
            router.push("/")
          } else {
            setError("Invalid login type for your account")
            return
          }
          router.refresh()
        }
      }
    } catch (error) {
      setError("Something went wrong")
    } finally {
      setIsLoading(false)
    }
  }

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setForgotLoading(true)
    setForgotError("")

    try {
      const response = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: forgotEmail }),
      })

      const data = await response.json()

      if (response.ok) {
        setResetToken(data.resetToken)
        setForgotStep(2)
        setForgotSuccess("Reset token generated!")
      } else {
        setForgotError(data.error || "Something went wrong")
      }
    } catch (error) {
      setForgotError("Something went wrong")
    } finally {
      setForgotLoading(false)
    }
  }

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setForgotLoading(true)
    setForgotError("")

    if (newPassword !== confirmPassword) {
      setForgotError("Passwords do not match")
      setForgotLoading(false)
      return
    }

    try {
      const response = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: resetToken, password: newPassword }),
      })

      const data = await response.json()

      if (response.ok) {
        setForgotSuccess("Password reset successful!")
        setTimeout(() => {
          setIsDialogOpen(false)
          setForgotStep(1)
          setForgotEmail("")
          setResetToken("")
          setNewPassword("")
          setConfirmPassword("")
          setForgotError("")
          setForgotSuccess("")
        }, 2000)
      } else {
        setForgotError(data.error || "Something went wrong")
      }
    } catch (error) {
      setForgotError("Something went wrong")
    } finally {
      setForgotLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold">Welcome Back</CardTitle>
        <CardDescription>Sign in to your PZS account</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 mb-6">
          <div className="grid grid-cols-2 gap-2">
            <Button
              type="button"
              variant={loginType === "customer" ? "default" : "outline"}
              onClick={() => setLoginType("customer")}
              className="w-full"
            >
              Customer Login
            </Button>
            <Button
              type="button"
              variant={loginType === "veterinarian" ? "default" : "outline"}
              onClick={() => setLoginType("veterinarian")}
              className="w-full"
            >
              Access the vet portal
            </Button>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Password</Label>
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <button type="button" className="text-sm text-primary hover:underline">
                    Forgot password?
                  </button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>{forgotStep === 1 ? "Forgot Password" : "Reset Password"}</DialogTitle>
                    <DialogDescription>
                      {forgotStep === 1 ? "Enter your email to get a reset token" : "Enter your new password"}
                    </DialogDescription>
                  </DialogHeader>
                  {forgotStep === 1 ? (
                    <form onSubmit={handleForgotPassword} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="forgotEmail">Email</Label>
                        <Input
                          id="forgotEmail"
                          type="email"
                          value={forgotEmail}
                          onChange={(e) => setForgotEmail(e.target.value)}
                          required
                        />
                      </div>
                      {forgotError && <div className="text-destructive text-sm">{forgotError}</div>}
                      {forgotSuccess && <div className="text-green-600 text-sm">{forgotSuccess}</div>}
                      <Button type="submit" className="w-full" disabled={forgotLoading}>
                        {forgotLoading ? "Sending..." : "Get Reset Token"}
                      </Button>
                    </form>
                  ) : (
                    <form onSubmit={handleResetPassword} className="space-y-4">
                      <div className="space-y-2">
                        <Label>Reset Token</Label>
                        <Input value={resetToken} disabled className="bg-gray-100" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="newPassword">New Password</Label>
                        <Input
                          id="newPassword"
                          type="password"
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="confirmPassword">Confirm Password</Label>
                        <Input
                          id="confirmPassword"
                          type="password"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          required
                        />
                      </div>
                      {forgotError && <div className="text-destructive text-sm">{forgotError}</div>}
                      {forgotSuccess && <div className="text-green-600 text-sm">{forgotSuccess}</div>}
                      <Button type="submit" className="w-full" disabled={forgotLoading}>
                        {forgotLoading ? "Resetting..." : "Reset Password"}
                      </Button>
                    </form>
                  )}
                </DialogContent>
              </Dialog>
            </div>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <div className="text-destructive text-sm text-center">{error}</div>}
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Signing in..." : "Sign In"}
          </Button>
        </form>
        {loginType === "customer" && (
          <div className="mt-4 text-center text-sm">
            Don't have an account?{" "}
            <Link href="/auth/signup" className="text-primary hover:underline">
              Sign up
            </Link>
          </div>
        )}
        {loginType === "veterinarian" && (
          <div className="mt-4 text-center text-sm text-muted-foreground">
            Veterinarian accounts are managed by administration.
          </div>
        )}
      </CardContent>
    </Card>
  )
}
