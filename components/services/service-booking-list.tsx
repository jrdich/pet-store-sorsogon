"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Button } from "../ui/button"
import { Badge } from "../ui/badge"
import { Calendar, Clock, User, Scissors, Trash2 } from "lucide-react"
import { format } from "date-fns"

interface ServiceBooking {
  _id: string
  serviceId: string
  serviceName: string
  petName: string
  petType: string
  date: string
  time: string
  notes?: string
  customerName: string
  customerEmail: string
  customerPhone: string
  status: "pending" | "confirmed" | "completed" | "cancelled"
  price: number
}

export function ServiceBookingList() {
  const { data: session } = useSession()
  const [bookings, setBookings] = useState<ServiceBooking[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (session) {
      fetchBookings()
    }
  }, [session])

  const fetchBookings = async () => {
    try {
      const response = await fetch("/api/service-bookings")
      if (response.ok) {
        const data = await response.json()
        setBookings(data.bookings)
      }
    } catch (error) {
      console.error("Failed to fetch service bookings:", error)
    } finally {
      setLoading(false)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "confirmed":
        return "bg-green-100 text-green-800"
      case "completed":
        return "bg-blue-100 text-blue-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  if (!session) {
    return (
      <Card>
        <CardContent className="p-6 text-center">
          <p className="text-muted-foreground">Please sign in to view your service bookings</p>
        </CardContent>
      </Card>
    )
  }

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6 text-center">
          <p className="text-muted-foreground">Loading service bookings...</p>
        </CardContent>
      </Card>
    )
  }

  if (bookings.length === 0) {
    return (
      <Card>
        <CardContent className="p-6 text-center">
          <Scissors className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
          <p className="text-muted-foreground">No service bookings yet</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Your Service Bookings</h2>
      {bookings.map((booking) => (
        <Card key={booking._id}>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center">
                <Scissors className="mr-2 h-5 w-5" />
                {booking.serviceName}
              </CardTitle>
              <Badge className={getStatusColor(booking.status)}>
                {booking.status === "confirmed" ? "Approved" : booking.status}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex items-center text-sm">
                  <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                  {format(new Date(booking.date), "EEEE, MMMM d, yyyy")}
                </div>
                <div className="flex items-center text-sm">
                  <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                  {booking.time}
                </div>
                <div className="text-sm">
                  <span className="font-medium">Pet:</span> {booking.petName} ({booking.petType})
                </div>
              </div>
              <div className="space-y-2">
                <div className="text-sm">
                  <span className="font-medium">Price:</span> ₱{booking.price}
                </div>
                <div className="text-sm">
                  <span className="font-medium">Phone:</span> {booking.customerPhone}
                </div>
                {booking.notes && (
                  <div className="text-sm">
                    <span className="font-medium">Notes:</span> {booking.notes}
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}