"use client"

import { useState } from "react"
import { Header } from "../../components/navigation/header"
import { Footer } from "../../components/footer"
import { Button } from "../../components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card"
import { ArrowLeft, CreditCard } from "lucide-react"
import Link from "next/link"
import { useCart } from "../../lib/cart-context"
import { CheckoutForm } from "../../components/checkout/checkout-form"
import { OrderSummary } from "../../components/checkout/order-summary"

export default function CheckoutPage() {
  const { state } = useCart()
  const [paymentMethod, setPaymentMethod] = useState<"gcash" | null>(null)

  if (state.items.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="text-center py-12">
            <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
            <p className="text-muted-foreground mb-6">Add some items to your cart before checking out.</p>
            <Button asChild>
              <Link href="/store">Continue Shopping</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Button variant="ghost" asChild className="mb-4">
            <Link href="/cart">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Cart
            </Link>
          </Button>

          <h1 className="text-3xl font-bold flex items-center">
            <CreditCard className="mr-3 h-8 w-8" />
            Checkout
          </h1>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <div>
            <CheckoutForm 
              paymentMethod={paymentMethod}
              onPaymentMethodChange={setPaymentMethod}
            />
          </div>
          
          <div>
            <OrderSummary />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}