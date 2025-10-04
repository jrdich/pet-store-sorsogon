"use client"

import { Card, CardContent, CardFooter } from "../ui/card"
import { Button } from "../ui/button"
import { Badge } from "../ui/badge"
import { useCart } from "../../lib/cart-context"
import { ShoppingCart, Star, Loader2, Check } from "lucide-react"
import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog"

interface ProductCardProps {
  id?: string
  _id?: string
  name: string
  description: string
  price: number
  category: string
  petType: string
  image: string
  stock: number
  featured: boolean
  vendor?: { name: string }
}

export function ProductCard({
  id,
  _id,
  name,
  description,
  price,
  category,
  petType,
  image,
  stock,
  featured,
  vendor,
}: ProductCardProps) {
  const { addToCart } = useCart()
  const [isLoading, setIsLoading] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  const handleAddToCart = async () => {
    setIsLoading(true)
    
    // Simulate loading for better UX
    await new Promise(resolve => setTimeout(resolve, 500))
    
    addToCart({
      id: id || _id?.toString() || '',
      name,
      price,
      image,
      category,
    })
    
    setIsLoading(false)
    setShowSuccess(true)
    
    // Auto close success modal after 2 seconds
    setTimeout(() => setShowSuccess(false), 2000)
  }

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
      <CardContent className="p-0">
        <div className="relative">
          <img src={image || "/placeholder.svg"} alt={name} className="w-full h-48 object-cover" />
          {featured && (
            <Badge className="absolute top-2 left-2 bg-orange-500 hover:bg-orange-600">
              <Star className="w-3 h-3 mr-1" />
              Featured
            </Badge>
          )}
          {stock < 10 && (
            <Badge variant="destructive" className="absolute top-2 right-2">
              Low Stock
            </Badge>
          )}
        </div>

        <div className="p-4">
          <div className="flex items-center justify-between mb-2">
            <Badge variant="secondary" className="text-xs capitalize">
              {category}
            </Badge>
            <Badge variant="outline" className="text-xs capitalize">
              {petType === "all" ? "All Pets" : petType}
            </Badge>
          </div>

          <h3 className="font-semibold text-lg mb-2 line-clamp-2">{name}</h3>
          <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{description}</p>

          <div className="flex items-center justify-between">
            <div>
              <span className="text-2xl font-bold text-primary">₱{price.toFixed(2)}</span>
              <div className="text-xs text-muted-foreground">{stock} in stock</div>
            </div>
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <Button 
          onClick={handleAddToCart} 
          className="w-full group-hover:bg-primary/90" 
          disabled={stock === 0 || isLoading}
        >
          {isLoading ? (
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
          ) : (
            <ShoppingCart className="w-4 h-4 mr-2" />
          )}
          {stock === 0 ? "Out of Stock" : isLoading ? "Adding..." : "Add to Cart"}
        </Button>
      </CardFooter>

      <Dialog open={showSuccess} onOpenChange={setShowSuccess}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <Check className="w-5 h-5 text-green-600" />
              </div>
              Added to Cart!
            </DialogTitle>
            <DialogDescription>
              <strong>{name}</strong> has been successfully added to your cart.
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </Card>
  )
}
