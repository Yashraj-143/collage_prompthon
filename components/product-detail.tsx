"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { ShoppingCart, Check, MapPin, Truck, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { StarRating } from "@/components/star-rating"
import { useStore } from "@/lib/store"
import type { Product } from "@/lib/data"
import { toast } from "sonner"

export function ProductDetail({ product }: { product: Product }) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { addToCart, getProductReviews, addReview } = useStore()
  const reviews = getProductReviews(product.id)

  const [selectedImage, setSelectedImage] = useState(0)
  const [pincode, setPincode] = useState("")
  const [pincodeResult, setPincodeResult] = useState("")
  const [reviewName, setReviewName] = useState("")
  const [reviewComment, setReviewComment] = useState("")
  const [reviewRating, setReviewRating] = useState(5)
  const [imgErrors, setImgErrors] = useState<Set<number>>(new Set())

  const buyNow = searchParams.get("buy") === "true"

  function handleAddToCart() {
    addToCart(product)
    toast.success(`${product.name} added to cart`)
  }

  function handleBuyNow() {
    addToCart(product)
    router.push("/checkout")
  }

  function handlePincode() {
    if (pincode.length === 6 && /^\d{6}$/.test(pincode)) {
      setPincodeResult("Estimated Delivery: 5-7 days")
    } else {
      setPincodeResult("Please enter a valid 6-digit pincode")
    }
  }

  function handleReview(e: React.FormEvent) {
    e.preventDefault()
    if (!reviewName.trim() || !reviewComment.trim()) return
    addReview({
      productId: product.id,
      author: reviewName,
      rating: reviewRating,
      comment: reviewComment,
      date: new Date().toISOString().split("T")[0],
    })
    setReviewName("")
    setReviewComment("")
    setReviewRating(5)
    toast.success("Review submitted!")
  }

  const fallbackImg = "https://images.unsplash.com/photo-1560393464-5c69a73c5770?w=600&h=600&fit=crop"

  if (buyNow) {
    handleBuyNow()
    return null
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <div className="grid gap-10 lg:grid-cols-2">
        {/* Image Gallery */}
        <div className="flex flex-col gap-4">
          <div className="relative aspect-square overflow-hidden rounded-xl bg-muted">
            <img
              src={imgErrors.has(selectedImage) ? fallbackImg : product.images[selectedImage]}
              alt={product.name}
              className="h-full w-full object-cover"
              onError={() => setImgErrors((prev) => new Set(prev).add(selectedImage))}
            />
            {product.originalPrice && (
              <Badge className="absolute left-4 top-4 bg-accent text-accent-foreground">
                {Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
              </Badge>
            )}
          </div>
          <div className="flex gap-3 overflow-x-auto">
            {product.images.map((img, i) => (
              <button
                key={i}
                onClick={() => setSelectedImage(i)}
                className={`flex-shrink-0 overflow-hidden rounded-lg border-2 transition-colors ${
                  selectedImage === i ? "border-accent" : "border-border"
                }`}
                aria-label={`View image ${i + 1}`}
              >
                <img
                  src={imgErrors.has(i) ? fallbackImg : img}
                  alt={`${product.name} ${i + 1}`}
                  className="h-20 w-20 object-cover"
                  onError={() => setImgErrors((prev) => new Set(prev).add(i))}
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="flex flex-col gap-6">
          <div>
            <p className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
              {product.category}
            </p>
            <h1 className="mt-2 text-2xl font-bold text-foreground sm:text-3xl">{product.name}</h1>
            <div className="mt-3 flex items-center gap-3">
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                <span className="text-sm font-semibold text-foreground">{product.rating}</span>
              </div>
              <span className="text-sm text-muted-foreground">({product.reviewCount} reviews)</span>
              {product.inStock && (
                <Badge variant="outline" className="border-emerald-500/30 text-emerald-600 dark:text-emerald-400">
                  <Check className="mr-1 h-3 w-3" /> In Stock
                </Badge>
              )}
            </div>
          </div>

          <div className="flex items-baseline gap-3">
            <span className="text-3xl font-bold text-foreground">${product.price.toFixed(2)}</span>
            {product.originalPrice && (
              <span className="text-lg text-muted-foreground line-through">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>

          <p className="leading-relaxed text-muted-foreground">{product.description}</p>

          <div className="flex flex-wrap gap-2">
            {product.features.map((feature) => (
              <Badge key={feature} variant="secondary" className="text-xs">
                {feature}
              </Badge>
            ))}
          </div>

          <div className="flex gap-3">
            <Button size="lg" variant="outline" className="flex-1" onClick={handleAddToCart}>
              <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
            </Button>
            <Button
              size="lg"
              className="flex-1 bg-accent text-accent-foreground hover:bg-accent/90"
              onClick={handleBuyNow}
            >
              Buy Now
            </Button>
          </div>

          <Separator />

          {/* Pincode Check */}
          <div>
            <h3 className="flex items-center gap-2 text-sm font-semibold text-foreground">
              <MapPin className="h-4 w-4" /> Check Delivery
            </h3>
            <div className="mt-2 flex gap-2">
              <Input
                placeholder="Enter 6-digit pincode"
                value={pincode}
                onChange={(e) => setPincode(e.target.value.replace(/\D/g, "").slice(0, 6))}
                maxLength={6}
                className="max-w-48"
              />
              <Button variant="outline" onClick={handlePincode}>
                Check
              </Button>
            </div>
            {pincodeResult && (
              <p className={`mt-2 flex items-center gap-1.5 text-sm ${
                pincodeResult.includes("5-7") ? "text-emerald-600 dark:text-emerald-400" : "text-destructive"
              }`}>
                <Truck className="h-4 w-4" />
                {pincodeResult}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="mt-16">
        <h2 className="text-xl font-bold text-foreground">Customer Reviews</h2>

        {/* Review Form */}
        <form onSubmit={handleReview} className="mt-6 rounded-xl border border-border bg-card p-6">
          <h3 className="text-sm font-semibold text-card-foreground">Write a Review</h3>
          <div className="mt-3 flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <span className="text-sm text-muted-foreground">Rating:</span>
              <StarRating rating={reviewRating} onRate={setReviewRating} size="md" />
            </div>
            <Input
              placeholder="Your name"
              value={reviewName}
              onChange={(e) => setReviewName(e.target.value)}
              required
            />
            <Textarea
              placeholder="Write your review..."
              value={reviewComment}
              onChange={(e) => setReviewComment(e.target.value)}
              required
              rows={3}
            />
            <Button type="submit" className="self-start bg-accent text-accent-foreground hover:bg-accent/90">
              Submit Review
            </Button>
          </div>
        </form>

        {/* Reviews List */}
        <div className="mt-6 flex flex-col gap-4">
          {reviews.length === 0 ? (
            <p className="py-8 text-center text-muted-foreground">No reviews yet. Be the first to review!</p>
          ) : (
            reviews.map((review) => (
              <div key={review.id} className="rounded-xl border border-border bg-card p-5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted text-sm font-semibold text-foreground">
                      {review.author.charAt(0)}
                    </div>
                    <span className="text-sm font-semibold text-card-foreground">{review.author}</span>
                  </div>
                  <span className="text-xs text-muted-foreground">{review.date}</span>
                </div>
                <div className="mt-2">
                  <StarRating rating={review.rating} />
                </div>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{review.comment}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
