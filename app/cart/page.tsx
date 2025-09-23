import { Header } from "../../components/navigation/header"
import { Footer } from "../../components/footer"
import { Button } from "../../components/ui/button"
import { ArrowLeft, ShoppingCart } from "lucide-react"
import Link from "next/link"
import { CartClientWrapper } from "../../components/cart/cart-client-wrapper"

export default function CartPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Button variant="ghost" asChild className="mb-4">
            <Link href="/store">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Continue Shopping
            </Link>
          </Button>

          <h1 className="text-3xl font-bold flex items-center">
            <ShoppingCart className="mr-3 h-8 w-8" />
            Shopping Cart
          </h1>
        </div>

        <CartClientWrapper />
      </main>

      <Footer />
    </div>
  )
}
