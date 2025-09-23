import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { Button } from "../ui/button"
import Link from "next/link"
import { Heart, Scissors, Stethoscope, Truck } from "lucide-react"

const services = [
  {
    icon: Stethoscope,
    title: "Veterinary Care",
    description: "Professional medical care from certified veterinarians",
    features: ["Health checkups", "Vaccinations", "Emergency care"],
    href: "/veterinary",
  },
  {
    icon: Scissors,
    title: "Pet Grooming",
    description: "Professional grooming services to keep your pet looking great",
    features: ["Full grooming", "Nail trimming", "Dental care"],
    href: "/services",
  },
  {
    icon: Truck,
    title: "Free Delivery",
    description: "Fast and reliable delivery for all your pet supply needs",
    features: ["Same-day delivery", "Free shipping", "Scheduled delivery"],
    href: "/store",
  },
  {
    icon: Heart,
    title: "Pet Boarding",
    description: "Safe and comfortable boarding when you're away",
    features: ["24/7 supervision", "Play time", "Medical care"],
    href: "/services",
  },
]

export function ServicesPreview() {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">Our Services</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Comprehensive care and services designed to meet all your pet's needs under one roof
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service) => (
            <Card key={service.title} className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="mx-auto mb-4 p-3 rounded-full bg-primary/10 w-fit">
                  <service.icon className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-xl">{service.title}</CardTitle>
                <CardDescription>{service.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 mb-6">
                  {service.features.map((feature) => (
                    <li key={feature} className="text-sm text-muted-foreground">
                      • {feature}
                    </li>
                  ))}
                </ul>
                <Button variant="outline" size="sm" asChild className="w-full bg-transparent">
                  <Link href={service.href}>Learn More</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
