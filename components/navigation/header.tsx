"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useSession, signOut } from "next-auth/react"
import { Button } from "../ui/button"
import { Badge } from "../ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator, DropdownMenuLabel } from "../ui/dropdown-menu"
import { ShoppingCart, User, Menu, X, Heart, Search, Mail } from "lucide-react"
import { useCart } from "../../lib/cart-context"

export function Header() {
  const { data: session } = useSession()
  const { state } = useCart()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [userProfile, setUserProfile] = useState(null)

  useEffect(() => {
    if (session?.user?.email) {
      const savedProfile = localStorage.getItem(`userProfile_${session.user.email}`)
      if (savedProfile) {
        setUserProfile(JSON.parse(savedProfile))
      } else {
        setUserProfile(null)
      }
    } else {
      setUserProfile(null)
    }
  }, [session])


  const navigation = [
    { name: "Home", href: "/" },
    { name: "Store", href: "/store" },
    { name: "Services", href: "/services" },
    { name: "Veterinary", href: "/veterinary" },
    { name: "Contact", href: "/contact" },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-full bg-gradient-to-r from-orange-400 to-pink-400 flex items-center justify-center">
              <Heart className="h-4 w-4 text-white" />
            </div>
            <span className="text-xl font-bold text-foreground">PawStore</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            <Button variant="ghost" size="sm" className="hidden sm:flex">
              <Search className="h-4 w-4" />
            </Button>

            {/* Cart */}
            <Link href="/cart">
              <Button variant="ghost" size="sm" className="relative">
                <ShoppingCart className="h-4 w-4" />
                {state.totalItems > 0 && (
                  <Badge
                    variant="destructive"
                    className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
                  >
                    {state.totalItems}
                  </Badge>
                )}
              </Button>
            </Link>

            {/* User Menu */}
            {session ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="hover:bg-accent">
                    <User className="h-4 w-4" />
                    <span className="hidden sm:ml-2 sm:inline">{userProfile?.name || session.user.name}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-80 p-4">
                  <DropdownMenuLabel className="text-center pb-2">
                    <div className="flex flex-col items-center space-y-2">
                      <div className="h-12 w-12 rounded-full bg-gradient-to-r from-orange-400 to-pink-400 flex items-center justify-center overflow-hidden">
                        {userProfile?.image || session.user.image ? (
                          <img src={userProfile?.image || session.user.image} alt="Profile" className="w-full h-full object-cover" />
                        ) : (
                          <User className="h-6 w-6 text-white" />
                        )}
                      </div>
                      <span className="font-semibold">User Profile</span>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  
                  {/* User Details */}
                  <div className="space-y-3 py-2">
                    <div className="flex items-center space-x-3 p-2 rounded-lg hover:bg-accent/50 transition-colors">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <div className="flex-1">
                        <p className="text-xs text-muted-foreground">Full Name</p>
                        <p className="text-sm font-medium">{userProfile?.name || session.user.name || 'Not provided'}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3 p-2 rounded-lg hover:bg-accent/50 transition-colors">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <div className="flex-1">
                        <p className="text-xs text-muted-foreground">Email</p>
                        <p className="text-sm font-medium">{userProfile?.email || session.user.email || 'Not provided'}</p>
                      </div>
                    </div>
                    

                  </div>
                  
                  <DropdownMenuSeparator />
                  
                  {/* Menu Items */}
                  <DropdownMenuItem asChild className="cursor-pointer">
                    <Link href="/profile" className="flex items-center space-x-2">
                      <User className="h-4 w-4" />
                      <span>Edit Profile</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild className="cursor-pointer">
                    <Link href="/orders" className="flex items-center space-x-2">
                      <ShoppingCart className="h-4 w-4" />
                      <span>My Orders</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem 
                    onClick={() => {
                      if (session?.user?.email) {
                        localStorage.removeItem(`userProfile_${session.user.email}`)
                      }
                      signOut()
                    }} 
                    className="cursor-pointer text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    <span>Sign Out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="hidden sm:flex items-center space-x-2">
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/auth/signin">Sign In</Link>
                </Button>
                <Button size="sm" asChild>
                  <Link href="/auth/signup">Sign Up</Link>
                </Button>
              </div>
            )}

            {/* Mobile Menu Button */}
            <Button variant="ghost" size="sm" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t py-4">
            <nav className="flex flex-col space-y-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              {!session && (
                <div className="flex flex-col space-y-2 pt-4 border-t">
                  <Button variant="ghost" size="sm" asChild>
                    <Link href="/auth/signin" onClick={() => setIsMenuOpen(false)}>
                      Sign In
                    </Link>
                  </Button>
                  <Button size="sm" asChild>
                    <Link href="/auth/signup" onClick={() => setIsMenuOpen(false)}>
                      Sign Up
                    </Link>
                  </Button>
                </div>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
