import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "../../../lib/auth"
import connectDB from "../../../lib/mongodb"
import Appointment from "../../../models/Appointment"

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    await connectDB()

    const appointments = await Appointment.find({ userId: session.user.id }).sort({ date: 1, time: 1 })

    return NextResponse.json({ appointments })
  } catch (error) {
    console.error("Appointments GET error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { petName, petType, service, date, time, notes } = await request.json()

    if (!petName || !petType || !service || !date || !time) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    await connectDB()

    // Check if the time slot is already taken
    const existingAppointment = await Appointment.findOne({
      date: new Date(date),
      time,
      status: { $ne: "cancelled" },
    })

    if (existingAppointment) {
      return NextResponse.json({ error: "Time slot is already booked" }, { status: 409 })
    }

    const appointment = await Appointment.create({
      userId: session.user.id,
      petName,
      petType,
      service,
      date: new Date(date),
      time,
      notes: notes || "",
      status: "pending",
    })

    return NextResponse.json({ appointment }, { status: 201 })
  } catch (error) {
    console.error("Appointments POST error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
