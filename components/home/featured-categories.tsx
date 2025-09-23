import Link from "next/link"
import { Card, CardContent } from "../ui/card"
import { Button } from "../ui/button"

const categories = [
  {
    name: "Premium Food",
    description: "Nutritious meals for healthy pets",
    image: "/premium-pet-food-bowls.jpg",
    href: "/store?category=food",
    color: "from-green-400 to-emerald-500",
  },
  {
    name: "Fun Toys",
    description: "Interactive toys for active play",
    image: "/colorful-pet-toys.jpg",
    href: "/store?category=toys",
    color: "from-blue-400 to-cyan-500",
  },
  {
    name: "Health Care",
    description: "Essential health products",
    image: "/pet-health-care-products.jpg",
    href: "/store?category=health",
    color: "from-purple-400 to-pink-500",
  },
  {
    name: "Accessories",
    description: "Stylish collars and accessories",
    image: "/pet-collars-and-accessories.jpg",
    href: "/store?category=accessories",
    color: "from-orange-400 to-red-500",
  },
]

export function FeaturedCategories() {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">Shop by Category</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover our carefully curated selection of products designed to keep your pets happy and healthy
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <Card key={category.name} className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
              <CardContent className="p-0">
                <div className="relative">
                  <img
                    src={category.image || "/placeholder.svg"}
                    alt={category.name}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div
                    className={`absolute inset-0 bg-gradient-to-t ${category.color} opacity-20 group-hover:opacity-30 transition-opacity`}
                  ></div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{category.name}</h3>
                  <p className="text-muted-foreground mb-4">{category.description}</p>
                  <Button variant="outline" size="sm" asChild className="w-full bg-transparent">
                    <Link href={category.href}>Explore</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
