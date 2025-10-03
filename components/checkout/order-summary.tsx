"use client"

import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { useCart } from "../../lib/cart-context"
import { mockProducts } from "../../lib/mock-data"
import { ShoppingBag } from "lucide-react"

export function OrderSummary() {
  const { state } = useCart()

  // Group items by vendor
  const itemsByVendor = state.items.reduce((acc, item) => {
    const product = mockProducts.find(p => p.id === item.id)
    if (!product?.vendor) return acc
    
    const vendorId = product.vendor.id
    if (!acc[vendorId]) {
      acc[vendorId] = {
        vendor: product.vendor,
        items: [],
        subtotal: 0
      }
    }
    
    acc[vendorId].items.push({ ...item, product })
    acc[vendorId].subtotal += item.price * item.quantity
    
    return acc
  }, {} as Record<string, any>)

  const shipping = state.totalAmount > 50 ? 0 : 9.99
  const tax = state.totalAmount * 0.08
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
        {/* Items grouped by vendor */}
        <div className="space-y-4">
          {Object.values(itemsByVendor).map((group: any) => (
            <div key={group.vendor.id} className="border rounded-lg p-3">
              <h4 className="font-semibold text-sm mb-2">{group.vendor.name}</h4>
              <div className="space-y-2">
                {group.items.map((item: any) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span>{item.name} × {item.quantity}</span>
                    <span>₱{(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
                <div className="flex justify-between font-medium text-sm pt-2 border-t">
                  <span>Vendor Subtotal:</span>
                  <span>₱{group.subtotal.toFixed(2)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order totals */}
        <div className="space-y-2 pt-4 border-t">
          <div className="flex justify-between">
            <span>Subtotal ({state.totalItems} items)</span>
            <span>₱{state.totalAmount.toFixed(2)}</span>
          </div>

          <div className="flex justify-between">
            <span>Shipping</span>
            <span>{shipping === 0 ? "Free" : `₱${shipping.toFixed(2)}`}</span>
          </div>

          <div className="flex justify-between">
            <span>Tax</span>
            <span>₱{tax.toFixed(2)}</span>
          </div>

          <div className="border-t pt-2">
            <div className="flex justify-between font-bold text-lg">
              <span>Total</span>
              <span>₱{total.toFixed(2)}</span>
            </div>
          </div>
        </div>

        <div className="text-xs text-muted-foreground bg-muted p-3 rounded-lg">
          <p className="font-semibold mb-1">Payment Note:</p>
          <p>You will pay each vendor separately via GCash. Total amount will be split among vendors based on their items.</p>
        </div>
      </CardContent>
    </Card>
  )
}