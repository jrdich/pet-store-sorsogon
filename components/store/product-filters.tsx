"use client"

import { useState } from "react"
import { Button } from "../ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Checkbox } from "../ui/checkbox"
import { Label } from "../ui/label"
import { Slider } from "../ui/slider"

interface ProductFiltersProps {
  onFiltersChange: (filters: {
    categories: string[]
    petTypes: string[]
    priceRange: [number, number]
    inStock: boolean
  }) => void
}

export function ProductFilters({ onFiltersChange }: ProductFiltersProps) {
  const [categories, setCategories] = useState<string[]>([])
  const [petTypes, setPetTypes] = useState<string[]>([])
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 300])
  const [inStock, setInStock] = useState(false)

  const categoryOptions = [
    { id: "food", label: "Food & Treats" },
    { id: "toys", label: "Toys" },
    { id: "accessories", label: "Accessories" },
    { id: "health", label: "Health & Wellness" },
    { id: "grooming", label: "Grooming" },
  ]

  const petTypeOptions = [
    { id: "dog", label: "Dogs" },
    { id: "cat", label: "Cats" },
    { id: "bird", label: "Birds" },
    { id: "fish", label: "Fish" },
    { id: "small-pets", label: "Small Pets" },
    { id: "all", label: "All Pets" },
  ]

  const handleCategoryChange = (categoryId: string, checked: boolean) => {
    const newCategories = checked ? [...categories, categoryId] : categories.filter((c) => c !== categoryId)
    setCategories(newCategories)
    onFiltersChange({ categories: newCategories, petTypes, priceRange, inStock })
  }

  const handlePetTypeChange = (petTypeId: string, checked: boolean) => {
    const newPetTypes = checked ? [...petTypes, petTypeId] : petTypes.filter((p) => p !== petTypeId)
    setPetTypes(newPetTypes)
    onFiltersChange({ categories, petTypes: newPetTypes, priceRange, inStock })
  }

  const handlePriceRangeChange = (newRange: number[]) => {
    const range: [number, number] = [newRange[0], newRange[1]]
    setPriceRange(range)
    onFiltersChange({ categories, petTypes, priceRange: range, inStock })
  }

  const handleInStockChange = (checked: boolean) => {
    setInStock(checked)
    onFiltersChange({ categories, petTypes, priceRange, inStock: checked })
  }

  const clearFilters = () => {
    setCategories([])
    setPetTypes([])
    setPriceRange([0, 300])
    setInStock(false)
    onFiltersChange({ categories: [], petTypes: [], priceRange: [0, 300], inStock: false })
  }

  return (
    <Card className="sticky top-4">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Filters</CardTitle>
          <Button variant="ghost" size="sm" onClick={clearFilters}>
            Clear All
          </Button>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Categories */}
        <div>
          <h3 className="font-semibold mb-3">Categories</h3>
          <div className="space-y-2">
            {categoryOptions.map((category) => (
              <div key={category.id} className="flex items-center space-x-2">
                <Checkbox
                  id={category.id}
                  checked={categories.includes(category.id)}
                  onCheckedChange={(checked) => handleCategoryChange(category.id, checked as boolean)}
                />
                <Label htmlFor={category.id} className="text-sm">
                  {category.label}
                </Label>
              </div>
            ))}
          </div>
        </div>

        {/* Pet Types */}
        <div>
          <h3 className="font-semibold mb-3">Pet Type</h3>
          <div className="space-y-2">
            {petTypeOptions.map((petType) => (
              <div key={petType.id} className="flex items-center space-x-2">
                <Checkbox
                  id={petType.id}
                  checked={petTypes.includes(petType.id)}
                  onCheckedChange={(checked) => handlePetTypeChange(petType.id, checked as boolean)}
                />
                <Label htmlFor={petType.id} className="text-sm">
                  {petType.label}
                </Label>
              </div>
            ))}
          </div>
        </div>

        {/* Price Range */}
        <div>
          <h3 className="font-semibold mb-3">Price Range</h3>
          <div className="px-2">
            <Slider
              value={priceRange}
              onValueChange={handlePriceRangeChange}
              max={300}
              min={0}
              step={5}
              className="mb-2"
            />
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>₱{priceRange[0]}</span>
              <span>₱{priceRange[1]}</span>
            </div>
          </div>
        </div>

        {/* In Stock */}
        <div className="flex items-center space-x-2">
          <Checkbox id="inStock" checked={inStock} onCheckedChange={handleInStockChange} />
          <Label htmlFor="inStock" className="text-sm">
            In Stock Only
          </Label>
        </div>
      </CardContent>
    </Card>
  )
}
