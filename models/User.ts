import mongoose, { type Document, Schema } from "mongoose"

export interface IUser extends Document {
  name: string
  email: string
  password?: string
  image?: string
  role: "user" | "admin" | "veterinarian"
  resetToken?: string
  resetTokenExpiry?: Date
  createdAt: Date
  updatedAt: Date
}

const UserSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
    },
    image: {
      type: String,
    },
    role: {
      type: String,
      enum: ["user", "admin", "veterinarian"],
      default: "user",
    },
    resetToken: {
      type: String,
    },
    resetTokenExpiry: {
      type: Date,
    },
  },
  {
    timestamps: true,
  },
)

// Clear the cached model to ensure schema updates are applied
if (mongoose.models.User) {
  delete mongoose.models.User
}

export default mongoose.model<IUser>("User", UserSchema)
