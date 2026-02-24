"use client"

import Link from "next/link"
import { Star, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useStore } from "@/lib/store"
import type { Product } from "@/lib/data"
import { toast } from "sonner"
import { useState } from "react"

export function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useStore()
  const [imgError, setImgError] = useState(false)

  return (
    <Card className="group overflow-hidden border-border bg-card transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      <Link href={`/product/${product.id}`} className="block">
        <div className="relative aspect-square overflow-hidden bg-muted">
          <img
            src={imgError ? "https://images.unsplash.com/photo-1560393464-5c69a73c5770?w=600&h=600&fit=crop" : product.images[0]}
            alt={product.name}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
            onError={() => setImgError(true)}
          />
          {product.originalPrice && (
            <span className="absolute left-3 top-3 rounded-full bg-accent px-2.5 py-1 text-xs font-semibold text-accent-foreground">
              {Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
            </span>
          )}
        </div>
      </Link>
      <CardContent className="p-4">
        <Link href={`/product/${product.id}`}>
          <h3 className="line-clamp-1 text-sm font-semibold text-card-foreground transition-colors hover:text-accent">
            {product.name}
          </h3>
        </Link>
        <div className="mt-1.5 flex items-center gap-1.5">
          <div className="flex items-center gap-0.5">
            <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
            <span className="text-xs font-medium text-card-foreground">{product.rating}</span>
          </div>
          <span className="text-xs text-muted-foreground">({product.reviewCount})</span>
        </div>
        <div className="mt-2 flex items-center gap-2">
          <span className="text-lg font-bold text-card-foreground">${product.price.toFixed(2)}</span>
          {product.originalPrice && (
            <span className="text-sm text-muted-foreground line-through">${product.originalPrice.toFixed(2)}</span>
          )}
        </div>
        <div className="mt-3 flex gap-2">
          <Button
            size="sm"
            variant="outline"
            className="flex-1 text-xs"
            onClick={(e) => {
              e.preventDefault()
              addToCart(product)
              toast.success(`${product.name} added to cart`)
            }}
          >
            <ShoppingCart className="mr-1.5 h-3.5 w-3.5" />
            Add to Cart
          </Button>
          <Button size="sm" className="flex-1 bg-accent text-xs text-accent-foreground hover:bg-accent/90" asChild>
            <Link href={`/product/${product.id}?buy=true`}>Buy Now</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export function ProductCardSkeleton() {
  return (
    <Card className="overflow-hidden border-border">
      <div className="aspect-square animate-pulse bg-muted" />
      <CardContent className="p-4">
        <div className="h-4 w-3/4 animate-pulse rounded bg-muted" />
        <div className="mt-2 h-3 w-1/4 animate-pulse rounded bg-muted" />
        <div className="mt-2 h-5 w-1/3 animate-pulse rounded bg-muted" />
        <div className="mt-3 flex gap-2">
          <div className="h-8 flex-1 animate-pulse rounded bg-muted" />
          <div className="h-8 flex-1 animate-pulse rounded bg-muted" />
        </div>
      </CardContent>
    </Card>
  )
}
