"use client"

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card"
import { LoadingButton } from "../ui/loading-button"
import { Badge } from "../ui/badge"
import { Clock, CheckCircle } from "lucide-react"
import { useRouter } from "next/navigation"
import { useLoadingState } from "@/hooks/use-loading-state"

interface ServiceCardProps {
  id: string
  name: string
  description: string
  price: number
  duration: string
  image: string
  features: string[]
}

export function ServiceCard({ id, name, description, price, duration, image, features }: ServiceCardProps) {
  const router = useRouter()
  const { isLoading, withLoading } = useLoadingState()
  
  const handleBooking = () => withLoading(async () => {
    await router.push(`/services/book?service=${id}`)
  })

  return (
    <Card className="hover:shadow-lg transition-shadow h-full flex flex-col">
      <CardHeader className="p-0">
        <img src={image || "/placeholder.svg"} alt={name} className="w-full h-48 object-cover rounded-t-lg" />
      </CardHeader>

      <CardContent className="p-6 flex-1">
        <div className="flex items-center justify-between mb-2">
          <Badge variant="secondary" className="text-xs">
            Service
          </Badge>
          <div className="flex items-center text-sm text-muted-foreground">
            <Clock className="w-4 h-4 mr-1" />
            {duration}
          </div>
        </div>

        <CardTitle className="text-xl mb-2">{name}</CardTitle>
        <p className="text-muted-foreground mb-4">{description}</p>

        <div className="space-y-2 mb-4">
          {features.map((feature, index) => (
            <div key={index} className="flex items-center text-sm">
              <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
              <span>{feature}</span>
            </div>
          ))}
        </div>

        <div className="text-2xl font-bold text-primary">${price}</div>
      </CardContent>

      <CardFooter className="p-6 pt-0">
        <LoadingButton
          className="w-full"
          isLoading={isLoading}
          loadingText="Loading..."
          onClick={handleBooking}
        >
          Book Service
        </LoadingButton>
      </CardFooter>
    </Card>
  )
}
