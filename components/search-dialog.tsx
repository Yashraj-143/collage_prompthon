"use client"

import { useState, useMemo } from "react"
import { useRouter } from "next/navigation"
import { Search } from "lucide-react"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { products } from "@/lib/data"

export function SearchDialog({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  const [query, setQuery] = useState("")
  const router = useRouter()

  const results = useMemo(() => {
    if (!query.trim()) return []
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.category.toLowerCase().includes(query.toLowerCase()) ||
        p.description.toLowerCase().includes(query.toLowerCase())
    ).slice(0, 6)
  }, [query])

  function handleSelect(productId: string) {
    onOpenChange(false)
    setQuery("")
    router.push(`/product/${productId}`)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="top-[20%] translate-y-0 gap-0 p-0 sm:max-w-lg">
        <DialogTitle className="sr-only">Search products</DialogTitle>
        <div className="flex items-center gap-3 border-b border-border px-4">
          <Search className="h-5 w-5 shrink-0 text-muted-foreground" />
          <Input
            placeholder="Search products..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="border-0 bg-transparent py-6 text-base shadow-none focus-visible:ring-0"
            autoFocus
          />
        </div>
        {results.length > 0 && (
          <div className="max-h-72 overflow-y-auto p-2">
            {results.map((product) => (
              <button
                key={product.id}
                onClick={() => handleSelect(product.id)}
                className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-colors hover:bg-muted"
              >
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="h-10 w-10 rounded-md object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1560393464-5c69a73c5770?w=100&h=100&fit=crop"
                  }}
                />
                <div className="flex-1 overflow-hidden">
                  <p className="truncate text-sm font-medium text-foreground">{product.name}</p>
                  <p className="text-xs text-muted-foreground">${product.price.toFixed(2)}</p>
                </div>
              </button>
            ))}
          </div>
        )}
        {query.trim() && results.length === 0 && (
          <div className="p-6 text-center text-sm text-muted-foreground">No products found.</div>
        )}
      </DialogContent>
    </Dialog>
  )
}
