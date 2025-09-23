import { Header } from "../../components/navigation/header"
import { Footer } from "../../components/footer"
import { AppointmentForm } from "../../components/veterinary/appointment-form"
import { AppointmentList } from "../../components/veterinary/appointment-list"
import { Card, CardContent } from "../../components/ui/card"
import { Stethoscope, Clock, Shield, Award, Heart, Users } from "lucide-react"

export default function VeterinaryPage() {
  const services = [
    {
      icon: Stethoscope,
      title: "General Health Checkups",
      description: "Comprehensive health examinations to keep your pet in optimal condition",
    },
    {
      icon: Shield,
      title: "Vaccinations & Preventive Care",
      description: "Essential vaccines and preventive treatments to protect your pet's health",
    },
    {
      icon: Heart,
      title: "Emergency Care",
      description: "24/7 emergency services for urgent medical situations",
    },
    {
      icon: Users,
      title: "Surgical Procedures",
      description: "Advanced surgical care with state-of-the-art equipment and techniques",
    },
  ]

  const features = [
    {
      icon: Award,
      title: "Certified Veterinarians",
      description: "Our team consists of licensed and experienced veterinary professionals",
    },
    {
      icon: Clock,
      title: "Flexible Scheduling",
      description: "Convenient appointment times that work with your schedule",
    },
    {
      icon: Shield,
      title: "Modern Equipment",
      description: "State-of-the-art medical equipment for accurate diagnosis and treatment",
    },
    {
      icon: Heart,
      title: "Compassionate Care",
      description: "We treat every pet with love, care, and respect they deserve",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-50 to-green-50 py-20">
          <div className="container mx-auto px-4 text-center">
            <div className="mx-auto mb-6 p-4 rounded-full bg-primary/10 w-fit">
              <Stethoscope className="h-12 w-12 text-primary" />
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">Professional Veterinary Care</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
              Comprehensive medical care for your beloved pets with experienced veterinarians and modern facilities
            </p>
          </div>
        </section>

        {/* Services */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Our Veterinary Services</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Complete medical care for pets of all ages, from routine checkups to emergency treatments
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {services.map((service, index) => (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="mx-auto mb-4 p-3 rounded-full bg-primary/10 w-fit">
                      <service.icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-semibold mb-2">{service.title}</h3>
                    <p className="text-sm text-muted-foreground">{service.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Why Choose Our Veterinary Clinic?</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                We're committed to providing the highest quality medical care for your pets
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, index) => (
                <Card key={index} className="text-center">
                  <CardContent className="p-6">
                    <div className="mx-auto mb-4 p-3 rounded-full bg-primary/10 w-fit">
                      <feature.icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-semibold mb-2">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Appointment Booking */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Book an Appointment</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Schedule a visit with our veterinary team to ensure your pet receives the best care possible
              </p>
            </div>

            <AppointmentForm />
          </div>
        </section>

        {/* Appointment List */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <AppointmentList />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
