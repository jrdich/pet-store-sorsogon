import { type NextRequest, NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import connectDB from "../../../../lib/mongodb"
import User from "../../../../models/User"

export async function POST(request: NextRequest) {
  try {
    const { name, email, password } = await request.json()

    if (!name || !email || !password) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    await connectDB()

    // Check if user already exists (case-insensitive)
    const existingUser = await User.findOne({ 
      email: { $regex: new RegExp(`^${email}$`, 'i') }
    })
    if (existingUser) {
      return NextResponse.json({ error: "User already exists" }, { status: 400 })
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12)

    // Create user
    const user = await User.create({
      name,
      email: email.toLowerCase(), // Store email in lowercase
      password: hashedPassword,
      role: "user",
    })

    return NextResponse.json({ message: "User created successfully", userId: user._id }, { status: 201 })
  } catch (error) {
    console.error("Registration error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
