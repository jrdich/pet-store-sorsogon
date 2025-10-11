import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "../../../lib/auth"
import connectDB from "../../../lib/mongodb"
import ServiceBooking from "../../../models/ServiceBooking"
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    await connectDB()

    const bookings = await ServiceBooking.find({ userId: session.user.id }).sort({ date: 1, time: 1 })

    return NextResponse.json({ bookings })
  } catch (error) {
    console.error("Service bookings GET error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { serviceId, serviceName, petName, petType, date, time, notes, customerName, customerEmail, customerPhone, price } = await request.json()

    if (!serviceId || !serviceName || !petName || !petType || !date || !time || !customerName || !customerEmail || !customerPhone || !price) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    await connectDB()

    const booking = await ServiceBooking.create({
      userId: session.user.id,
      serviceId,
      serviceName,
      petName,
      petType,
      date: new Date(date),
      time,
      notes: notes || "",
      customerName,
      customerEmail,
      customerPhone,
      price,
      status: "pending",
    })

    // Send confirmation email
    try {
      await resend.emails.send({
        from: "PZS Pet Store <noreply@petstore.com>",
        to: [customerEmail],
        subject: "Service Booking Confirmation",
        html: `
          <h2>Service Booking Confirmed</h2>
          <p>Dear ${customerName},</p>
          <p>Your service booking has been confirmed with the following details:</p>
          <ul>
            <li><strong>Service:</strong> ${serviceName}</li>
            <li><strong>Pet:</strong> ${petName} (${petType})</li>
            <li><strong>Date:</strong> ${new Date(date).toLocaleDateString()}</li>
            <li><strong>Time:</strong> ${time}</li>
            <li><strong>Price:</strong> ₱${price}</li>
          </ul>
          <p>We will contact you soon to confirm your appointment.</p>
          <p>Thank you for choosing PZS Pet Store!</p>
        `,
      })
    } catch (emailError) {
      console.error("Email sending failed:", emailError)
    }

    return NextResponse.json({ booking }, { status: 201 })
  } catch (error) {
    console.error("Service bookings POST error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}