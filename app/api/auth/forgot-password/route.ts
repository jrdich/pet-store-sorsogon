import { NextRequest, NextResponse } from "next/server"
import crypto from "crypto"
import connectDB from "@/lib/mongodb"
import User from "@/models/User"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email } = body

    console.log("Forgot password request for:", email)

    if (!email || !email.trim()) {
      console.log("No email provided")
      return NextResponse.json({ error: "Email is required" }, { status: 400 })
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      console.log("Invalid email format")
      return NextResponse.json({ error: "Invalid email format" }, { status: 400 })
    }

    await connectDB()
    console.log("Database connected")

    const user = await User.findOne({ email: email.toLowerCase() })
    if (!user) {
      console.log("User not found for email:", email)
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    const resetToken = crypto.randomBytes(32).toString("hex")
    const resetTokenExpiry = new Date(Date.now() + 3600000)

    user.resetToken = resetToken
    user.resetTokenExpiry = resetTokenExpiry
    await user.save()

    // Verify the token was saved
    const savedUser = await User.findOne({ email: email.toLowerCase() })
    console.log("Token saved:", savedUser.resetToken === resetToken)
    console.log("Expiry saved:", savedUser.resetTokenExpiry)
    console.log("Reset token generated for user:", email)

    return NextResponse.json({ 
      message: "Password reset token generated",
      resetToken
    })

  } catch (error) {
    console.error("Forgot password error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}