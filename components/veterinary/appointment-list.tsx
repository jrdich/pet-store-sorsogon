"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Button } from "../ui/button"
import { Badge } from "../ui/badge"
import { Calendar, Clock, User, Stethoscope, Trash2 } from "lucide-react"
import { format } from "date-fns"

interface Appointment {
  _id: string
  petName: string
  petType: string
  service: string
  date: string
  time: string
  notes?: string
  status: "pending" | "confirmed" | "completed" | "cancelled"
}

export function AppointmentList() {
  const { data: session } = useSession()
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (session) {
      fetchAppointments()
    }
  }, [session])

  const fetchAppointments = async () => {
    try {
      const response = await fetch("/api/appointments")
      if (response.ok) {
        const data = await response.json()
        setAppointments(data.appointments)
      }
    } catch (error) {
      console.error("Failed to fetch appointments:", error)
    } finally {
      setLoading(false)
    }
  }

  const cancelAppointment = async (appointmentId: string) => {
    try {
      const response = await fetch(`/api/appointments/${appointmentId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: "cancelled" }),
      })

      if (response.ok) {
        fetchAppointments() // Refresh the list
      }
    } catch (error) {
      console.error("Failed to cancel appointment:", error)
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

  const getServiceLabel = (service: string) => {
    const labels: Record<string, string> = {
      checkup: "General Checkup",
      vaccination: "Vaccination",
      surgery: "Surgery Consultation",
      grooming: "Medical Grooming",
      emergency: "Emergency Care",
    }
    return labels[service] || service
  }

  if (!session) {
    return (
      <Card>
        <CardContent className="p-6 text-center">
          <p className="text-muted-foreground">Please sign in to view your appointments</p>
        </CardContent>
      </Card>
    )
  }

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6 text-center">
          <p className="text-muted-foreground">Loading appointments...</p>
        </CardContent>
      </Card>
    )
  }

  if (appointments.length === 0) {
    return (
      <Card>
        <CardContent className="p-6 text-center">
          <Stethoscope className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
          <p className="text-muted-foreground">No appointments scheduled yet</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Your Appointments</h2>
      {appointments.map((appointment) => (
        <Card key={appointment._id}>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center">
                <User className="mr-2 h-5 w-5" />
                {appointment.petName}
              </CardTitle>
              <Badge className={getStatusColor(appointment.status)}>
                {appointment.status === "confirmed" ? "Approved" : appointment.status}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex items-center text-sm">
                  <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                  {format(new Date(appointment.date), "EEEE, MMMM d, yyyy")}
                </div>
                <div className="flex items-center text-sm">
                  <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                  {appointment.time}
                </div>
                <div className="flex items-center text-sm">
                  <Stethoscope className="mr-2 h-4 w-4 text-muted-foreground" />
                  {getServiceLabel(appointment.service)}
                </div>
              </div>
              <div className="space-y-2">
                <div className="text-sm">
                  <span className="font-medium">Pet Type:</span> {appointment.petType}
                </div>
                {appointment.notes && (
                  <div className="text-sm">
                    <span className="font-medium">Notes:</span> {appointment.notes}
                  </div>
                )}
              </div>
            </div>
            {appointment.status === "pending" && (
              <div className="mt-4 flex justify-end">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => cancelAppointment(appointment._id)}
                  className="text-destructive hover:text-destructive"
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Cancel
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
