"use client"

import { useState, useMemo } from "react"
import { useSearchParams } from "next/navigation"
import { SlidersHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ProductCard } from "@/components/product-card"
import { products, categories } from "@/lib/data"
import { cn } from "@/lib/utils"

export function CategoriesView() {
  const searchParams = useSearchParams()
  const initialCategory = searchParams.get("category") || "all"

  const [selectedCategory, setSelectedCategory] = useState(initialCategory)
  const [priceRange, setPriceRange] = useState([0, 1500])
  const [minRating, setMinRating] = useState(0)
  const [sortBy, setSortBy] = useState("featured")
  const [filtersOpen, setFiltersOpen] = useState(false)

  const filtered = useMemo(() => {
    let result = products.filter((p) => {
      const catMatch = selectedCategory === "all" || p.category === selectedCategory
      const priceMatch = p.price >= priceRange[0] && p.price <= priceRange[1]
      const ratingMatch = p.rating >= minRating
      return catMatch && priceMatch && ratingMatch
    })

    switch (sortBy) {
      case "price-low":
        result.sort((a, b) => a.price - b.price)
        break
      case "price-high":
        result.sort((a, b) => b.price - a.price)
        break
      case "rating":
        result.sort((a, b) => b.rating - a.rating)
        break
    }
    return result
  }, [selectedCategory, priceRange, minRating, sortBy])

  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground sm:text-3xl">All Products</h1>
          <p className="mt-1 text-sm text-muted-foreground">{filtered.length} products found</p>
        </div>
        <div className="flex items-center gap-3">
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="featured">Featured</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
              <SelectItem value="rating">Top Rated</SelectItem>
            </SelectContent>
          </Select>
          <Button
            variant="outline"
            size="icon"
            className="lg:hidden"
            onClick={() => setFiltersOpen(!filtersOpen)}
            aria-label="Toggle filters"
          >
            <SlidersHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-4">
        {/* Filters Sidebar */}
        <aside className={cn("flex flex-col gap-6", filtersOpen ? "block" : "hidden lg:block")}>
          {/* Categories */}
          <div>
            <h3 className="text-sm font-semibold text-foreground">Categories</h3>
            <div className="mt-3 flex flex-wrap gap-2">
              <Badge
                variant={selectedCategory === "all" ? "default" : "outline"}
                className={cn("cursor-pointer", selectedCategory === "all" && "bg-accent text-accent-foreground")}
                onClick={() => setSelectedCategory("all")}
              >
                All
              </Badge>
              {categories.map((cat) => (
                <Badge
                  key={cat.id}
                  variant={selectedCategory === cat.id ? "default" : "outline"}
                  className={cn("cursor-pointer", selectedCategory === cat.id && "bg-accent text-accent-foreground")}
                  onClick={() => setSelectedCategory(cat.id)}
                >
                  {cat.name}
                </Badge>
              ))}
            </div>
          </div>

          {/* Price Range */}
          <div>
            <h3 className="text-sm font-semibold text-foreground">Price Range</h3>
            <Slider
              value={priceRange}
              onValueChange={setPriceRange}
              min={0}
              max={1500}
              step={10}
              className="mt-4"
            />
            <div className="mt-2 flex justify-between text-xs text-muted-foreground">
              <span>${priceRange[0]}</span>
              <span>${priceRange[1]}</span>
            </div>
          </div>

          {/* Rating */}
          <div>
            <h3 className="text-sm font-semibold text-foreground">Minimum Rating</h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {[0, 3, 3.5, 4, 4.5].map((r) => (
                <Badge
                  key={r}
                  variant={minRating === r ? "default" : "outline"}
                  className={cn("cursor-pointer", minRating === r && "bg-accent text-accent-foreground")}
                  onClick={() => setMinRating(r)}
                >
                  {r === 0 ? "All" : `${r}+`}
                </Badge>
              ))}
            </div>
          </div>
        </aside>

        {/* Products Grid */}
        <div className="lg:col-span-3">
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center py-20 text-center">
              <p className="text-lg font-semibold text-foreground">No products found</p>
              <p className="mt-1 text-sm text-muted-foreground">Try adjusting your filters.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {filtered.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
