import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "../../../../../lib/auth"
import connectDB from "../../../../../lib/mongodb"
import ServiceBooking from "../../../../../models/ServiceBooking"

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user || session.user.role !== "veterinarian") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { status } = await request.json()

    if (!["pending", "confirmed", "completed", "cancelled"].includes(status)) {
      return NextResponse.json({ error: "Invalid status" }, { status: 400 })
    }

    await connectDB()
    const { id } = await params

    const booking = await ServiceBooking.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    )

    if (!booking) {
      return NextResponse.json({ error: "Service booking not found" }, { status: 404 })
    }

    return NextResponse.json({ booking })
  } catch (error) {
    console.error("Vet service booking PATCH error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user || session.user.role !== "veterinarian") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    await connectDB()
    const { id } = await params

    const booking = await ServiceBooking.findByIdAndDelete(id)

    if (!booking) {
      return NextResponse.json({ error: "Service booking not found" }, { status: 404 })
    }

    return NextResponse.json({ message: "Service booking deleted successfully" })
  } catch (error) {
    console.error("Vet service booking DELETE error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}