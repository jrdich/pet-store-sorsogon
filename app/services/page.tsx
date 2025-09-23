import { Header } from "../../components/navigation/header"
import { Footer } from "../../components/footer"
import { ServiceCard } from "../../components/services/service-card"
import { Card, CardContent } from "../../components/ui/card"
import { Button } from "../../components/ui/button"
import { Scissors, Heart, GraduationCap, Home, Clock, Shield, Award } from "lucide-react"
import Link from "next/link"
import { mockServices } from "../../lib/mock-data"

export default function ServicesPage() {
  const serviceCategories = [
    {
      icon: Scissors,
      title: "Professional Grooming",
      description: "Keep your pets looking and feeling their best with our expert grooming services.",
      services: mockServices.filter((s) => s.id.includes("grooming")),
    },
    {
      icon: Home,
      title: "Pet Boarding & Care",
      description: "Safe, comfortable, and loving care for your pets when you can't be there.",
      services: mockServices.filter((s) => s.id.includes("boarding")),
    },
    {
      icon: GraduationCap,
      title: "Training Programs",
      description: "Professional training to help your pets become well-behaved family members.",
      services: mockServices.filter((s) => s.id.includes("training")),
    },
  ]

  const whyChooseUs = [
    {
      icon: Award,
      title: "Certified Professionals",
      description: "Our team consists of certified pet care specialists with years of experience.",
    },
    {
      icon: Shield,
      title: "Safe & Secure",
      description: "Your pet's safety is our top priority with secure facilities and protocols.",
    },
    {
      icon: Heart,
      title: "Loving Care",
      description: "We treat every pet as if they were our own, with love and attention.",
    },
    {
      icon: Clock,
      title: "Flexible Scheduling",
      description: "Convenient appointment times that work with your busy schedule.",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-50 to-orange-50 py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">Professional Pet Services</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
              From grooming to training, we provide comprehensive care services to keep your pets healthy, happy, and
              well-behaved.
            </p>
            <Button size="lg" asChild>
              <Link href="#services">Explore Services</Link>
            </Button>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Why Choose PawStore Services?</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                We're committed to providing the highest quality care for your beloved pets
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {whyChooseUs.map((item, index) => (
                <Card key={index} className="text-center">
                  <CardContent className="p-6">
                    <div className="mx-auto mb-4 p-3 rounded-full bg-primary/10 w-fit">
                      <item.icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-semibold mb-2">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Services */}
        <section id="services" className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            {serviceCategories.map((category, categoryIndex) => (
              <div key={categoryIndex} className="mb-16 last:mb-0">
                <div className="text-center mb-8">
                  <div className="mx-auto mb-4 p-3 rounded-full bg-primary/10 w-fit">
                    <category.icon className="h-8 w-8 text-primary" />
                  </div>
                  <h2 className="text-3xl font-bold mb-4">{category.title}</h2>
                  <p className="text-muted-foreground max-w-2xl mx-auto">{category.description}</p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {category.services.map((service) => (
                    <ServiceCard key={service.id} {...service} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Book a Service?</h2>
            <p className="text-lg mb-8 opacity-90">
              Give your pet the care they deserve with our professional services
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" asChild>
                <Link href="/contact">Contact Us</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/veterinary">Book Vet Appointment</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
