"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { RadioGroup, RadioGroupItem } from "../ui/radio-group"
import { Smartphone } from "lucide-react"
import { useCart } from "../../lib/cart-context"
import { mockProducts } from "../../lib/mock-data"

interface CheckoutFormProps {
  paymentMethod: "gcash" | null
  onPaymentMethodChange: (method: "gcash" | null) => void
}

export function CheckoutForm({ paymentMethod, onPaymentMethodChange }: CheckoutFormProps) {
  const { state, clearCart } = useCart()
  const [isProcessing, setIsProcessing] = useState(false)
  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    email: "",
    phone: "",
    address: ""
  })

  // Group items by vendor
  const itemsByVendor = state.items.reduce((acc, item) => {
    const product = mockProducts.find(p => p.id === item.id)
    if (!product?.vendor) return acc
    
    const vendorId = product.vendor.id
    if (!acc[vendorId]) {
      acc[vendorId] = {
        vendor: product.vendor,
        items: [],
        total: 0
      }
    }
    
    acc[vendorId].items.push({ ...item, product })
    acc[vendorId].total += item.price * item.quantity
    
    return acc
  }, {} as Record<string, any>)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!paymentMethod) return

    setIsProcessing(true)
    
    // Simulate processing
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Show GCash payment instructions
    const vendorPayments = Object.values(itemsByVendor).map((group: any) => 
      `${group.vendor.name}: ₱${group.total.toFixed(2)} to ${group.vendor.gcashNumber}`
    ).join('\n')
    
    alert(`Order placed successfully!\n\nGCash Payment Instructions:\n${vendorPayments}\n\nPlease send payments to the respective vendors and keep your transaction receipts.`)
    
    clearCart()
    setIsProcessing(false)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Checkout Information</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <h3 className="font-semibold">Customer Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  required
                  value={customerInfo.name}
                  onChange={(e) => setCustomerInfo({...customerInfo, name: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  required
                  value={customerInfo.email}
                  onChange={(e) => setCustomerInfo({...customerInfo, email: e.target.value})}
                />
              </div>
            </div>
            <div>
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                required
                value={customerInfo.phone}
                onChange={(e) => setCustomerInfo({...customerInfo, phone: e.target.value})}
              />
            </div>
            <div>
              <Label htmlFor="address">Delivery Address</Label>
              <Input
                id="address"
                required
                value={customerInfo.address}
                onChange={(e) => setCustomerInfo({...customerInfo, address: e.target.value})}
              />
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold">Payment Method</h3>
            <RadioGroup value={paymentMethod || ""} onValueChange={(value) => onPaymentMethodChange(value as "gcash")}>
              <div className="flex items-center space-x-2 p-4 border rounded-lg">
                <RadioGroupItem value="gcash" id="gcash" />
                <Label htmlFor="gcash" className="flex items-center cursor-pointer">
                  <Smartphone className="mr-2 h-4 w-4" />
                  GCash
                </Label>
              </div>
            </RadioGroup>
          </div>

          {paymentMethod === "gcash" && (
            <div className="space-y-4 p-4 bg-blue-50 rounded-lg">
              <h4 className="font-semibold text-blue-900">Payment Instructions</h4>
              <p className="text-sm text-blue-800">
                After placing your order, you will receive GCash payment details for each vendor. 
                Please send payments directly to the respective vendors.
              </p>
              <div className="space-y-2">
                <h5 className="font-medium text-blue-900">Vendors to pay:</h5>
                {Object.values(itemsByVendor).map((group: any) => (
                  <div key={group.vendor.id} className="text-sm text-blue-800">
                    • {group.vendor.name}: ₱{group.total.toFixed(2)} to {group.vendor.gcashNumber}
                  </div>
                ))}
              </div>
            </div>
          )}

          <Button 
            type="submit" 
            className="w-full" 
            size="lg"
            disabled={!paymentMethod || isProcessing}
          >
            {isProcessing ? "Processing..." : "Place Order"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}