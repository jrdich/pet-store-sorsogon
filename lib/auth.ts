import type { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcryptjs"
import connectDB from "./mongodb"
import User from "../models/User"

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        try {
          await connectDB()
          console.log("MongoDB connected successfully")
          
          console.log("Searching for user with email:", credentials.email)
          // Case insensitive email search
          const email = credentials.email.toLowerCase()
          const user = await User.findOne({ 
            email: { $regex: new RegExp(`^${email}$`, 'i') } 
          })
          console.log("User search completed", { found: !!user, email: credentials.email })
          if (user) {
            console.log("User data:", { 
              id: user._id,
              email: user.email,
              hasPassword: !!user.password
            })
          }

          if (!user || !user.password) {
            console.log("User not found or password missing")
            return null
          }

          const isPasswordValid = await bcrypt.compare(credentials.password, user.password)
          console.log("Password validation completed", { isValid: isPasswordValid })

          if (!isPasswordValid) {
            console.log("Invalid password")
            return null
          }

          return {
            id: user._id.toString(),
            email: user.email,
            name: user.name,
            role: user.role,
          }
        } catch (error) {
          console.error("Auth error:", error)
          if (error instanceof Error) {
            console.error("Error details:", error.message)
          }
          return null
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }: { token: any; user: any }) {
      if (user) {
        token.role = user.role
      }
      return token
    },
    async session({ session, token }: { session: any; token: any }) {
      if (token) {
        session.user.id = token.sub!
        session.user.role = token.role as string
      }
      return session
    },
  },
  pages: {
    signIn: "/auth/signin",
    signUp: "/auth/signup",
  },
}
