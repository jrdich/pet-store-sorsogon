import { Header } from "../../components/navigation/header"
import { Footer } from "../../components/footer"
import { ContactForm } from "../../components/contact/contact-form"
import { Card, CardContent } from "../../components/ui/card"
import { Button } from "../../components/ui/button"
import { MapPin, Phone, Mail, Clock, MessageCircle, Facebook, Twitter, Instagram, Navigation } from "lucide-react"

export default function ContactPage() {
  const contactInfo = [
    {
      icon: MapPin,
      title: "Visit Our Store",
      details: ["123 Pet Street", "Petville, PV 12345", "United States"],
      action: "Get Directions",
    },
    {
      icon: Phone,
      title: "Call Us",
      details: ["Main: (555) 123-4567", "Emergency: (555) 123-4568", "Toll-free: 1-800-PAWSTORE"],
      action: "Call Now",
    },
    {
      icon: Mail,
      title: "Email Us",
      details: ["info@pawstore.com", "support@pawstore.com", "emergency@pawstore.com"],
      action: "Send Email",
    },
    {
      icon: Clock,
      title: "Store Hours",
      details: ["Mon-Fri: 8:00 AM - 8:00 PM", "Saturday: 9:00 AM - 6:00 PM", "Sunday: 10:00 AM - 5:00 PM"],
      action: "View Calendar",
    },
  ]

  const emergencyInfo = [
    {
      title: "24/7 Emergency Hotline",
      phone: "(555) 123-4568",
      description: "For urgent pet medical emergencies",
    },
    {
      title: "After-Hours Support",
      phone: "(555) 123-4569",
      description: "For non-emergency questions outside business hours",
    },
  ]

  const socialLinks = [
    { icon: Facebook, name: "Facebook", href: "#" },
    { icon: Twitter, name: "Twitter", href: "#" },
    { icon: Instagram, name: "Instagram", href: "#" },
  ]

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-50 to-orange-50 py-20">
          <div className="container mx-auto px-4 text-center">
            <div className="mx-auto mb-6 p-4 rounded-full bg-primary/10 w-fit">
              <MessageCircle className="h-12 w-12 text-primary" />
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">Contact Us</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We're here to help you and your pets. Get in touch with us for any questions, concerns, or to schedule an
              appointment.
            </p>
          </div>
        </section>

        {/* Contact Information */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Get in Touch</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Multiple ways to reach us - choose what works best for you
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {contactInfo.map((info, index) => (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="mx-auto mb-4 p-3 rounded-full bg-primary/10 w-fit">
                      <info.icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-semibold mb-3">{info.title}</h3>
                    <div className="space-y-1 mb-4">
                      {info.details.map((detail, detailIndex) => (
                        <p key={detailIndex} className="text-sm text-muted-foreground">
                          {detail}
                        </p>
                      ))}
                    </div>
                    <Button variant="outline" size="sm" className="w-full bg-transparent">
                      {info.action}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Emergency Contact */}
        <section className="py-20 bg-destructive/5">
          <div className="container mx-auto px-4">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4 text-destructive">Emergency Contact</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                For urgent situations, please use our emergency contact information
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {emergencyInfo.map((emergency, index) => (
                <Card key={index} className="border-destructive/20">
                  <CardContent className="p-6 text-center">
                    <h3 className="font-semibold text-lg mb-2">{emergency.title}</h3>
                    <p className="text-2xl font-bold text-destructive mb-2">{emergency.phone}</p>
                    <p className="text-sm text-muted-foreground">{emergency.description}</p>
                    <Button variant="destructive" className="mt-4">
                      <Phone className="mr-2 h-4 w-4" />
                      Call Now
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Form */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Send Us a Message</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Fill out the form below and we'll get back to you as soon as possible
              </p>
            </div>

            <ContactForm />
          </div>
        </section>

        {/* Map and Additional Info */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6">Visit Our Store</h2>
                <p className="text-muted-foreground mb-6">
                  Come visit us in person! Our friendly staff is always ready to help you find exactly what your pet
                  needs. We're conveniently located in the heart of Petville with plenty of parking available.
                </p>

                <div className="space-y-4 mb-6">
                  <div className="flex items-center">
                    <MapPin className="mr-3 h-5 w-5 text-primary" />
                    <div>
                      <p className="font-semibold">123 Pet Street</p>
                      <p className="text-sm text-muted-foreground">Petville, PV 12345</p>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <Navigation className="mr-3 h-5 w-5 text-primary" />
                    <div>
                      <p className="font-semibold">Easy to Find</p>
                      <p className="text-sm text-muted-foreground">Next to the city park, across from the library</p>
                    </div>
                  </div>
                </div>

                <Button size="lg" className="mb-6">
                  <Navigation className="mr-2 h-4 w-4" />
                  Get Directions
                </Button>

                <div>
                  <h3 className="font-semibold mb-3">Follow Us</h3>
                  <div className="flex space-x-4">
                    {socialLinks.map((social, index) => (
                      <Button key={index} variant="outline" size="sm">
                        <social.icon className="h-4 w-4" />
                      </Button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="bg-muted rounded-lg p-8 text-center">
                <div className="bg-primary/10 rounded-lg p-12 mb-4">
                  <MapPin className="mx-auto h-24 w-24 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Interactive Map</h3>
                <p className="text-muted-foreground mb-4">
                  Click below to view our location on an interactive map with directions
                </p>
                <Button variant="outline">View on Map</Button>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Quick answers to common questions about our services and policies
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold mb-2">What are your store hours?</h3>
                  <p className="text-sm text-muted-foreground">
                    We're open Monday-Friday 8AM-8PM, Saturday 9AM-6PM, and Sunday 10AM-5PM.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Do you offer emergency services?</h3>
                  <p className="text-sm text-muted-foreground">
                    Yes, we have 24/7 emergency veterinary services available. Call our emergency hotline at (555)
                    123-4568.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Can I schedule appointments online?</h3>
                  <p className="text-sm text-muted-foreground">
                    You can book veterinary appointments through our website or call us directly.
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold mb-2">Do you deliver products?</h3>
                  <p className="text-sm text-muted-foreground">
                    Yes, we offer free delivery for orders over $50 within a 10-mile radius of our store.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">What payment methods do you accept?</h3>
                  <p className="text-sm text-muted-foreground">
                    We accept all major credit cards, debit cards, cash, and pet insurance for veterinary services.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Do you have a loyalty program?</h3>
                  <p className="text-sm text-muted-foreground">
                    Yes! Join our PawPoints program to earn rewards on every purchase and get exclusive member
                    discounts.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
