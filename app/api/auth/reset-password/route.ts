import { NextRequest, NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import connectDB from "@/lib/mongodb"
import User from "@/models/User"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { token, password } = body

    console.log("Reset password request:", { token: token?.substring(0, 10) + "...", passwordLength: password?.length })

    if (!token || !password) {
      console.log("Missing token or password")
      return NextResponse.json({ error: "Token and password are required" }, { status: 400 })
    }

    if (password.length < 6) {
      console.log("Password too short")
      return NextResponse.json({ error: "Password must be at least 6 characters" }, { status: 400 })
    }

    await connectDB()
    console.log("Database connected for reset")

    // First check if any user has this token
    const userWithToken = await User.findOne({ resetToken: token })
    console.log("User with token exists:", !!userWithToken)
    
    if (userWithToken) {
      console.log("Token expiry:", userWithToken.resetTokenExpiry)
      console.log("Current time:", new Date())
      console.log("Token expired:", userWithToken.resetTokenExpiry < new Date())
    }

    const user = await User.findOne({
      resetToken: token,
      resetTokenExpiry: { $gt: new Date() }
    })

    console.log("User found with valid token:", !!user)

    if (!user) {
      console.log("Invalid or expired token")
      return NextResponse.json({ error: "Invalid or expired token" }, { status: 400 })
    }

    console.log("Token expiry:", user.resetTokenExpiry)

    const hashedPassword = await bcrypt.hash(password, 12)
    
    user.password = hashedPassword
    user.resetToken = undefined
    user.resetTokenExpiry = undefined
    await user.save()

    console.log("Password reset successful for user:", user.email)

    return NextResponse.json({ message: "Password reset successful" })

  } catch (error) {
    console.error("Reset password error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}