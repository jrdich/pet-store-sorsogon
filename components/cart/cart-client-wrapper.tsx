"use client"

import { useCart } from "../../lib/cart-context"
import { CartItem } from "./cart-item"
import { CartSummary } from "./cart-summary"
import { Button } from "../ui/button"
import { ShoppingBag } from "lucide-react"
import Link from "next/link"

export function CartClientWrapper() {
  const { state } = useCart()

  if (state.items.length === 0) {
    return (
      <div className="text-center py-12">
        <ShoppingBag className="mx-auto h-24 w-24 text-muted-foreground mb-4" />
        <h2 className="text-2xl font-semibold mb-2">Your cart is empty</h2>
        <p className="text-muted-foreground mb-6">Looks like you haven't added any items to your cart yet.</p>
        <Button asChild>
          <Link href="/store">Start Shopping</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="grid lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-4">
        {state.items.map((item) => (
          <CartItem key={item.id} {...item} />
        ))}
      </div>

      <div className="lg:col-span-1">
        <CartSummary />
      </div>
    </div>
  )
}
