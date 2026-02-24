"use client"

import { Star } from "lucide-react"
import { cn } from "@/lib/utils"

export function StarRating({
  rating,
  onRate,
  size = "sm",
}: {
  rating: number
  onRate?: (rating: number) => void
  size?: "sm" | "md"
}) {
  const sizeClass = size === "sm" ? "h-4 w-4" : "h-5 w-5"

  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          disabled={!onRate}
          onClick={() => onRate?.(star)}
          className={cn("transition-colors", onRate && "cursor-pointer hover:scale-110")}
          aria-label={`Rate ${star} stars`}
        >
          <Star
            className={cn(
              sizeClass,
              star <= rating ? "fill-amber-400 text-amber-400" : "fill-muted text-muted"
            )}
          />
        </button>
      ))}
    </div>
  )
}
