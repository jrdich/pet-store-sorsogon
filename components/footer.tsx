import Link from "next/link"
import { Heart, Facebook, Twitter, Instagram, Mail, Phone, MapPin } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-full bg-white/20 flex items-center justify-center">
                <Heart className="h-4 w-4" />
              </div>
              <span className="text-xl font-bold">PZS</span>
            </Link>
            <p className="text-primary-foreground/80">
              Your trusted partner in pet care, providing quality products and professional services for your beloved
              companions.
            </p>
            <div className="flex space-x-4">
              <Facebook className="h-5 w-5 hover:text-white/80 cursor-pointer" />
              <Twitter className="h-5 w-5 hover:text-white/80 cursor-pointer" />
              <Instagram className="h-5 w-5 hover:text-white/80 cursor-pointer" />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/store" className="text-primary-foreground/80 hover:text-white">
                  Store
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-primary-foreground/80 hover:text-white">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/veterinary" className="text-primary-foreground/80 hover:text-white">
                  Veterinary
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-primary-foreground/80 hover:text-white">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              <li className="text-primary-foreground/80">Pet Grooming</li>
              <li className="text-primary-foreground/80">Veterinary Care</li>
              <li className="text-primary-foreground/80">Pet Boarding</li>
              <li className="text-primary-foreground/80">Emergency Care</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-4">Contact Info</h3>
            <ul className="space-y-2">
              <li className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <span className="text-primary-foreground/80">(555) 123-4567</span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span className="text-primary-foreground/80">info@pzs.com</span>
              </li>
              <li className="flex items-center space-x-2">
                <MapPin className="h-4 w-4" />
                <span className="text-primary-foreground/80">123 Pet Street, City, ST 12345</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center">
          <p className="text-primary-foreground/80">
            © 2025 PZS. All rights reserved. Made with ❤️ for pets and their families.
          </p>
        </div>
      </div>
    </footer>
  )
}
