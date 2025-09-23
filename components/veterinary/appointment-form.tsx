"use client"

import type React from "react"

import { useState } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Textarea } from "../ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { Calendar } from "../ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { CalendarIcon, Clock } from "lucide-react"
import { format } from "date-fns"
import { cn } from "../../lib/utils"

export function AppointmentForm() {
  const { data: session } = useSession()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)
  const [availableSlots, setAvailableSlots] = useState<string[]>([])
  const [loadingSlots, setLoadingSlots] = useState(false)

  const [formData, setFormData] = useState({
    petName: "",
    petType: "",
    service: "",
    date: undefined as Date | undefined,
    time: "",
    notes: "",
  })

  const serviceOptions = [
    { value: "checkup", label: "General Checkup" },
    { value: "vaccination", label: "Vaccination" },
    { value: "surgery", label: "Surgery Consultation" },
    { value: "grooming", label: "Medical Grooming" },
    { value: "emergency", label: "Emergency Care" },
  ]

  const petTypeOptions = [
    { value: "dog", label: "Dog" },
    { value: "cat", label: "Cat" },
    { value: "bird", label: "Bird" },
    { value: "rabbit", label: "Rabbit" },
    { value: "hamster", label: "Hamster" },
    { value: "other", label: "Other" },
  ]

  const handleDateSelect = async (date: Date | undefined) => {
    setFormData({ ...formData, date, time: "" })

    if (date) {
      setLoadingSlots(true)
      try {
        const response = await fetch(`/api/appointments/available-slots?date=${date.toISOString().split("T")[0]}`)
        if (response.ok) {
          const data = await response.json()
          setAvailableSlots(data.availableSlots)
        }
      } catch (error) {
        console.error("Failed to fetch available slots:", error)
      } finally {
        setLoadingSlots(false)
      }
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    if (!session) {
      router.push("/auth/signin")
      return
    }

    try {
      const response = await fetch("/api/appointments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setSuccess(true)
        setFormData({
          petName: "",
          petType: "",
          service: "",
          date: undefined,
          time: "",
          notes: "",
        })
      } else {
        const data = await response.json()
        setError(data.error || "Failed to book appointment")
      }
    } catch (error) {
      setError("Something went wrong")
    } finally {
      setIsLoading(false)
    }
  }

  if (!session) {
    return (
      <Card className="max-w-md mx-auto">
        <CardHeader className="text-center">
          <CardTitle>Sign In Required</CardTitle>
          <CardDescription>Please sign in to book an appointment</CardDescription>
        </CardHeader>
        <CardContent>
          <Button asChild className="w-full">
            <a href="/auth/signin">Sign In</a>
          </Button>
        </CardContent>
      </Card>
    )
  }

  if (success) {
    return (
      <Card className="max-w-md mx-auto">
        <CardHeader className="text-center">
          <CardTitle className="text-green-600">Appointment Booked!</CardTitle>
          <CardDescription>We'll contact you soon to confirm your appointment</CardDescription>
        </CardHeader>
        <CardContent>
          <Button onClick={() => setSuccess(false)} className="w-full">
            Book Another Appointment
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Book Veterinary Appointment</CardTitle>
        <CardDescription>Schedule a visit for your pet with our professional veterinarians</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="petName">Pet Name *</Label>
              <Input
                id="petName"
                value={formData.petName}
                onChange={(e) => setFormData({ ...formData, petName: e.target.value })}
                placeholder="Enter your pet's name"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="petType">Pet Type *</Label>
              <Select value={formData.petType} onValueChange={(value) => setFormData({ ...formData, petType: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select pet type" />
                </SelectTrigger>
                <SelectContent>
                  {petTypeOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="service">Service Type *</Label>
            <Select value={formData.service} onValueChange={(value) => setFormData({ ...formData, service: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Select service type" />
              </SelectTrigger>
              <SelectContent>
                {serviceOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Preferred Date *</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !formData.date && "text-muted-foreground",
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {formData.date ? format(formData.date, "PPP") : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={formData.date}
                    onSelect={handleDateSelect}
                    disabled={(date) => date < new Date() || date.getDay() === 0} // Disable past dates and Sundays
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label htmlFor="time">Preferred Time *</Label>
              <Select
                value={formData.time}
                onValueChange={(value) => setFormData({ ...formData, time: value })}
                disabled={!formData.date || loadingSlots}
              >
                <SelectTrigger>
                  <SelectValue placeholder={loadingSlots ? "Loading..." : "Select time"} />
                </SelectTrigger>
                <SelectContent>
                  {availableSlots.map((slot) => (
                    <SelectItem key={slot} value={slot}>
                      <div className="flex items-center">
                        <Clock className="mr-2 h-4 w-4" />
                        {slot}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Additional Notes</Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              placeholder="Any specific concerns or information about your pet..."
              rows={3}
            />
          </div>

          {error && <div className="text-destructive text-sm">{error}</div>}

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Booking Appointment..." : "Book Appointment"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
