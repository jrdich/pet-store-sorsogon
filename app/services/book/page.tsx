import { Header } from "../../../components/navigation/header"
import { Footer } from "../../../components/footer"
import { ServiceBookingForm } from "../../../components/services/service-booking-form"

export default function ServiceBookingPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-4">Book a Service</h1>
            <p className="text-muted-foreground">
              Schedule a professional service for your pet
            </p>
          </div>
          <ServiceBookingForm />
        </div>
      </main>
      <Footer />
    </div>
  )
}