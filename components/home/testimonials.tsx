import { Card, CardContent } from "../ui/card"
import { Star } from "lucide-react"

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Dog Owner",
    content:
      "PawStore has everything I need for my Golden Retriever. The quality is amazing and the veterinary services are top-notch!",
    rating: 5,
    image: "/woman-and-loyal-companion.png",
  },
  {
    name: "Mike Chen",
    role: "Cat Parent",
    content:
      "The convenience of having a pet store and vet clinic in one place is incredible. My cats love their new toys!",
    rating: 5,
    image: "/man-and-cat.png",
  },
  {
    name: "Emily Rodriguez",
    role: "Multi-Pet Owner",
    content: "From food to grooming to emergency care, PawStore takes care of all my pets' needs. Highly recommended!",
    rating: 5,
    image: "/woman-with-multiple-pets.jpg",
  },
]

export function Testimonials() {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">What Pet Parents Say</h2>
          <p className="text-lg text-muted-foreground">
            Join thousands of satisfied customers who trust us with their pets
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.name} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-6 italic">"{testimonial.content}"</p>
                <div className="flex items-center">
                  <img
                    src={testimonial.image || "/placeholder.svg"}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <div className="font-semibold">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
