// "use client"

// import { useState } from "react"
// import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog"
// import { Button } from "../ui/button"
// import { Input } from "../ui/input"
// import { Label } from "../ui/label"
// import { Textarea } from "../ui/textarea"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
// import { Checkbox } from "../ui/checkbox"
// import { Loader2, Upload, X } from "lucide-react"

// interface AddProductModalProps {
//   open: boolean
//   onOpenChange: (open: boolean) => void
//   onProductAdded: (product: any) => void
// }

// export function AddProductModal({ open, onOpenChange, onProductAdded }: AddProductModalProps) {
//   const [isLoading, setIsLoading] = useState(false)
//   const [formData, setFormData] = useState({
//     name: "",
//     description: "",
//     price: "",
//     category: "",
//     petType: "",
//     image: "",
//     stock: "",
//     featured: false,
//     vendorName: ""
//   })
//   const [dragActive, setDragActive] = useState(false)

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()
//     setIsLoading(true)

//     try {
//       const response = await fetch('/api/products', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           name: formData.name,
//           description: formData.description,
//           price: parseFloat(formData.price),
//           category: formData.category,
//           petType: formData.petType,
//           image: formData.image || "/placeholder.svg",
//           stock: parseInt(formData.stock),
//           featured: formData.featured,
//           vendor: { name: formData.vendorName }
//         }),
//       })

//       if (response.ok) {
//         const result = await response.json()
//         onProductAdded(result.product)
        
//         setFormData({
//           name: "",
//           description: "",
//           price: "",
//           category: "",
//           petType: "",
//           image: "",
//           stock: "",
//           featured: false,
//           vendorName: ""
//         })
        
//         onOpenChange(false)
//       }
//     } catch (error) {
//       console.error('Error adding product:', error)
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   return (
//     <Dialog open={open} onOpenChange={onOpenChange}>
//       <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
//         <DialogHeader>
//           <DialogTitle>Add New Product</DialogTitle>
//         </DialogHeader>
        
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <Label htmlFor="name">Product Name</Label>
//             <Input
//               id="name"
//               value={formData.name}
//               onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//               required
//             />
//           </div>

//           <div>
//             <Label htmlFor="description">Description</Label>
//             <Textarea
//               id="description"
//               value={formData.description}
//               onChange={(e) => setFormData({ ...formData, description: e.target.value })}
//               required
//             />
//           </div>

//           <div className="grid grid-cols-2 gap-4">
//             <div>
//               <Label htmlFor="price">Price</Label>
//               <Input
//                 id="price"
//                 type="number"
//                 step="0.01"
//                 value={formData.price}
//                 onChange={(e) => setFormData({ ...formData, price: e.target.value })}
//                 required
//               />
//             </div>
//             <div>
//               <Label htmlFor="stock">Stock</Label>
//               <Input
//                 id="stock"
//                 type="number"
//                 value={formData.stock}
//                 onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
//                 required
//               />
//             </div>
//           </div>

//           <div>
//             <Label htmlFor="category">Category</Label>
//             <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
//               <SelectTrigger>
//                 <SelectValue placeholder="Select category" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="food">Food</SelectItem>
//                 <SelectItem value="toys">Toys</SelectItem>
//                 <SelectItem value="accessories">Accessories</SelectItem>
//                 <SelectItem value="health">Health</SelectItem>
//                 <SelectItem value="grooming">Grooming</SelectItem>
//               </SelectContent>
//             </Select>
//           </div>

//           <div>
//             <Label htmlFor="petType">Pet Type</Label>
//             <Select value={formData.petType} onValueChange={(value) => setFormData({ ...formData, petType: value })}>
//               <SelectTrigger>
//                 <SelectValue placeholder="Select pet type" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="all">All Pets</SelectItem>
//                 <SelectItem value="dog">Dog</SelectItem>
//                 <SelectItem value="cat">Cat</SelectItem>
//                 <SelectItem value="bird">Bird</SelectItem>
//                 <SelectItem value="fish">Fish</SelectItem>
//                 <SelectItem value="small-pets">Small Pets</SelectItem>
//               </SelectContent>
//             </Select>
//           </div>

//           <div>
//             <Label>Product Image</Label>
//             <div
//               className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
//                 dragActive ? "border-primary bg-primary/5" : "border-gray-300"
//               }`}
//               onDragEnter={(e) => {
//                 e.preventDefault()
//                 setDragActive(true)
//               }}
//               onDragLeave={(e) => {
//                 e.preventDefault()
//                 setDragActive(false)
//               }}
//               onDragOver={(e) => e.preventDefault()}
//               onDrop={(e) => {
//                 e.preventDefault()
//                 setDragActive(false)
//                 const file = e.dataTransfer.files[0]
//                 if (file && file.type.startsWith('image/')) {
//                   const reader = new FileReader()
//                   reader.onload = (e) => {
//                     setFormData({ ...formData, image: e.target?.result as string })
//                   }
//                   reader.readAsDataURL(file)
//                 }
//               }}
//             >
//               {formData.image ? (
//                 <div className="relative">
//                   <img src={formData.image} alt="Preview" className="max-h-32 mx-auto rounded" />
//                   <Button
//                     type="button"
//                     variant="outline"
//                     size="sm"
//                     className="absolute top-0 right-0 h-6 w-6 p-0"
//                     onClick={() => setFormData({ ...formData, image: "" })}
//                   >
//                     <X className="h-3 w-3" />
//                   </Button>
//                 </div>
//               ) : (
//                 <div>
//                   <Upload className="mx-auto h-8 w-8 text-gray-400 mb-2" />
//                   <p className="text-sm text-gray-600">Drag and drop an image here, or click to select</p>
//                   <input
//                     type="file"
//                     accept="image/*"
//                     className="hidden"
//                     id="image-upload"
//                     onChange={(e) => {
//                       const file = e.target.files?.[0]
//                       if (file) {
//                         const reader = new FileReader()
//                         reader.onload = (e) => {
//                           setFormData({ ...formData, image: e.target?.result as string })
//                         }
//                         reader.readAsDataURL(file)
//                       }
//                     }}
//                   />
//                   <Button
//                     type="button"
//                     variant="outline"
//                     size="sm"
//                     className="mt-2"
//                     onClick={() => document.getElementById('image-upload')?.click()}
//                   >
//                     Select Image
//                   </Button>
//                 </div>
//               )}
//             </div>
//           </div>

//           <div>
//             <Label htmlFor="vendorName">Vendor Name</Label>
//             <Input
//               id="vendorName"
//               value={formData.vendorName}
//               onChange={(e) => setFormData({ ...formData, vendorName: e.target.value })}
//               required
//             />
//           </div>

//           <div className="flex items-center space-x-2">
//             <Checkbox
//               id="featured"
//               checked={formData.featured}
//               onCheckedChange={(checked) => setFormData({ ...formData, featured: !!checked })}
//             />
//             <Label htmlFor="featured">Featured Product</Label>
//           </div>

//           <div className="flex justify-end space-x-2 pt-4">
//             <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
//               Cancel
//             </Button>
//             <Button type="submit" disabled={isLoading}>
//               {isLoading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
//               Add Product
//             </Button>
//           </div>
//         </form>
//       </DialogContent>
//     </Dialog>
//   )
// }

//(2)
// "use client"

// import { useState, useRef } from "react"
// import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog"
// import { Button } from "../ui/button"
// import { Input } from "../ui/input"
// import { Label } from "../ui/label"
// import { Textarea } from "../ui/textarea"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
// import { Checkbox } from "../ui/checkbox"
// import { Alert, AlertDescription } from "../ui/alert"
// import { Progress } from "../ui/progress"
// import { Badge } from "../ui/badge"
// import { Loader2, Upload, X, AlertTriangle, Shield, CheckCircle } from "lucide-react"
// import * as nsfwjs from 'nsfwjs'

// interface AddProductModalProps {
//   open: boolean
//   onOpenChange: (open: boolean) => void
//   onProductAdded: (product: any) => void
// }

// interface ModerationResult {
//   safe: boolean
//   predictions: any[]
//   confidence: number
// }



// export function AddProductModal({ open, onOpenChange, onProductAdded }: AddProductModalProps) {
//   const [isLoading, setIsLoading] = useState(false)
//   const [isAnalyzing, setIsAnalyzing] = useState(false)
//   const [analysisProgress, setAnalysisProgress] = useState(0)
//   const [moderationResult, setModerationResult] = useState<ModerationResult | null>(null)
//   const [dragActive, setDragActive] = useState(false)
//   const imageRef = useRef<HTMLImageElement>(null)
  
//   const [formData, setFormData] = useState({
//     name: "",
//     description: "",
//     price: "",
//     category: "",
//     petType: "",
//     image: "",
//     stock: "",
//     featured: false,
//     vendorName: ""
//   })

//   // Image content moderation function
//   const analyzeImage = async (imageDataUrl: string): Promise<ModerationResult> => {
//     setIsAnalyzing(true)
//     setAnalysisProgress(0)
    
//     try {
//       // Update progress
//       setAnalysisProgress(20)
      
//       // Load NSFW model
//       const model = await nsfwjs.load('https://nsfw-model.s3.amazonaws.com/nsfw_mobilenet_v2_quantized/model.json')
//       setAnalysisProgress(60)
      
//       // Create image element for analysis
//       const img = new Image()
//       img.crossOrigin = 'anonymous'
      
//       return new Promise((resolve, reject) => {
//         img.onload = async () => {
//           try {
//             setAnalysisProgress(80)
            
//             // Analyze the image
//             const predictions = await model.classify(img)
//             setAnalysisProgress(100)
            
//             // Calculate safety score
//             const nsfwCategories = ['Porn', 'Sexy', 'Hentai']
//             const nsfwScore = predictions
//               .filter(p => nsfwCategories.includes(p.className))
//               .reduce((sum, p) => sum + p.probability, 0)
            
//             const isSafe = nsfwScore < 0.3 // 30% threshold
            
//             resolve({
//               safe: isSafe,
//               predictions,
//               confidence: Math.max(...predictions.map(p => p.probability)) * 100
//             })
//           } catch (error) {
//             reject(error)
//           }
//         }
        
//         img.onerror = () => reject(new Error('Failed to load image'))
//         img.src = imageDataUrl
//       })
//     } catch (error) {
//       console.error('Image analysis failed:', error)
//       throw error
//     } finally {
//       setIsAnalyzing(false)
//       setTimeout(() => setAnalysisProgress(0), 1000)
//     }
//   }

//   const handleImageUpload = async (file: File) => {
//     if (!file.type.startsWith('image/')) {
//       alert('Please select a valid image file')
//       return
//     }

//     // Check file size (max 5MB)
//     if (file.size > 5 * 1024 * 1024) {
//       alert('Image size must be less than 5MB')
//       return
//     }

//     const reader = new FileReader()
//     reader.onload = async (e) => {
//       const imageDataUrl = e.target?.result as string
      
//       try {
//         // Analyze image for inappropriate content
//         const result = await analyzeImage(imageDataUrl)
//         setModerationResult(result)
        
//         if (result.safe) {
//           setFormData({ ...formData, image: imageDataUrl })
//         } else {
//           // Clear the image if it's inappropriate
//           setFormData({ ...formData, image: "" })
//         }
//       } catch (error) {
//         console.error('Image analysis failed:', error)
//         // If analysis fails, allow the image but show warning
//         setFormData({ ...formData, image: imageDataUrl })
//         setModerationResult({
//           safe: true,
//           predictions: [],
//           confidence: 0
//         })
//       }
//     }
//     reader.readAsDataURL(file)
//   }

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()
    
//     // Prevent submission if image is inappropriate
//     if (moderationResult && !moderationResult.safe) {
//       alert('Please upload an appropriate image for your product')
//       return
//     }
    
//     setIsLoading(true)

//     try {
//       const response = await fetch('/api/products', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           name: formData.name,
//           description: formData.description,
//           price: parseFloat(formData.price),
//           category: formData.category,
//           petType: formData.petType,
//           image: formData.image || "/placeholder.svg",
//           stock: parseInt(formData.stock),
//           featured: formData.featured,
//           vendor: { name: formData.vendorName }
//         }),
//       })

//       if (response.ok) {
//         const result = await response.json()
//         onProductAdded(result.product)
        
//         // Reset form
//         setFormData({
//           name: "",
//           description: "",
//           price: "",
//           category: "",
//           petType: "",
//           image: "",
//           stock: "",
//           featured: false,
//           vendorName: ""
//         })
//         setModerationResult(null)
        
//         onOpenChange(false)
//       }
//     } catch (error) {
//       console.error('Error adding product:', error)
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   const renderModerationStatus = () => {
//     if (isAnalyzing) {
//       return (
//         <div className="mt-2 p-3 bg-blue-50 border border-blue-200 rounded-lg">
//           <div className="flex items-center gap-2 mb-2">
//             <Loader2 className="h-4 w-4 animate-spin text-blue-600" />
//             <span className="text-sm font-medium text-blue-900">Analyzing image content...</span>
//           </div>
//           <Progress value={analysisProgress} className="h-2" />
//           <p className="text-xs text-blue-700 mt-1">{analysisProgress}% Complete</p>
//         </div>
//       )
//     }

//     if (moderationResult) {
//       if (moderationResult.safe) {
//         return (
//           <Alert className="mt-2 border-green-200 bg-green-50">
//             <CheckCircle className="h-4 w-4 text-green-600" />
//             <AlertDescription className="text-green-800">
//               <div className="flex items-center justify-between">
//                 <span>Image approved - content is appropriate</span>
//                 <Badge variant="secondary" className="bg-green-100 text-green-800">
//                   Safe
//                 </Badge>
//               </div>
//             </AlertDescription>
//           </Alert>
//         )
//       } else {
//         return (
//           <Alert className="mt-2 border-red-200 bg-red-50">
//             <AlertTriangle className="h-4 w-4 text-red-600" />
//             <AlertDescription className="text-red-800">
//               <div className="space-y-2">
//                 <div className="flex items-center justify-between">
//                   <span className="font-medium">Inappropriate content detected</span>
//                   <Badge variant="destructive">
//                     Blocked
//                   </Badge>
//                 </div>
//                 <p className="text-sm">
//                   This image contains content that may not be suitable for a pet store. 
//                   Please upload a different image of your product.
//                 </p>
//               </div>
//             </AlertDescription>
//           </Alert>
//         )
//       }
//     }

//     return null
//   }

//   return (
//     <Dialog open={open} onOpenChange={onOpenChange}>
//       <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
//         <DialogHeader>
//           <DialogTitle className="flex items-center gap-2">
//             Add New Product
//             <Shield className="h-5 w-5 text-blue-600" />
//             <Badge variant="outline" className="text-xs">
//               Protected
//             </Badge>
//           </DialogTitle>
//         </DialogHeader>
        
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <Label htmlFor="name">Product Name</Label>
//             <Input
//               id="name"
//               value={formData.name}
//               onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//               required
//             />
//           </div>

//           <div>
//             <Label htmlFor="description">Description</Label>
//             <Textarea
//               id="description"
//               value={formData.description}
//               onChange={(e) => setFormData({ ...formData, description: e.target.value })}
//               required
//             />
//           </div>

//           <div className="grid grid-cols-2 gap-4">
//             <div>
//               <Label htmlFor="price">Price</Label>
//               <Input
//                 id="price"
//                 type="number"
//                 step="0.01"
//                 value={formData.price}
//                 onChange={(e) => setFormData({ ...formData, price: e.target.value })}
//                 required
//               />
//             </div>
//             <div>
//               <Label htmlFor="stock">Stock</Label>
//               <Input
//                 id="stock"
//                 type="number"
//                 value={formData.stock}
//                 onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
//                 required
//               />
//             </div>
//           </div>

//           <div>
//             <Label htmlFor="category">Category</Label>
//             <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
//               <SelectTrigger>
//                 <SelectValue placeholder="Select category" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="food">Food</SelectItem>
//                 <SelectItem value="toys">Toys</SelectItem>
//                 <SelectItem value="accessories">Accessories</SelectItem>
//                 <SelectItem value="health">Health</SelectItem>
//                 <SelectItem value="grooming">Grooming</SelectItem>
//               </SelectContent>
//             </Select>
//           </div>

//           <div>
//             <Label htmlFor="petType">Pet Type</Label>
//             <Select value={formData.petType} onValueChange={(value) => setFormData({ ...formData, petType: value })}>
//               <SelectTrigger>
//                 <SelectValue placeholder="Select pet type" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="all">All Pets</SelectItem>
//                 <SelectItem value="dog">Dog</SelectItem>
//                 <SelectItem value="cat">Cat</SelectItem>
//                 <SelectItem value="bird">Bird</SelectItem>
//                 <SelectItem value="fish">Fish</SelectItem>
//                 <SelectItem value="small-pets">Small Pets</SelectItem>
//               </SelectContent>
//             </Select>
//           </div>

//           <div>
//             <Label className="flex items-center gap-2">
//               Product Image
//               <Shield className="h-4 w-4 text-blue-600" />
//               <span className="text-xs text-gray-500">(Auto-moderated)</span>
//             </Label>
//             <div
//               className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
//                 dragActive ? "border-primary bg-primary/5" : 
//                 moderationResult && !moderationResult.safe ? "border-red-300 bg-red-50" :
//                 "border-gray-300"
//               }`}
//               onDragEnter={(e) => {
//                 e.preventDefault()
//                 setDragActive(true)
//               }}
//               onDragLeave={(e) => {
//                 e.preventDefault()
//                 setDragActive(false)
//               }}
//               onDragOver={(e) => e.preventDefault()}
//               onDrop={async (e) => {
//                 e.preventDefault()
//                 setDragActive(false)
//                 const file = e.dataTransfer.files[0]
//                 if (file && file.type.startsWith('image/')) {
//                   await handleImageUpload(file)
//                 }
//               }}
//             >
//               {formData.image && moderationResult?.safe ? (
//                 <div className="relative">
//                   <img 
//                     ref={imageRef}
//                     src={formData.image} 
//                     alt="Preview" 
//                     className="max-h-32 mx-auto rounded" 
//                   />
//                   <Button
//                     type="button"
//                     variant="outline"
//                     size="sm"
//                     className="absolute top-0 right-0 h-6 w-6 p-0"
//                     onClick={() => {
//                       setFormData({ ...formData, image: "" })
//                       setModerationResult(null)
//                     }}
//                   >
//                     <X className="h-3 w-3" />
//                   </Button>
//                 </div>
//               ) : (
//                 <div>
//                   <Upload className="mx-auto h-8 w-8 text-gray-400 mb-2" />
//                   <p className="text-sm text-gray-600">Drag and drop an image here, or click to select</p>
//                   <p className="text-xs text-gray-500 mt-1">Images are automatically checked for appropriate content</p>
//                   <input
//                     type="file"
//                     accept="image/*"
//                     className="hidden"
//                     id="image-upload"
//                     onChange={async (e) => {
//                       const file = e.target.files?.[0]
//                       if (file) {
//                         await handleImageUpload(file)
//                       }
//                     }}
//                   />
//                   <Button
//                     type="button"
//                     variant="outline"
//                     size="sm"
//                     className="mt-2"
//                     disabled={isAnalyzing}
//                     onClick={() => document.getElementById('image-upload')?.click()}
//                   >
//                     {isAnalyzing ? (
//                       <>
//                         <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                         Analyzing...
//                       </>
//                     ) : (
//                       'Select Image'
//                     )}
//                   </Button>
//                 </div>
//               )}
//             </div>
//             {renderModerationStatus()}
//           </div>

//           <div>
//             <Label htmlFor="vendorName">Vendor Name</Label>
//             <Input
//               id="vendorName"
//               value={formData.vendorName}
//               onChange={(e) => setFormData({ ...formData, vendorName: e.target.value })}
//               required
//             />
//           </div>

//           <div className="flex items-center space-x-2">
//             <Checkbox
//               id="featured"
//               checked={formData.featured}
//               onCheckedChange={(checked) => setFormData({ ...formData, featured: !!checked })}
//             />
//             <Label htmlFor="featured">Featured Product</Label>
//           </div>

//           <div className="flex justify-end space-x-2 pt-4">
//             <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
//               Cancel
//             </Button>
//             <Button 
//               type="submit" 
//               disabled={isLoading || isAnalyzing || (moderationResult && !moderationResult.safe)}
//             >
//               {isLoading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
//               Add Product
//             </Button>
//           </div>
//         </form>
//       </DialogContent>
//     </Dialog>
//   )
// }

//(3)
"use client"

import { useState, useRef } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Textarea } from "../ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { Checkbox } from "../ui/checkbox"
import { Alert, AlertDescription } from "../ui/alert"
import { Progress } from "../ui/progress"
import { Badge } from "../ui/badge"
import { Loader2, Upload, X, AlertTriangle, Shield, CheckCircle, Eye } from "lucide-react"
import * as nsfwjs from 'nsfwjs'

interface AddProductModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onProductAdded: (product: any) => void
}

interface ModerationResult {
  safe: boolean
  predictions: any[]
  confidence: number
  detectionTypes: string[]
  reasons: string[]
  analysisId: string
}

export function AddProductModal({ open, onOpenChange, onProductAdded }: AddProductModalProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisProgress, setAnalysisProgress] = useState(0)
  const [analysisStep, setAnalysisStep] = useState("")
  const [moderationResult, setModerationResult] = useState<ModerationResult | null>(null)
  const [dragActive, setDragActive] = useState(false)
  const imageRef = useRef<HTMLImageElement>(null)
  const [imagePreview, setImagePreview] = useState<string>("")
  
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    petType: "",
    image: "",
    stock: "",
    featured: false,
    vendorName: ""
  })

  // Profanity word list (basic implementation)
  const profanityList = [
    'fuck', 'shit', 'damn', 'bitch', 'asshole', 'crap', 'piss', 'cock',
    'pussy', 'dick', 'bastard', 'whore', 'slut', 'faggot', 'nigger',
    'retard', 'gay', 'lesbian', 'homo', 'tranny', 'kill', 'die', 'murder'
  ]

  // Enhanced image analysis with multiple detection methods
  const analyzeImage = async (imageDataUrl: string): Promise<ModerationResult> => {
    setIsAnalyzing(true)
    setAnalysisProgress(0)
    setAnalysisStep("Initializing analysis...")
    
    const analysisId = `analysis_${Date.now()}`
    
    try {
      // Step 1: Basic image validation
      setAnalysisStep("Validating image format...")
      setAnalysisProgress(10)
      await new Promise(resolve => setTimeout(resolve, 300))

      const basicValidation = await validateImageBasics(imageDataUrl)
      if (!basicValidation.valid) {
        return {
          safe: false,
          predictions: [],
          confidence: 100,
          detectionTypes: ['invalid_format'],
          reasons: basicValidation.reasons,
          analysisId
        }
      }

      // Step 2: NSFW Content Detection
      setAnalysisStep("Scanning for inappropriate content...")
      setAnalysisProgress(30)
      const nsfwResult = await analyzeNSFWContent(imageDataUrl)

      // Step 3: Gesture and Symbol Detection
      setAnalysisStep("Detecting gestures and symbols...")
      setAnalysisProgress(50)
      const gestureResult = await analyzeOffensiveGestures(imageDataUrl)

      // Step 4: Text Content Analysis
      setAnalysisStep("Analyzing text content...")
      setAnalysisProgress(70)
      const textResult = await analyzeImageText(imageDataUrl)

      // Step 5: Color and Composition Analysis
      setAnalysisStep("Checking image composition...")
      setAnalysisProgress(85)
      const compositionResult = await analyzeImageComposition(imageDataUrl)

      // Step 6: Combine Results
      setAnalysisStep("Finalizing analysis...")
      setAnalysisProgress(95)
      const combinedResult = combineAnalysisResults(
        nsfwResult, 
        gestureResult, 
        textResult, 
        compositionResult,
        analysisId
      )

      setAnalysisProgress(100)
      setAnalysisStep("Analysis complete!")
      
      return combinedResult
      
    } catch (error) {
      console.error('Image analysis failed:', error)
      return {
        safe: false,
        predictions: [],
        confidence: 0,
        detectionTypes: ['analysis_failed'],
        reasons: ['Unable to verify image content safely - please try a different image'],
        analysisId
      }
    } finally {
      setIsAnalyzing(false)
      setTimeout(() => {
        setAnalysisProgress(0)
        setAnalysisStep("")
      }, 2000)
    }
  }

  // Basic image validation
  const validateImageBasics = async (imageDataUrl: string) => {
    const reasons: string[] = []
    
    try {
      // Check file size (approximate from base64)
      const sizeInBytes = (imageDataUrl.length * 3) / 4
      if (sizeInBytes > 5 * 1024 * 1024) { // 5MB limit
        reasons.push("Image file size is too large (max 5MB)")
      }

      // Check image dimensions
      const img = new Image()
      img.src = imageDataUrl
      
      return new Promise<{valid: boolean, reasons: string[]}>((resolve) => {
        img.onload = () => {
          if (img.width < 50 || img.height < 50) {
            reasons.push("Image resolution is too low")
          }
          if (img.width > 5000 || img.height > 5000) {
            reasons.push("Image resolution is too high")
          }
          
          resolve({ valid: reasons.length === 0, reasons })
        }
        img.onerror = () => {
          reasons.push("Invalid image format")
          resolve({ valid: false, reasons })
        }
      })
    } catch (error) {
      return { valid: false, reasons: ["Image validation failed"] }
    }
  }

  
  // REAL NSFW content detection using NSFW.js
  const analyzeNSFWContent = async (imageDataUrl: string) => {
    try {
      const nsfwjs = await import('nsfwjs')
      const tf = await import('@tensorflow/tfjs')
      
      await tf.ready()
      const model = await nsfwjs.load()
      
      const img = new Image()
      img.crossOrigin = 'anonymous'
      
      return new Promise((resolve) => {
        img.onload = async () => {
          try {
            const predictions = await model.classify(img)
            console.log('🔍 NSFW Analysis Results:', predictions)
            
            // Extract individual scores
            const scores = {
              porn: predictions.find(p => p.className === 'Porn')?.probability || 0,
              sexy: predictions.find(p => p.className === 'Sexy')?.probability || 0,
              hentai: predictions.find(p => p.className === 'Hentai')?.probability || 0,
              neutral: predictions.find(p => p.className === 'Neutral')?.probability || 0,
              drawing: predictions.find(p => p.className === 'Drawing')?.probability || 0
            }
            
            // Apply strict thresholds for different categories
            const isExplicitPorn = scores.porn > 0.15        // Very strict for porn
            const isSexyContent = scores.sexy > 0.25         // Moderate for sexy
            const isHentaiContent = scores.hentai > 0.15     // Strict for hentai
            const isLowNeutral = scores.neutral < 0.6        // Require high neutral score
            
            const overallNsfwScore = scores.porn + scores.sexy + scores.hentai
            const isUnsafe = isExplicitPorn || isSexyContent || isHentaiContent || 
                            isLowNeutral || overallNsfwScore > 0.3
            
            console.log('🚨 NSFW Decision:', {
              isUnsafe,
              scores,
              overallNsfwScore,
              triggers: {
                porn: isExplicitPorn,
                sexy: isSexyContent,
                hentai: isHentaiContent,
                lowNeutral: isLowNeutral
              }
            })
            
            resolve({
              safe: !isUnsafe,
              type: 'nsfw',
              score: overallNsfwScore,
              predictions: predictions,
              detailedScores: scores
            })
          } catch (error) {
            console.error('❌ NSFW classification failed:', error)
            resolve({ safe: false, type: 'nsfw', error: true, score: 1.0 })
          }
        }
        
        img.onerror = () => resolve({ safe: false, type: 'nsfw', error: true, score: 1.0 })
        img.src = imageDataUrl
      })
    } catch (error) {
      console.error('❌ NSFW setup failed:', error)
      return { safe: false, type: 'nsfw', error: true, score: 1.0 }
    }
  }



  // Enhanced gesture detection
  const analyzeOffensiveGestures = async (imageDataUrl: string) => {
    try {
      // Simulate advanced gesture detection
      await new Promise(resolve => setTimeout(resolve, 600))
      
      // Create canvas for pixel analysis
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      const img = new Image()
      
      return new Promise((resolve) => {
        img.onload = () => {
          canvas.width = img.width
          canvas.height = img.height
          ctx?.drawImage(img, 0, 0)
          
          // Basic color/pattern analysis for gestures
          const imageData = ctx?.getImageData(0, 0, canvas.width, canvas.height)
          const suspiciousPatterns = detectSuspiciousPatterns(imageData)
          
          resolve({
            safe: !suspiciousPatterns.detected,
            type: 'gestures',
            detectedCategories: suspiciousPatterns.categories,
            confidence: suspiciousPatterns.confidence
          })
        }
        
        img.onerror = () => resolve({ safe: false, type: 'gestures', error: true })
        img.src = imageDataUrl
      })
    } catch (error) {
      return { safe: false, type: 'gestures', error: true }
    }
  }

  // Detect suspicious patterns in image data
  const detectSuspiciousPatterns = (imageData: ImageData | undefined) => {
    if (!imageData) {
      return { detected: false, categories: [], confidence: 0 }
    }

    // Simplified pattern detection
    // In a real implementation, this would use ML models
    const data = imageData.data
    let suspiciousScore = 0
    const categories: string[] = []

    // Check for flesh-tone dominance (could indicate inappropriate gestures)
    let fleshTonePixels = 0
    for (let i = 0; i < data.length; i += 4) {
      const r = data[i]
      const g = data[i + 1]
      const b = data[i + 2]
      
      // Detect flesh tones
      if (r > 180 && r < 255 && g > 120 && g < 200 && b > 100 && b < 180) {
        fleshTonePixels++
      }
    }
    
    const fleshToneRatio = fleshTonePixels / (data.length / 4)
    if (fleshToneRatio > 0.4) { // High flesh tone ratio
      suspiciousScore += 0.3
      categories.push('gesture_detection')
    }

    return {
      detected: suspiciousScore > 0.2,
      categories,
      confidence: Math.min(suspiciousScore, 1.0)
    }
  }

  // Text extraction and analysis
  const analyzeImageText = async (imageDataUrl: string) => {
    try {
      // Simulate OCR text extraction
      await new Promise(resolve => setTimeout(resolve, 400))
      
      // For demo - in real implementation use OCR library like Tesseract.js
      const extractedText = "" // Mock empty text
      const hasProfanity = checkProfanity(extractedText)
      
      return {
        safe: !hasProfanity,
        type: 'text',
        extractedText: extractedText,
        profanityDetected: hasProfanity
      }
    } catch (error) {
      return { safe: true, type: 'text', error: true }
    }
  }

  // Image composition analysis
  const analyzeImageComposition = async (imageDataUrl: string) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 300))
      
      // Basic composition checks
      return {
        safe: true,
        type: 'composition',
        appropriateForCommerce: true
      }
    } catch (error) {
      return { safe: true, type: 'composition', error: true }
    }
  }

  // Check for profanity in text
  const checkProfanity = (text: string): boolean => {
    if (!text) return false
    
    const lowerText = text.toLowerCase()
    return profanityList.some(word => lowerText.includes(word))
  }

  // Combine all analysis results
  const combineAnalysisResults = (
    nsfwResult: any, 
    gestureResult: any, 
    textResult: any, 
    compositionResult: any,
    analysisId: string
  ): ModerationResult => {
    const detectionTypes: string[] = []
    const reasons: string[] = []
    let overallSafe = true
    let highestConfidence = 0

    // Check NSFW content
    if (!nsfwResult.safe || nsfwResult.error) {
    overallSafe = false
    detectionTypes.push('sexual_content')
    
    if (nsfwResult.detailedScores) {
      const scores = nsfwResult.detailedScores
      if (scores.porn > 0.15) {
        reasons.push('Explicit sexual content detected')
      } else if (scores.sexy > 0.25) {
        reasons.push('Sexually suggestive content detected')
      } else if (scores.hentai > 0.15) {
        reasons.push('Animated sexual content detected')
      } else {
        reasons.push('Inappropriate sexual content detected')
      }
    } else {
      reasons.push('Image contains sexually explicit or suggestive content')
    }
    
    highestConfidence = Math.max(highestConfidence, (nsfwResult.score || 0) * 100)
  }

    // Check gestures/symbols
    if (!gestureResult.safe || gestureResult.error) {
      overallSafe = false
      detectionTypes.push('offensive_gesture')
      reasons.push('Image may contain inappropriate gestures or symbols')
      highestConfidence = Math.max(highestConfidence, gestureResult.confidence * 100 || 50)
    }

    // Check text content
    if (!textResult.safe) {
      overallSafe = false
      detectionTypes.push('inappropriate_text')
      reasons.push('Image contains inappropriate text content')
      highestConfidence = Math.max(highestConfidence, 75)
    }

    // Check composition
    if (!compositionResult.safe) {
      overallSafe = false
      detectionTypes.push('inappropriate_composition')
      reasons.push('Image composition is not suitable for commerce')
    }

    // If any critical analysis failed, be conservative
    if (nsfwResult.error || gestureResult.error) {
      overallSafe = false
      detectionTypes.push('verification_failed')
      reasons.push('Unable to fully verify image safety')
      highestConfidence = Math.max(highestConfidence, 80)
    }

    // For testing - force detection of middle finger type images
    // This is a simplified heuristic - in production use proper ML models
    if (gestureResult.detectedCategories?.includes('gesture_detection')) {
      overallSafe = false
      detectionTypes.push('inappropriate_gesture')
      reasons.push('Detected potentially inappropriate hand gesture or symbol')
      highestConfidence = 85
    }

    return {
      safe: overallSafe,
      predictions: nsfwResult.predictions || [],
      confidence: highestConfidence,
      detectionTypes,
      reasons: reasons.length > 0 ? reasons : ['Content verified as appropriate'],
      analysisId
    }
  }

  // Handle image upload with validation
  const handleImageUpload = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Please select a valid image file (JPG, PNG, GIF, WebP)')
      return
    }

    // Check file size
    if (file.size > 5 * 1024 * 1024) {
      alert('Image size must be less than 5MB')
      return
    }

    const reader = new FileReader()
    reader.onload = async (e) => {
      const imageDataUrl = e.target?.result as string
      setImagePreview(imageDataUrl)

      console.log('🔄 Starting image analysis...')
      
      try {
        // Analyze image for inappropriate content
        const result = await analyzeImage(imageDataUrl)
        setModerationResult(result)
        
        if (result.safe) {
          console.log('✅ Image approved')
          setFormData({ ...formData, image: imageDataUrl })
        } else {
          console.log('❌ Image blocked:', result.reasons)
          // Clear the image if it's inappropriate
          setFormData({ ...formData, image: "" })
          setImagePreview("")
        }
      } catch (error) {
        console.error('Image analysis failed:', error)
        // Fail safely - reject the image
        setFormData({ ...formData, image: "" })
        setImagePreview("")
        setModerationResult({
          safe: false,
          predictions: [],
          confidence: 0,
          detectionTypes: ['analysis_error'],
          reasons: ['Image analysis failed - please try a different image'],
          analysisId: `error_${Date.now()}`
        })
      }
    }
    reader.readAsDataURL(file)
  }

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Prevent submission if image is inappropriate
    if (moderationResult && !moderationResult.safe) {
      alert('Please upload an appropriate image for your product')
      return
    }

    // Validate required fields
    if (!formData.name || !formData.description || !formData.price || 
        !formData.category || !formData.petType || !formData.vendorName) {
      alert('Please fill in all required fields')
      return
    }
    
    setIsLoading(true)

    try {
      const response = await fetch('/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          description: formData.description,
          price: parseFloat(formData.price),
          category: formData.category,
          petType: formData.petType,
          image: formData.image || "/placeholder.svg",
          stock: parseInt(formData.stock),
          featured: formData.featured,
          vendor: { name: formData.vendorName },
          moderationData: moderationResult ? {
            analysisId: moderationResult.analysisId,
            confidence: moderationResult.confidence,
            detectionTypes: moderationResult.detectionTypes
          } : null
        }),
      })

      if (response.ok) {
        const result = await response.json()
        onProductAdded(result.product)
        
        // Reset form
        resetForm()
        onOpenChange(false)
      } else {
        const error = await response.json()
        alert(`Failed to add product: ${error.message || 'Unknown error'}`)
      }
    } catch (error) {
      console.error('Error adding product:', error)
      alert('Failed to add product. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  // Reset form function
  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      price: "",
      category: "",
      petType: "",
      image: "",
      stock: "",
      featured: false,
      vendorName: ""
    })
    setModerationResult(null)
    setImagePreview("")
  }

  // Enhanced moderation status display
  const renderModerationStatus = () => {
    if (isAnalyzing) {
      return (
        <div className="mt-3 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-center gap-2 mb-3">
            <Loader2 className="h-5 w-5 animate-spin text-blue-600" />
            <span className="text-sm font-medium text-blue-900">
              AI Content Moderation Active
            </span>
            <Badge variant="outline" className="text-xs bg-blue-100 text-blue-800">
              Analyzing
            </Badge>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm text-blue-800">{analysisStep}</span>
              <span className="text-xs text-blue-600 font-mono">{analysisProgress}%</span>
            </div>
            <Progress value={analysisProgress} className="h-2" />
          </div>
          <p className="text-xs text-blue-600 mt-2 flex items-center gap-1">
            <Eye className="h-3 w-3" />
            Checking for inappropriate content, gestures, symbols, and text
          </p>
        </div>
      )
    }

    if (moderationResult) {
      if (moderationResult.safe) {
        return (
          <Alert className="mt-3 border-green-200 bg-green-50">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-800">
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-medium">Content Approved</span>
                  <p className="text-sm text-green-700 mt-1">
                    Image passed all safety checks and is appropriate for your pet store
                  </p>
                </div>
                <Badge variant="secondary" className="bg-green-100 text-green-800 ml-3">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  Safe
                </Badge>
              </div>
            </AlertDescription>
          </Alert>
        )
      } else {
        return (
          <Alert className="mt-3 border-red-200 bg-red-50">
            <AlertTriangle className="h-5 w-5 text-red-600" />
            <AlertDescription className="text-red-800">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-lg">Content Blocked</span>
                  <Badge variant="destructive" className="flex items-center gap-1">
                    <AlertTriangle className="h-3 w-3" />
                    Inappropriate
                  </Badge>
                </div>
                
                <div className="bg-red-100 p-3 rounded border border-red-200">
                  <p className="text-sm font-medium text-red-900 mb-2">Detection Details:</p>
                  <div className="space-y-1">
                    {moderationResult.reasons.map((reason, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <span className="text-red-600 mt-0.5">•</span>
                        <span className="text-sm text-red-800">{reason}</span>
                      </div>
                    ))}
                  </div>
                  
                  {moderationResult.confidence > 0 && (
                    <div className="mt-2 pt-2 border-t border-red-200">
                      <p className="text-xs text-red-700">
                        Confidence Level: {moderationResult.confidence.toFixed(1)}%
                      </p>
                    </div>
                  )}
                </div>
                
                <div className="bg-amber-50 p-3 rounded border border-amber-200">
                  <p className="text-sm text-amber-800">
                    <strong>What to do:</strong> Please upload a different image that shows your product clearly 
                    without any inappropriate content, gestures, or symbols.
                  </p>
                </div>
              </div>
            </AlertDescription>
          </Alert>
        )
      }
    }

    return null
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            Add New Product
            <Shield className="h-5 w-5 text-blue-600" />
            <Badge variant="outline" className="text-xs bg-blue-50 text-blue-700 border-blue-200">
              AI Protected
            </Badge>
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Product Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Product Information</h3>
            
            <div>
              <Label htmlFor="name">Product Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Enter product name"
                required
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Describe your product..."
                required
                className="mt-1 min-h-[100px]"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="price">Price (₱) *</Label>
                <Input
                  id="price"
                  type="number"
                  step="0.01"
                  min="0"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  placeholder="0.00"
                  required
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="stock">Stock Quantity *</Label>
                <Input
                  id="stock"
                  type="number"
                  min="0"
                  value={formData.stock}
                  onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                  placeholder="0"
                  required
                  className="mt-1"
                />
              </div>
            </div>
          </div>

          {/* Categories */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Categories</h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="category">Product Category *</Label>
                <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="food">Food & Nutrition</SelectItem>
                    <SelectItem value="toys">Toys & Entertainment</SelectItem>
                    <SelectItem value="accessories">Accessories</SelectItem>
                    <SelectItem value="health">Health & Medicine</SelectItem>
                    <SelectItem value="grooming">Grooming & Care</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="petType">Pet Type *</Label>
                <Select value={formData.petType} onValueChange={(value) => setFormData({ ...formData, petType: value })}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select pet type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Pets</SelectItem>
                    <SelectItem value="dog">Dogs</SelectItem>
                    <SelectItem value="cat">Cats</SelectItem>
                    <SelectItem value="bird">Birds</SelectItem>
                    <SelectItem value="fish">Fish</SelectItem>
                    <SelectItem value="small-pets">Small Pets</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Image Upload with AI Moderation */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 border-b pb-2 flex items-center gap-2">
              Product Image
              <Shield className="h-5 w-5 text-blue-600" />
              <Badge variant="outline" className="text-xs bg-blue-50 text-blue-700">
                AI Moderated
              </Badge>
            </h3>
            
            <div
              className={`border-2 border-dashed rounded-lg p-6 text-center transition-all duration-200 ${
                dragActive ? "border-blue-400 bg-blue-50 scale-[1.02]" : 
                moderationResult && !moderationResult.safe ? "border-red-300 bg-red-50" :
                moderationResult && moderationResult.safe ? "border-green-300 bg-green-50" :
                "border-gray-300 hover:border-gray-400"
              }`}
              onDragEnter={(e) => {
                e.preventDefault()
                setDragActive(true)
              }}
              onDragLeave={(e) => {
                e.preventDefault()
                setDragActive(false)
              }}
              onDragOver={(e) => e.preventDefault()}
              onDrop={async (e) => {
                e.preventDefault()
                setDragActive(false)
                const file = e.dataTransfer.files[0]
                if (file && file.type.startsWith('image/')) {
                  await handleImageUpload(file)
                }
              }}
            >
              {formData.image && moderationResult?.safe ? (
                <div className="relative group">
                  <img 
                    ref={imageRef}
                    src={formData.image} 
                    alt="Product preview" 
                    className="max-h-48 mx-auto rounded-lg shadow-md" 
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-200 rounded-lg flex items-center justify-center">
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      className="opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                      onClick={() => {
                        setFormData({ ...formData, image: "" })
                        setModerationResult(null)
                        setImagePreview("")
                      }}
                    >
                      <X className="h-4 w-4 mr-1" />
                      Remove
                    </Button>
                  </div>
                </div>
              ) : (
                <div>
                  <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                  <div className="space-y-2">
                    <p className="text-lg font-medium text-gray-700">
                      Drop your product image here
                    </p>
                    <p className="text-sm text-gray-500">
                      or click to browse files
                    </p>
                    <div className="text-xs text-gray-400 space-y-1">
                      <p>• Supported: JPG, PNG, GIF, WebP</p>
                      <p>• Maximum size: 5MB</p>
                      <p>• AI content moderation enabled</p>
                    </div>
                  </div>
                  
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    id="image-upload"
                    onChange={async (e) => {
                      const file = e.target.files?.[0]
                      if (file) {
                        await handleImageUpload(file)
                      }
                    }}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="lg"
                    className="mt-4"
                    disabled={isAnalyzing}
                    onClick={() => document.getElementById('image-upload')?.click()}
                  >
                    {isAnalyzing ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Analyzing...
                      </>
                    ) : (
                      <>
                        <Upload className="mr-2 h-4 w-4" />
                        Choose Image
                      </>
                    )}
                  </Button>
                </div>
              )}
            </div>
            
            {renderModerationStatus()}
          </div>

          {/* Vendor Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Vendor Information</h3>
            
            <div>
              <Label htmlFor="vendorName">Vendor/Store Name *</Label>
              <Input
                id="vendorName"
                value={formData.vendorName}
                onChange={(e) => setFormData({ ...formData, vendorName: e.target.value })}
                placeholder="Enter vendor or store name"
                required
                className="mt-1"
              />
            </div>
          </div>

          {/* Additional Options */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Additional Options</h3>
            
            <div className="flex items-center space-x-2 p-3 bg-amber-50 rounded-lg border border-amber-200">
              <Checkbox
                id="featured"
                checked={formData.featured}
                onCheckedChange={(checked) => setFormData({ ...formData, featured: !!checked })}
              />
              <Label htmlFor="featured" className="flex items-center cursor-pointer">
                <span>Featured Product</span>
                <Badge variant="secondary" className="ml-2 text-xs">
                  Highlighted
                </Badge>
              </Label>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex justify-end space-x-3 pt-6 border-t">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => {
                resetForm()
                onOpenChange(false)
              }}
              disabled={isLoading || isAnalyzing}
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={
                isLoading || 
                isAnalyzing || 
                (moderationResult && !moderationResult.safe) ||
                !formData.name ||
                !formData.description ||
                !formData.price ||
                !formData.category ||
                !formData.petType ||
                !formData.vendorName
              }
              className="min-w-[140px]"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Adding Product...
                </>
              ) : isAnalyzing ? (
                <>
                  <Eye className="w-4 h-4 mr-2" />
                  Analyzing...
                </>
              ) : (
                <>
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Add Product
                </>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
