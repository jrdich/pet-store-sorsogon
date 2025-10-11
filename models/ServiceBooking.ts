import mongoose, { type Document, Schema } from "mongoose"

export interface IServiceBooking extends Document {
  userId: mongoose.Types.ObjectId
  serviceId: string
  serviceName: string
  petName: string
  petType: string
  date: Date
  time: string
  notes?: string
  customerName: string
  customerEmail: string
  customerPhone: string
  status: "pending" | "confirmed" | "completed" | "cancelled"
  price: number
  createdAt: Date
  updatedAt: Date
}

const ServiceBookingSchema = new Schema<IServiceBooking>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    serviceId: {
      type: String,
      required: true,
    },
    serviceName: {
      type: String,
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
    customerName: {
      type: String,
      required: true,
    },
    customerEmail: {
      type: String,
      required: true,
    },
    customerPhone: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "confirmed", "completed", "cancelled"],
      default: "pending",
    },
    price: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  },
)

export default mongoose.models.ServiceBooking || mongoose.model<IServiceBooking>("ServiceBooking", ServiceBookingSchema)