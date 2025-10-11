import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "../../../../lib/auth"
import connectDB from "../../../../lib/mongodb"
import ServiceBooking from "../../../../models/ServiceBooking"
import User from "../../../../models/User"

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user || session.user.role !== "veterinarian") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    await connectDB()

    const bookings = await ServiceBooking.find({})
      .populate("userId", "name email")
      .sort({ date: 1, time: 1 })

    const bookingsWithUser = bookings.map(booking => ({
      ...booking.toObject(),
      user: booking.userId
    }))

    return NextResponse.json({ bookings: bookingsWithUser })
  } catch (error) {
    console.error("Vet service bookings GET error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}