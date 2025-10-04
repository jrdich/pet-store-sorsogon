import { NextRequest, NextResponse } from 'next/server'
import { MongoClient } from 'mongodb'

const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017'
const dbName = process.env.MONGODB_DB || 'petstore'

export async function GET() {
  try {
    const client = new MongoClient(uri)
    await client.connect()
    const db = client.db(dbName)
    const products = await db.collection('products').find({}).toArray()
    await client.close()
    
    return NextResponse.json(products)
  } catch (error) {
    console.error('Error fetching products:', error)
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const client = new MongoClient(uri)
    await client.connect()
    const db = client.db(dbName)
    const productData = await request.json()
    
    const newProduct = {
      ...productData,
      createdAt: new Date(),
      updatedAt: new Date()
    }
    
    const result = await db.collection('products').insertOne(newProduct)
    await client.close()
    
    return NextResponse.json({ 
      success: true, 
      id: result.insertedId,
      product: { ...newProduct, _id: result.insertedId }
    })
  } catch (error) {
    console.error('Error creating product:', error)
    return NextResponse.json({ error: 'Failed to create product' }, { status: 500 })
  }
}