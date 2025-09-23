"use client"

import { LoadingButton } from "../ui/loading-button"
import { useRouter } from "next/navigation"
import { ArrowRight, Star } from "lucide-react"
import { useLoadingState } from "@/hooks/use-loading-state"

export function HeroSection() {
  const router = useRouter()
  const { isLoading: isStoreLoading, withLoading: withStoreLoading } = useLoadingState()
  const { isLoading: isAppointmentLoading, withLoading: withAppointmentLoading } = useLoadingState()
  
  const handleStoreClick = () => withStoreLoading(async () => {
    await router.push('/store')
  })

  const handleAppointmentClick = () => withAppointmentLoading(async () => {
    await router.push('/veterinary')
  })

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-orange-50">
      <div className="container mx-auto px-4 py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">Trusted by 10,000+ pet owners</span>
              </div>
              <h1 className="text-4xl lg:text-6xl font-bold text-balance leading-tight">
                Everything your{" "}
                <span className="bg-gradient-to-r from-orange-400 to-pink-400 bg-clip-text text-transparent">
                  furry friend
                </span>{" "}
                needs
              </h1>
              <p className="text-lg text-muted-foreground text-pretty max-w-md">
                From premium pet food to professional veterinary care, we provide comprehensive solutions for your
                beloved pets' health and happiness.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <LoadingButton
                size="lg"
                onClick={handleStoreClick}
                isLoading={isStoreLoading}
                loadingText="Loading Store..."
                className="group"
              >
                Shop Now
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </LoadingButton>
              <LoadingButton
                variant="outline"
                size="lg"
                onClick={handleAppointmentClick}
                isLoading={isAppointmentLoading}
                loadingText="Loading Appointments..."
              >
                Book Appointment
              </LoadingButton>
            </div>

            <div className="grid grid-cols-3 gap-8 pt-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-foreground">5000+</div>
                <div className="text-sm text-muted-foreground">Products</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-foreground">24/7</div>
                <div className="text-sm text-muted-foreground">Support</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-foreground">99%</div>
                <div className="text-sm text-muted-foreground">Satisfaction</div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="relative z-10">
              <img
                src="/happy-golden-retriever-with-pet-accessories.jpg"
                alt="Happy pet with accessories"
                className="w-full h-auto rounded-2xl shadow-2xl"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-orange-200 to-pink-200 rounded-2xl transform rotate-3 scale-105 opacity-20"></div>
          </div>
        </div>
      </div>
    </section>
  )
}
