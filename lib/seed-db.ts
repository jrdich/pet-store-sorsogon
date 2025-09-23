import mongoose from "mongoose"
import { mockProducts } from "./mock-data"
import Product from "../models/Product"
import connectDB from "./mongodb"

export async function seedProducts() {
  try {
    await connectDB()
    
    // First, let's check if we already have products
    const existingProducts = await Product.find({})
    if (existingProducts.length > 0) {
      console.log("Products already seeded")
      return
    }

    // Transform mock products to match the Product model schema
    const productsToInsert = mockProducts.map(product => ({
      _id: new mongoose.Types.ObjectId(product.id), // Use the same ID from mock data
      name: product.name,
      description: product.description,
      price: product.price,
      category: product.category,
      petType: product.petType,
      image: product.image,
      stock: product.stock,
      featured: product.featured
    }))

    // Insert the products
    await Product.insertMany(productsToInsert)
    console.log("Products seeded successfully")
  } catch (error) {
    console.error("Error seeding products:", error)
    throw error
  }
}