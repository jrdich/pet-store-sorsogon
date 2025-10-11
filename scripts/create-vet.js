const bcrypt = require("bcryptjs")
const mongoose = require("mongoose")

// User Schema
const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String },
  role: { type: String, enum: ["user", "admin", "veterinarian"], default: "user" },
}, { timestamps: true })

const User = mongoose.models.User || mongoose.model("User", UserSchema)

async function createVeterinarian() {
  try {
    // Connect to MongoDB
    const MONGODB_URI = "mongodb+srv://johnraphaelchavaria02_db_user:Chavaria%40143@petstore.hb8nhlr.mongodb.net/petstore?retryWrites=true&w=majority&appName=PetStore"
    await mongoose.connect(MONGODB_URI)
    console.log("Connected to MongoDB")

    // Check if veterinarian already exists
    const existingVet = await User.findOne({ email: "vet@petstore.com" })
    if (existingVet) {
      console.log("Veterinarian account already exists")
      return
    }

    // Hash password
    const hashedPassword = await bcrypt.hash("vet123", 12)

    // Create veterinarian user
    const veterinarian = await User.create({
      name: "Dr. Veterinarian",
      email: "vet@petstore.com",
      password: hashedPassword,
      role: "veterinarian"
    })

    console.log("Veterinarian account created successfully:")
    console.log("Email: vet@petstore.com")
    console.log("Password: vet123")
    console.log("Role: veterinarian")

  } catch (error) {
    console.error("Error creating veterinarian:", error)
  } finally {
    await mongoose.disconnect()
    console.log("Disconnected from MongoDB")
  }
}

createVeterinarian()