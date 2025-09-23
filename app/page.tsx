import { Header } from "../components/navigation/header"
import { HeroSection } from "../components/home/hero-section"
import { FeaturedCategories } from "../components/home/featured-categories"
import { ServicesPreview } from "../components/home/services-preview"
import { Testimonials } from "../components/home/testimonials"
import { Footer } from "../components/footer"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSection />
        <FeaturedCategories />
        <ServicesPreview />
        <Testimonials />
      </main>
      <Footer />
    </div>
  )
}
