"use client"

import { Card, CardContent, CardFooter } from "../ui/card"
import { Button } from "../ui/button"
import { Badge } from "../ui/badge"
import { useCart } from "../../lib/cart-context"
import { ShoppingCart, Star } from "lucide-react"

interface ProductCardProps {
  id: string
  name: string
  description: string
  price: number
  category: string
  petType: string
  image: string
  stock: number
  featured: boolean
}

export function ProductCard({
  id,
  name,
  description,
  price,
  category,
  petType,
  image,
  stock,
  featured,
}: ProductCardProps) {
  const { addToCart } = useCart()

    const handleAddToCart = () => {
    addToCart({
      id,
      name,
      price,
      image,
      category,
    })
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
              <span className="text-2xl font-bold text-primary">${price.toFixed(2)}</span>
              <div className="text-xs text-muted-foreground">{stock} in stock</div>
            </div>
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <Button onClick={handleAddToCart} className="w-full group-hover:bg-primary/90" disabled={stock === 0}>
          <ShoppingCart className="w-4 h-4 mr-2" />
          {stock === 0 ? "Out of Stock" : "Add to Cart"}
        </Button>
      </CardFooter>
    </Card>
  )
}
