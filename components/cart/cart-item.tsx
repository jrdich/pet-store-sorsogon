"use client"

import { Button } from "../ui/button"
import { Card, CardContent } from "../ui/card"
import { Minus, Plus, Trash2 } from "lucide-react"
import { useCart } from "../../lib/cart-context"

interface CartItemProps {
  id: string
  name: string
  price: number
  image: string
  quantity: number
  category: string
}

export function CartItem({ id, name, price, image, quantity, category }: CartItemProps) {
  const { updateQuantity, removeFromCart } = useCart()

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center space-x-4">
          <img src={image || "/placeholder.svg"} alt={name} className="w-16 h-16 object-cover rounded-lg" />

          <div className="flex-1">
            <h3 className="font-semibold">{name}</h3>
            <p className="text-sm text-muted-foreground capitalize">{category}</p>
            <p className="text-lg font-bold text-primary">₱{price.toFixed(2)}</p>
          </div>

          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => updateQuantity(id, quantity - 1)}
              disabled={quantity <= 1}
            >
              <Minus className="h-4 w-4" />
            </Button>

            <span className="w-8 text-center font-semibold">{quantity}</span>

            <Button variant="outline" size="sm" onClick={() => updateQuantity(id, quantity + 1)}>
              <Plus className="h-4 w-4" />
            </Button>
          </div>

          <div className="text-right">
            <p className="font-bold">₱{(price * quantity).toFixed(2)}</p>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => removeFromCart(id)}
              className="text-destructive hover:text-destructive"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
