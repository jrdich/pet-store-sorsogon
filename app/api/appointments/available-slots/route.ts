import { type NextRequest, NextResponse } from "next/server"
import connectDB from "../../../../lib/mongodb"
import Appointment from "../../../../models/Appointment"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const date = searchParams.get("date")

    if (!date) {
      return NextResponse.json({ error: "Date parameter is required" }, { status: 400 })
    }

    await connectDB()

    // Get all booked appointments for the date
    const bookedAppointments = await Appointment.find({
      date: new Date(date),
      status: { $ne: "cancelled" },
    }).select("time")

    const bookedTimes = bookedAppointments.map((apt) => apt.time)

    // Generate available time slots (9 AM to 5 PM, 30-minute intervals)
    const allTimeSlots = []
    for (let hour = 9; hour < 17; hour++) {
      allTimeSlots.push(`${hour.toString().padStart(2, "0")}:00`)
      allTimeSlots.push(`${hour.toString().padStart(2, "0")}:30`)
    }

    const availableSlots = allTimeSlots.filter((slot) => !bookedTimes.includes(slot))

    return NextResponse.json({ availableSlots })
  } catch (error) {
    console.error("Available slots GET error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
