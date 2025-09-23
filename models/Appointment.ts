import mongoose, { type Document, Schema } from "mongoose"

export interface IAppointment extends Document {
  userId: mongoose.Types.ObjectId
  petName: string
  petType: string
  service: "checkup" | "vaccination" | "surgery" | "grooming" | "emergency"
  date: Date
  time: string
  notes?: string
  status: "pending" | "confirmed" | "completed" | "cancelled"
  createdAt: Date
  updatedAt: Date
}

const AppointmentSchema = new Schema<IAppointment>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    petName: {
      type: String,
      required: true,
    },
    petType: {
      type: String,
      required: true,
    },
    service: {
      type: String,
      enum: ["checkup", "vaccination", "surgery", "grooming", "emergency"],
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    notes: {
      type: String,
    },
    status: {
      type: String,
      enum: ["pending", "confirmed", "completed", "cancelled"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  },
)

export default mongoose.models.Appointment || mongoose.model<IAppointment>("Appointment", AppointmentSchema)
