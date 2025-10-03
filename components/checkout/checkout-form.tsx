// "use client"

// import { useState, useEffect } from "react"
// import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
// import { Button } from "../ui/button"
// import { Input } from "../ui/input"
// import { Label } from "../ui/label"
// import { RadioGroup, RadioGroupItem } from "../ui/radio-group"
// import { Badge } from "../ui/badge"
// import { Smartphone, Copy, CheckCircle, AlertCircle } from "lucide-react"
// import { useCart } from "../../lib/cart-context"
// import { mockProducts } from "../../lib/mock-data"

// interface CheckoutFormProps {
//   paymentMethod: "gcash" | null
//   onPaymentMethodChange: (method: "gcash" | null) => void
// }

// export function CheckoutForm({ paymentMethod, onPaymentMethodChange }: CheckoutFormProps) {
//   const { state, clearCart } = useCart()
//   const [isProcessing, setIsProcessing] = useState(false)
//   const [orderPlaced, setOrderPlaced] = useState(false)
//   const [copiedNumbers, setCopiedNumbers] = useState<string[]>([])
//   const [customerInfo, setCustomerInfo] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     address: ""
//   })

//   // Group items by vendor
//   const itemsByVendor = state.items.reduce((acc, item) => {
//     const product = mockProducts.find(p => p.id === item.id)
//     if (!product?.vendor) return acc
    
//     const vendorId = product.vendor.id
//     if (!acc[vendorId]) {
//       acc[vendorId] = {
//         vendor: product.vendor,
//         items: [],
//         total: 0
//       }
//     }
    
//     acc[vendorId].items.push({ ...item, product })
//     acc[vendorId].total += item.price * item.quantity
    
//     return acc
//   }, {} as Record<string, any>)

//   const copyToClipboard = async (text: string, vendorId: string) => {
//     try {
//       await navigator.clipboard.writeText(text)
//       setCopiedNumbers(prev => [...prev, vendorId])
//       setTimeout(() => {
//         setCopiedNumbers(prev => prev.filter(id => id !== vendorId))
//       }, 2000)
//     } catch (err) {
//       console.error('Failed to copy:', err)
//     }
//   }

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()
//     if (!paymentMethod) return

//     setIsProcessing(true)
    
//     // Simulate processing with dynamic timing
//     const processingTime = Math.random() * 2000 + 1000 // 1-3 seconds
//     await new Promise(resolve => setTimeout(resolve, processingTime))
    
//     setOrderPlaced(true)
//     setIsProcessing(false)
//   }

//   const handleNewOrder = () => {
//     clearCart()
//     setOrderPlaced(false)
//     setCustomerInfo({ name: "", email: "", phone: "", address: "" })
//     onPaymentMethodChange(null)
//   }

//   if (orderPlaced) {
//     return (
//       <Card>
//         <CardHeader>
//           <CardTitle className="flex items-center gap-2 text-green-600">
//             <CheckCircle className="h-5 w-5" />
//             Order Placed Successfully!
//           </CardTitle>
//         </CardHeader>
//         <CardContent className="space-y-6">
//           <div className="p-4 bg-green-50 rounded-lg">
//             <h4 className="font-semibold text-green-900 mb-3">GCash Payment Instructions</h4>
//             <p className="text-sm text-green-800 mb-4">
//               Please send payments to the following vendors and keep your transaction receipts:
//             </p>
            
//             <div className="space-y-4">
//               {Object.values(itemsByVendor).map((group: any) => (
//                 <div key={group.vendor.id} className="p-3 bg-white rounded border">
//                   <div className="flex justify-between items-start mb-2">
//                     <div>
//                       <h5 className="font-medium text-gray-900">{group.vendor.name}</h5>
//                       <p className="text-lg font-bold text-green-600">₱{group.total.toFixed(2)}</p>
//                     </div>
//                     <Badge variant="outline">{group.items.length} item(s)</Badge>
//                   </div>
                  
//                   <div className="flex items-center gap-2 mt-2">
//                     <span className="text-sm text-gray-600">GCash Number:</span>
//                     <code className="bg-gray-100 px-2 py-1 rounded text-sm font-mono">
//                       {group.vendor.gcashNumber}
//                     </code>
//                     <Button
//                       size="sm"
//                       variant="outline"
//                       onClick={() => copyToClipboard(group.vendor.gcashNumber, group.vendor.id)}
//                       className="h-7 px-2"
//                     >
//                       {copiedNumbers.includes(group.vendor.id) ? (
//                         <CheckCircle className="h-3 w-3" />
//                       ) : (
//                         <Copy className="h-3 w-3" />
//                       )}
//                     </Button>
//                   </div>
                  
//                   <div className="mt-2 text-xs text-gray-500">
//                     Items: {group.items.map((item: any) => `${item.product.name} (${item.quantity}x)`).join(', ')}
//                   </div>
//                 </div>
//               ))}
//             </div>
            
//             <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded">
//               <div className="flex items-start gap-2">
//                 <AlertCircle className="h-4 w-4 text-yellow-600 mt-0.5" />
//                 <div className="text-sm text-yellow-800">
//                   <p className="font-medium">Important:</p>
//                   <ul className="mt-1 list-disc list-inside space-y-1">
//                     <li>Send exact amounts to avoid delays</li>
//                     <li>Include your order reference in the message</li>
//                     <li>Keep transaction screenshots as proof</li>
//                   </ul>
//                 </div>
//               </div>
//             </div>
//           </div>
          
//           <Button onClick={handleNewOrder} className="w-full" size="lg">
//             Place New Order
//           </Button>
//         </CardContent>
//       </Card>
//     )
//   }

//   return (
//     <Card>
//       <CardHeader>
//         <CardTitle>Checkout Information</CardTitle>
//       </CardHeader>
//       <CardContent>
//         <form onSubmit={handleSubmit} className="space-y-6">
//           <div className="space-y-4">
//             <h3 className="font-semibold">Customer Information</h3>
//             <div className="grid grid-cols-2 gap-4">
//               <div>
//                 <Label htmlFor="name">Full Name</Label>
//                 <Input
//                   id="name"
//                   required
//                   value={customerInfo.name}
//                   onChange={(e) => setCustomerInfo({...customerInfo, name: e.target.value})}
//                   className="transition-all duration-200 focus:scale-[1.02]"
//                 />
//               </div>
//               <div>
//                 <Label htmlFor="email">Email</Label>
//                 <Input
//                   id="email"
//                   type="email"
//                   required
//                   value={customerInfo.email}
//                   onChange={(e) => setCustomerInfo({...customerInfo, email: e.target.value})}
//                   className="transition-all duration-200 focus:scale-[1.02]"
//                 />
//               </div>
//             </div>
//             <div>
//               <Label htmlFor="phone">Phone Number</Label>
//               <Input
//                 id="phone"
//                 required
//                 value={customerInfo.phone}
//                 onChange={(e) => setCustomerInfo({...customerInfo, phone: e.target.value})}
//                 className="transition-all duration-200 focus:scale-[1.02]"
//               />
//             </div>
//             <div>
//               <Label htmlFor="address">Delivery Address</Label>
//               <Input
//                 id="address"
//                 required
//                 value={customerInfo.address}
//                 onChange={(e) => setCustomerInfo({...customerInfo, address: e.target.value})}
//                 className="transition-all duration-200 focus:scale-[1.02]"
//               />
//             </div>
//           </div>

//           <div className="space-y-4">
//             <h3 className="font-semibold">Payment Method</h3>
//             <RadioGroup value={paymentMethod || ""} onValueChange={(value) => onPaymentMethodChange(value as "gcash")}>
//               <div className="flex items-center space-x-2 p-4 border rounded-lg transition-all duration-200 hover:bg-blue-50 hover:border-blue-200">
//                 <RadioGroupItem value="gcash" id="gcash" />
//                 <Label htmlFor="gcash" className="flex items-center cursor-pointer">
//                   <Smartphone className="mr-2 h-4 w-4 text-blue-600" />
//                   GCash
//                   <Badge variant="secondary" className="ml-2">Testing Mode</Badge>
//                 </Label>
//               </div>
//             </RadioGroup>
//           </div>

//           {paymentMethod === "gcash" && (
//             <div className="space-y-4 p-4 bg-blue-50 rounded-lg border border-blue-200 animate-in slide-in-from-top-2 duration-300">
//               <h4 className="font-semibold text-blue-900">Payment Preview</h4>
//               <p className="text-sm text-blue-800">
//                 You will pay different vendors separately via GCash after placing your order.
//               </p>
//               <div className="space-y-3">
//                 <h5 className="font-medium text-blue-900">Payment Breakdown:</h5>
//                 {Object.values(itemsByVendor).map((group: any) => (
//                   <div key={group.vendor.id} className="flex justify-between items-center p-2 bg-white rounded border">
//                     <div>
//                       <span className="font-medium">{group.vendor.name}</span>
//                       <div className="text-xs text-gray-500">{group.items.length} item(s)</div>
//                     </div>
//                     <div className="text-right">
//                       <div className="font-bold text-green-600">₱{group.total.toFixed(2)}</div>
//                       <div className="text-xs text-gray-500">{group.vendor.gcashNumber}</div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           )}

//           <Button 
//             type="submit" 
//             className="w-full transition-all duration-200 hover:scale-[1.02]" 
//             size="lg"
//             disabled={!paymentMethod || isProcessing}
//           >
//             {isProcessing ? (
//               <div className="flex items-center gap-2">
//                 <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
//                 Processing...
//               </div>
//             ) : (
//               "Place Order"
//             )}
//           </Button>
//         </form>
//       </CardContent>
//     </Card>
//   )
// }

//(2)
"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { RadioGroup, RadioGroupItem } from "../ui/radio-group"
import { Badge } from "../ui/badge"
import { Progress } from "../ui/progress"
import { Smartphone, Copy, CheckCircle, AlertCircle, Clock, Zap } from "lucide-react"
import { useCart } from "../../lib/cart-context"
import { mockProducts } from "../../lib/mock-data"

interface CheckoutFormProps {
  paymentMethod: "gcash" | null
  onPaymentMethodChange: (method: "gcash" | null) => void
}

export function CheckoutForm({ paymentMethod, onPaymentMethodChange }: CheckoutFormProps) {
  const { state, clearCart } = useCart()
  const [isProcessing, setIsProcessing] = useState(false)
  const [orderPlaced, setOrderPlaced] = useState(false)
  const [copiedNumbers, setCopiedNumbers] = useState<string[]>([])
  const [processingStep, setProcessingStep] = useState("")
  const [progress, setProgress] = useState(0)
  const [orderNumber, setOrderNumber] = useState("")
  const [estimatedDelivery, setEstimatedDelivery] = useState("")
  const [paymentStatus, setPaymentStatus] = useState<"pending" | "confirmed" | "failed">("pending")
  const [formErrors, setFormErrors] = useState<Record<string, string>>({})
  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    email: "",
    phone: "",
    address: ""
  })

  // Generate dynamic data
  useEffect(() => {
    if (orderPlaced && !orderNumber) {
      const randomOrderNumber = `PS${Date.now().toString().slice(-6)}`
      setOrderNumber(randomOrderNumber)
      
      // Calculate estimated delivery (2-5 days)
      const deliveryDays = Math.floor(Math.random() * 4) + 2
      const deliveryDate = new Date()
      deliveryDate.setDate(deliveryDate.getDate() + deliveryDays)
      setEstimatedDelivery(deliveryDate.toLocaleDateString('en-US', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      }))
    }
  }, [orderPlaced, orderNumber])

  // Real-time form validation
  const validateForm = (field: string, value: string) => {
    const errors: Record<string, string> = {}
    
    switch (field) {
      case 'email':
        if (value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          errors.email = "Please enter a valid email address"
        }
        break
      case 'phone':
        if (value && !/^(\+63|0)[0-9]{10}$/.test(value.replace(/\s/g, ''))) {
          errors.phone = "Please enter a valid Philippine phone number"
        }
        break
      case 'name':
        if (value && value.length < 2) {
          errors.name = "Name must be at least 2 characters"
        }
        break
    }
    
    setFormErrors(prev => ({ ...prev, [field]: errors[field] || "" }))
  }

  // Group items by vendor with dynamic calculations
  const itemsByVendor = state.items.reduce((acc, item) => {
    const product = mockProducts.find(p => p.id === item.id)
    if (!product?.vendor) return acc
    
    const vendorId = product.vendor.id
    if (!acc[vendorId]) {
      acc[vendorId] = {
        vendor: product.vendor,
        items: [],
        total: 0,
        fees: Math.floor(Math.random() * 50) + 10, // Random delivery fee
      }
    }
    
    acc[vendorId].items.push({ ...item, product })
    acc[vendorId].total += item.price * item.quantity
    
    return acc
  }, {} as Record<string, any>)

  const copyToClipboard = async (text: string, vendorId: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedNumbers(prev => [...prev, vendorId])
      setTimeout(() => {
        setCopiedNumbers(prev => prev.filter(id => id !== vendorId))
      }, 3000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setCustomerInfo(prev => ({ ...prev, [field]: value }))
    validateForm(field, value)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!paymentMethod) return

    setIsProcessing(true)
    setProgress(0)
    
    // Dynamic processing steps
    const steps = [
      "Validating order details...",
      "Connecting to GCash API...",
      "Generating payment links...",
      "Notifying vendors...",
      "Creating order confirmation..."
    ]
    
    for (let i = 0; i < steps.length; i++) {
      setProcessingStep(steps[i])
      setProgress((i + 1) * 20)
      await new Promise(resolve => setTimeout(resolve, 800 + Math.random() * 400))
    }
    
    // Simulate payment status
    const success = Math.random() > 0.1 // 90% success rate for testing
    setPaymentStatus(success ? "confirmed" : "failed")
    
    if (success) {
      setOrderPlaced(true)
    }
    setIsProcessing(false)
  }

  const handleNewOrder = () => {
    clearCart()
    setOrderPlaced(false)
    setCustomerInfo({ name: "", email: "", phone: "", address: "" })
    setOrderNumber("")
    setEstimatedDelivery("")
    setPaymentStatus("pending")
    setProgress(0)
    onPaymentMethodChange(null)
  }

  // Success state with enhanced information
  if (orderPlaced) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-green-600">
            <CheckCircle className="h-6 w-6" />
            Order #{orderNumber} Placed Successfully!
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-2 gap-4 p-4 bg-green-50 rounded-lg">
            <div>
              <p className="text-sm text-green-700">Order Number</p>
              <p className="font-bold text-green-900">{orderNumber}</p>
            </div>
            <div>
              <p className="text-sm text-green-700">Estimated Delivery</p>
              <p className="font-bold text-green-900">{estimatedDelivery}</p>
            </div>
          </div>

          <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
            <h4 className="font-semibold text-blue-900 mb-3 flex items-center gap-2">
              <Smartphone className="h-5 w-5" />
              GCash Payment Instructions
            </h4>
            <p className="text-sm text-blue-800 mb-4">
              Complete payments to vendors below. Each vendor will process their items separately.
            </p>
            
            <div className="space-y-4">
              {Object.values(itemsByVendor).map((group: any) => (
                <div key={group.vendor.id} className="p-4 bg-white rounded-lg border border-gray-200 hover:border-blue-300 transition-colors">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h5 className="font-medium text-gray-900">{group.vendor.name}</h5>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="outline" className="text-xs">
                          <Clock className="h-3 w-3 mr-1" />
                          {Math.floor(Math.random() * 3) + 1}-{Math.floor(Math.random() * 3) + 3} days
                        </Badge>
                        <Badge variant="secondary" className="text-xs">
                          {group.items.length} item(s)
                        </Badge>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-gray-600">Subtotal: ₱{group.total.toFixed(2)}</div>
                      <div className="text-sm text-gray-600">Delivery: ₱{group.fees.toFixed(2)}</div>
                      <div className="font-bold text-lg text-green-600 border-t pt-1">
                        ₱{(group.total + group.fees).toFixed(2)}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                    <Smartphone className="h-4 w-4 text-blue-600" />
                    <span className="text-sm text-gray-600">GCash Number:</span>
                    <code className="bg-white px-3 py-1 rounded font-mono text-sm font-semibold border">
                      {group.vendor.gcashNumber}
                    </code>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => copyToClipboard(group.vendor.gcashNumber, group.vendor.id)}
                      className="h-8 px-3 hover:bg-blue-50"
                    >
                      {copiedNumbers.includes(group.vendor.id) ? (
                        <>
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Copied!
                        </>
                      ) : (
                        <>
                          <Copy className="h-3 w-3 mr-1" />
                          Copy
                        </>
                      )}
                    </Button>
                  </div>
                  
                  <div className="mt-3 p-2 bg-yellow-50 rounded border border-yellow-200">
                    <p className="text-xs font-medium text-yellow-800 mb-1">
                      Reference: {orderNumber}-{group.vendor.id.toUpperCase()}
                    </p>
                    <p className="text-xs text-yellow-700">
                      Items: {group.items.map((item: any) => `${item.product.name} (${item.quantity}x)`).join(', ')}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-4 p-4 bg-amber-50 border border-amber-200 rounded-lg">
              <div className="flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-amber-600 mt-0.5 flex-shrink-0" />
                <div className="text-sm text-amber-800">
                  <p className="font-semibold mb-2">Payment Reminders:</p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Send payments to each vendor separately</li>
                    <li>Use the exact reference number for each payment</li>
                    <li>Screenshot your transaction confirmations</li>
                    <li>Vendors will confirm receipt within 1-2 hours</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            <Button onClick={handleNewOrder} variant="outline">
              New Order
            </Button>
            <Button className="bg-green-600 hover:bg-green-700">
              Track Order
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          Checkout Information
          {paymentMethod && (
            <Badge variant="secondary" className="ml-2">
              <Zap className="h-3 w-3 mr-1" />
              Testing Mode
            </Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isProcessing && (
          <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <div className="flex items-center gap-3 mb-3">
              <div className="animate-spin rounded-full h-5 w-5 border-2 border-blue-600 border-t-transparent"></div>
              <span className="font-medium text-blue-900">{processingStep}</span>
            </div>
            <Progress value={progress} className="h-2" />
            <p className="text-sm text-blue-700 mt-2">{progress}% Complete</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <h3 className="font-semibold">Customer Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  id="name"
                  required
                  value={customerInfo.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className={`transition-all duration-200 focus:scale-[1.02] ${
                    formErrors.name ? 'border-red-500' : ''
                  }`}
                />
                {formErrors.name && (
                  <p className="text-sm text-red-600 mt-1">{formErrors.name}</p>
                )}
              </div>
              <div>
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  required
                  value={customerInfo.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className={`transition-all duration-200 focus:scale-[1.02] ${
                    formErrors.email ? 'border-red-500' : ''
                  }`}
                />
                {formErrors.email && (
                  <p className="text-sm text-red-600 mt-1">{formErrors.email}</p>
                )}
              </div>
            </div>
            <div>
              <Label htmlFor="phone">Phone Number *</Label>
              <Input
                id="phone"
                required
                placeholder="+63 or 09XX-XXX-XXXX"
                value={customerInfo.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                className={`transition-all duration-200 focus:scale-[1.02] ${
                  formErrors.phone ? 'border-red-500' : ''
                }`}
              />
              {formErrors.phone && (
                <p className="text-sm text-red-600 mt-1">{formErrors.phone}</p>
              )}
            </div>
            <div>
              <Label htmlFor="address">Delivery Address *</Label>
              <Input
                id="address"
                required
                placeholder="Complete address with barangay, city, province"
                value={customerInfo.address}
                onChange={(e) => handleInputChange('address', e.target.value)}
                className="transition-all duration-200 focus:scale-[1.02]"
              />
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold">Payment Method</h3>
            <RadioGroup value={paymentMethod || ""} onValueChange={(value) => onPaymentMethodChange(value as "gcash")}>
              <div className="flex items-center space-x-2 p-4 border rounded-lg transition-all duration-200 hover:bg-blue-50 hover:border-blue-300 hover:scale-[1.02]">
                <RadioGroupItem value="gcash" id="gcash" />
                <Label htmlFor="gcash" className="flex items-center cursor-pointer flex-grow">
                  <Smartphone className="mr-2 h-5 w-5 text-blue-600" />
                  GCash Payment
                  <div className="ml-auto flex gap-2">
                    <Badge variant="secondary">Testing</Badge>
                    <Badge variant="outline" className="text-green-600 border-green-300">
                      Instant
                    </Badge>
                  </div>
                </Label>
              </div>
            </RadioGroup>
          </div>

          {paymentMethod === "gcash" && (
            <div className="space-y-4 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200 animate-in slide-in-from-top-2 duration-500">
              <h4 className="font-semibold text-blue-900 flex items-center gap-2">
                <Zap className="h-5 w-5" />
                Payment Summary
              </h4>
              <div className="space-y-3">
                {Object.values(itemsByVendor).map((group: any) => (
                  <div key={group.vendor.id} className="flex justify-between items-center p-3 bg-white rounded-lg border border-gray-200 hover:shadow-md transition-all duration-200">
                    <div>
                      <span className="font-medium">{group.vendor.name}</span>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="outline" className="text-xs">
                          {group.items.length} item(s)
                        </Badge>
                        <span className="text-xs text-gray-500">
                          + ₱{group.fees} delivery
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-green-600 text-lg">
                        ₱{(group.total + group.fees).toFixed(2)}
                      </div>
                      <div className="text-xs text-gray-500 font-mono">
                        {group.vendor.gcashNumber}
                      </div>
                    </div>
                  </div>
                ))}
                <div className="border-t pt-3 mt-3">
                  <div className="flex justify-between items-center font-bold text-lg">
                    <span>Total Amount:</span>
                    <span className="text-green-600">
                      ₱{Object.values(itemsByVendor).reduce((sum: number, group: any) => sum + group.total + group.fees, 0).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          <Button 
            type="submit" 
            className="w-full transition-all duration-200 hover:scale-[1.02] text-lg py-6" 
            disabled={!paymentMethod || isProcessing || Object.values(formErrors).some(error => error)}
          >
            {isProcessing ? (
              <div className="flex items-center gap-3">
                <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
                <span>{processingStep || "Processing..."}</span>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Smartphone className="h-5 w-5" />
                Place Order - ₱{state.totalAmount.toFixed(2)}
              </div>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
