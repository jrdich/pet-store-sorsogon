"use client"

import { useState, useEffect } from "react"
import { signOut } from "next-auth/react"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Button } from "../ui/button"
import { Badge } from "../ui/badge"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "../ui/alert-dialog"
import { Calendar, Clock, User, Stethoscope, CheckCircle, XCircle, LogOut, Trash2 } from "lucide-react"
import { format } from "date-fns"

interface Appointment {
  _id: string
  userId: string
  petName: string
  petType: string
  service: string
  date: string
  time: string
  notes?: string
  status: "pending" | "confirmed" | "completed" | "cancelled"
  user?: {
    name: string
    email: string
  }
}

export function VetDashboard() {
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [loading, setLoading] = useState(true)
  const [deleteLoading, setDeleteLoading] = useState<string | null>(null)

  useEffect(() => {
    fetchAllAppointments()
  }, [])

  const fetchAllAppointments = async () => {
    try {
      const response = await fetch("/api/vet/appointments")
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

  const updateAppointmentStatus = async (appointmentId: string, status: string) => {
    try {
      const response = await fetch(`/api/vet/appointments/${appointmentId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
      })

      if (response.ok) {
        fetchAllAppointments()
      }
    } catch (error) {
      console.error("Failed to update appointment:", error)
    }
  }

  const deleteAppointment = async (appointmentId: string) => {
    setDeleteLoading(appointmentId)
    try {
      const response = await fetch(`/api/vet/appointments/${appointmentId}`, {
        method: "DELETE",
      })

      if (response.ok) {
        fetchAllAppointments()
      }
    } catch (error) {
      console.error("Failed to delete appointment:", error)
    } finally {
      setDeleteLoading(null)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "confirmed":
        return "bg-blue-100 text-blue-800"
      case "completed":
        return "bg-green-100 text-green-800"
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

  const pendingCount = appointments.filter(apt => apt.status === "pending").length
  const confirmedCount = appointments.filter(apt => apt.status === "confirmed").length
  const completedCount = appointments.filter(apt => apt.status === "completed").length

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Loading dashboard...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <Stethoscope className="h-8 w-8 text-primary mr-3" />
            <h1 className="text-2xl font-bold">Veterinary Dashboard</h1>
          </div>
          <Button variant="outline" onClick={() => signOut()}>
            <LogOut className="mr-2 h-4 w-4" />
            Sign Out
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Appointments</p>
                  <p className="text-2xl font-bold">{appointments.length}</p>
                </div>
                <Calendar className="h-8 w-8 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Pending</p>
                  <p className="text-2xl font-bold text-yellow-600">{pendingCount}</p>
                </div>
                <Clock className="h-8 w-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Confirmed</p>
                  <p className="text-2xl font-bold text-blue-600">{confirmedCount}</p>
                </div>
                <CheckCircle className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Completed</p>
                  <p className="text-2xl font-bold text-green-600">{completedCount}</p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Appointments List */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">All Appointments</h2>
          {appointments.length === 0 ? (
            <Card>
              <CardContent className="p-6 text-center">
                <Stethoscope className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-muted-foreground">No appointments found</p>
              </CardContent>
            </Card>
          ) : (
            appointments.map((appointment) => (
              <Card key={appointment._id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center">
                      <User className="mr-2 h-5 w-5" />
                      {appointment.petName} - {appointment.user?.name || "Unknown User"}
                    </CardTitle>
                    <Badge className={getStatusColor(appointment.status)}>{appointment.status}</Badge>
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
                      <div className="text-sm">
                        <span className="font-medium">Owner:</span> {appointment.user?.email || "Unknown"}
                      </div>
                      {appointment.notes && (
                        <div className="text-sm">
                          <span className="font-medium">Notes:</span> {appointment.notes}
                        </div>
                      )}
                    </div>
                  </div>
                  {appointment.status === "pending" && (
                    <div className="mt-4 flex gap-2">
                      <Button
                        size="sm"
                        onClick={() => updateAppointmentStatus(appointment._id, "confirmed")}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        <CheckCircle className="mr-2 h-4 w-4" />
                        Approve
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => updateAppointmentStatus(appointment._id, "cancelled")}
                        className="text-destructive hover:text-destructive"
                      >
                        <XCircle className="mr-2 h-4 w-4" />
                        Reject
                      </Button>
                    </div>
                  )}
                  {appointment.status === "confirmed" && (
                    <div className="mt-4">
                      <Button
                        size="sm"
                        onClick={() => updateAppointmentStatus(appointment._id, "completed")}
                        className="bg-blue-600 hover:bg-blue-700"
                      >
                        <CheckCircle className="mr-2 h-4 w-4" />
                        Mark Complete
                      </Button>
                    </div>
                  )}
                  {(appointment.status === "completed" || appointment.status === "cancelled") && (
                    <div className="mt-4">
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            variant="destructive"
                            size="sm"
                            disabled={deleteLoading === appointment._id}
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            {deleteLoading === appointment._id ? "Deleting..." : "Delete"}
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete Appointment</AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to permanently delete this appointment for {appointment.petName}? This action cannot be undone and will remove the record from both veterinary and customer dashboards.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => deleteAppointment(appointment._id)}
                              className="bg-destructive text-white hover:bg-destructive/90"
                            >
                              Delete Permanently
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </main>
    </div>
  )
}