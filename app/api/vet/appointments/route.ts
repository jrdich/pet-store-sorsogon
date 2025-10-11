import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "../../../../lib/auth"
import connectDB from "../../../../lib/mongodb"
import Appointment from "../../../../models/Appointment"
import User from "../../../../models/User"

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user || session.user.role !== "veterinarian") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    await connectDB()

    const appointments = await Appointment.find({})
      .populate("userId", "name email")
      .sort({ date: 1, time: 1 })

    const appointmentsWithUser = appointments.map(appointment => ({
      ...appointment.toObject(),
      user: appointment.userId
    }))

    return NextResponse.json({ appointments: appointmentsWithUser })
  } catch (error) {
    console.error("Vet appointments GET error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}