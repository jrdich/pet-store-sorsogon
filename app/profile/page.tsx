"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Label } from "../../components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card"
import { User, Eye, EyeOff, Camera, Save, Check } from "lucide-react"

export default function ProfilePage() {
  const { data: session } = useSession()
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [currentPassword, setCurrentPassword] = useState("")
  const [isPasswordVerified, setIsPasswordVerified] = useState(false)
  const [profileImage, setProfileImage] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isSaved, setIsSaved] = useState(false)
  const [formData, setFormData] = useState({
    name: session?.user?.name || "",
    email: session?.user?.email || "",
    password: ""
  })

  useEffect(() => {
    if (session?.user?.email) {
      const savedProfile = localStorage.getItem(`userProfile_${session.user.email}`)
      if (savedProfile) {
        const profile = JSON.parse(savedProfile)
        setFormData(prev => ({ ...prev, ...profile }))
        if (profile.image) setProfileImage(profile.image)
      }
    }
  }, [session])

  const handlePasswordVerification = () => {
    if (currentPassword === "password123") {
      setIsPasswordVerified(true)
      setFormData(prev => ({ ...prev, password: currentPassword }))
    }
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => setProfileImage(e.target?.result as string)
      reader.readAsDataURL(file)
    }
  }

  const handleSave = async () => {
    setIsLoading(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Save to localStorage with user-specific key
      const profileData = { ...formData, image: profileImage }
      if (session?.user?.email) {
        localStorage.setItem(`userProfile_${session.user.email}`, JSON.stringify(profileData))
      }
      
      setIsSaved(true)
      
      // Redirect to homepage after 1 second
      setTimeout(() => {
        router.push('/')
      }, 1000)
    } catch (error) {
      console.error('Save failed:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <Card>
        <CardHeader className="text-center">
          <div className="flex flex-col items-center space-y-4">
            <div className="relative">
              <div className="h-24 w-24 rounded-full bg-gradient-to-r from-orange-400 to-pink-400 flex items-center justify-center overflow-hidden">
                {profileImage ? (
                  <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <User className="h-12 w-12 text-white" />
                )}
              </div>
              <label htmlFor="profile-upload" className="absolute bottom-0 right-0 bg-white rounded-full p-1 shadow-lg cursor-pointer hover:bg-gray-50">
                <Camera className="h-4 w-4" />
              </label>
              <input
                id="profile-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
              />
            </div>
            <CardTitle>Edit Profile</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              />
            </div>

            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
              />
            </div>

            <div>
              <Label htmlFor="password">Password</Label>
              {!isPasswordVerified ? (
                <div className="space-y-2">
                  <div className="relative">
                    <Input
                      id="current-password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter current password to view/edit"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-2 top-1/2 -translate-y-1/2"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                  <Button onClick={handlePasswordVerification} size="sm">
                    Verify Password
                  </Button>
                </div>
              ) : (
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-2 top-1/2 -translate-y-1/2"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              )}
            </div>
          </div>

          <Button 
            className="w-full" 
            onClick={handleSave}
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
            ) : isSaved ? (
              <Check className="h-4 w-4 mr-2" />
            ) : (
              <Save className="h-4 w-4 mr-2" />
            )}
            {isLoading ? "Saving..." : isSaved ? "Saved!" : "Save Changes"}
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}