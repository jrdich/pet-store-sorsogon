"use client"

import { LoadingButton } from "../ui/loading-button"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { useCart } from "../../lib/cart-context"
import { ShoppingBag } from "lucide-react"
import { useLoadingState } from "@/hooks/use-loading-state"
import { useRouter } from "next/navigation"

export function CartSummary() {
  const { isLoading, withLoading } = useLoadingState()
  const router = useRouter()
  const { state } = useCart()

  const handleCheckout = () => withLoading(async () => {
    await router.push('/checkout')
  })

  const shipping = state.totalAmount > 50 ? 0 : 9.99
  const tax = state.totalAmount * 0.08 // 8% tax
  const total = state.totalAmount + shipping + tax

  return (
    <Card className="sticky top-4">
      <CardHeader>
        <CardTitle className="flex items-center">
          <ShoppingBag className="mr-2 h-5 w-5" />
          Order Summary
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between">
            <span>Subtotal ({state.totalItems} items)</span>
            <span>${state.totalAmount.toFixed(2)}</span>
          </div>

          <div className="flex justify-between">
            <span>Shipping</span>
            <span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
          </div>

          <div className="flex justify-between">
            <span>Tax</span>
            <span>${tax.toFixed(2)}</span>
          </div>

          <div className="border-t pt-2">
            <div className="flex justify-between font-bold text-lg">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {state.totalAmount < 50 && (
          <div className="text-sm text-muted-foreground bg-muted p-3 rounded-lg">
            Add ${(50 - state.totalAmount).toFixed(2)} more for free shipping!
          </div>
        )}

        <LoadingButton
          className="w-full"
          size="lg"
          disabled={state.items.length === 0}
          isLoading={isLoading}
          loadingText="Processing..."
          onClick={handleCheckout}
        >
          Proceed to Checkout
        </LoadingButton>

        <div className="text-xs text-muted-foreground text-center">Secure checkout with SSL encryption</div>
      </CardContent>
    </Card>
  )
}
