import mongoose, { type Document, Schema } from "mongoose"

export interface IProduct extends Document {
  name: string
  description: string
  price: number
  category: "food" | "toys" | "accessories" | "health" | "grooming"
  petType: "dog" | "cat" | "bird" | "fish" | "small-pets" | "all"
  image: string
  stock: number
  featured: boolean
  createdAt: Date
  updatedAt: Date
}

const ProductSchema = new Schema<IProduct>(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      enum: ["food", "toys", "accessories", "health", "grooming"],
      required: true,
    },
    petType: {
      type: String,
      enum: ["dog", "cat", "bird", "fish", "small-pets", "all"],
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    stock: {
      type: Number,
      required: true,
      default: 0,
    },
    featured: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
)

export default mongoose.models.Product || mongoose.model<IProduct>("Product", ProductSchema)
