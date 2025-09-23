import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "../../../lib/auth"
import connectDB from "../../../lib/mongodb"
import Cart from "../../../models/Cart"
import Product from "../../../models/Product"
import mongoose from "mongoose"
import { seedProducts } from "../../../lib/seed-db"

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    await connectDB()
    
    // Ensure products are seeded
    await seedProducts()

    const userId = new mongoose.Types.ObjectId(session.user.id)
    console.log("Looking for cart with userId:", userId)

    const cart = await Cart.findOne({ 
      userId: userId
    }).populate({
      path: "items.productId",
      model: Product
    })

    console.log("Found cart:", cart)

    if (!cart) {
      return NextResponse.json({ items: [], totalAmount: 0 })
    }

    // Transform cart items to match frontend format and filter out any items with missing products
    const items = cart.items
      .filter((item: any) => item.productId) // Filter out items where product no longer exists
      .map((item: any) => ({
        id: item.productId._id.toString(),
        name: item.productId.name,
        price: item.price,
        image: item.productId.image,
        quantity: item.quantity,
        category: item.productId.category,
      }))

    return NextResponse.json({ items, totalAmount: cart.totalAmount })
  } catch (error) {
    console.error("Cart GET error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { items } = await request.json()
    console.log("Received items to save:", items)

    await connectDB()

    // Calculate total amount
    const totalAmount = items.reduce((sum: number, item: any) => sum + item.price * item.quantity, 0)

    // Transform items to match database format
    const cartItems = items.map((item: any) => {
      try {
        return {
          productId: new mongoose.Types.ObjectId(item.id),
          quantity: item.quantity,
          price: item.price,
        }
      } catch (error) {
        console.error(`Error converting ID ${item.id} to ObjectId:`, error)
        throw new Error(`Invalid product ID format: ${item.id}`)
      }
    })

    const userId = new mongoose.Types.ObjectId(session.user.id)
    console.log("Updating cart for userId:", userId)
    
    const updatedCart = await Cart.findOneAndUpdate(
      { userId: userId },
      {
        items: cartItems,
        totalAmount,
      },
      { upsert: true, new: true },
    )

    console.log("Updated cart:", updatedCart)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Cart POST error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
