"use client"

import Link from "next/link"
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { useStore } from "@/lib/store"
import { useState } from "react"

export function CartView() {
  const { cart, removeFromCart, updateQuantity, cartTotal } = useStore()
  const [imgErrors, setImgErrors] = useState<Set<string>>(new Set())

  if (cart.length === 0) {
    return (
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-center px-4 py-32 text-center">
        <ShoppingBag className="h-16 w-16 text-muted-foreground/40" />
        <h1 className="mt-4 text-2xl font-bold text-foreground">Your cart is empty</h1>
        <p className="mt-2 text-muted-foreground">Add some products to your cart to get started.</p>
        <Button className="mt-6 bg-accent text-accent-foreground hover:bg-accent/90" asChild>
          <Link href="/categories">Continue Shopping</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <h1 className="text-2xl font-bold text-foreground sm:text-3xl">Shopping Cart</h1>
      <p className="mt-1 text-sm text-muted-foreground">{cart.length} item{cart.length !== 1 ? "s" : ""} in your cart</p>

      <div className="mt-8 grid gap-8 lg:grid-cols-3">
        <div className="flex flex-col gap-4 lg:col-span-2">
          {cart.map((item) => (
            <div
              key={item.product.id}
              className="flex gap-4 rounded-xl border border-border bg-card p-4 transition-colors"
            >
              <Link href={`/product/${item.product.id}`} className="flex-shrink-0">
                <img
                  src={imgErrors.has(item.product.id) ? "https://images.unsplash.com/photo-1560393464-5c69a73c5770?w=200&h=200&fit=crop" : item.product.images[0]}
                  alt={item.product.name}
                  className="h-24 w-24 rounded-lg object-cover sm:h-32 sm:w-32"
                  onError={() => setImgErrors((prev) => new Set(prev).add(item.product.id))}
                />
              </Link>
              <div className="flex flex-1 flex-col justify-between">
                <div>
                  <Link href={`/product/${item.product.id}`}>
                    <h3 className="font-semibold text-card-foreground hover:text-accent">{item.product.name}</h3>
                  </Link>
                  <p className="mt-0.5 text-sm text-muted-foreground capitalize">{item.product.category}</p>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 rounded-lg border border-border">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                      aria-label="Decrease quantity"
                    >
                      <Minus className="h-3.5 w-3.5" />
                    </Button>
                    <span className="min-w-[2ch] text-center text-sm font-medium text-card-foreground">
                      {item.quantity}
                    </span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                      aria-label="Increase quantity"
                    >
                      <Plus className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-bold text-card-foreground">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-muted-foreground hover:text-destructive"
                      onClick={() => removeFromCart(item.product.id)}
                      aria-label="Remove item"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="h-fit rounded-xl border border-border bg-card p-6">
          <h2 className="text-lg font-bold text-card-foreground">Order Summary</h2>
          <div className="mt-4 flex flex-col gap-3">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Subtotal</span>
              <span className="text-card-foreground">${cartTotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Shipping</span>
              <span className="text-card-foreground">{cartTotal >= 99 ? "Free" : "$9.99"}</span>
            </div>
            <Separator />
            <div className="flex justify-between font-bold">
              <span className="text-card-foreground">Total</span>
              <span className="text-card-foreground">
                ${(cartTotal + (cartTotal >= 99 ? 0 : 9.99)).toFixed(2)}
              </span>
            </div>
          </div>
          <Button className="mt-6 w-full bg-accent text-accent-foreground hover:bg-accent/90" size="lg" asChild>
            <Link href="/checkout">Proceed to Checkout</Link>
          </Button>
          <Button variant="ghost" className="mt-2 w-full text-sm" asChild>
            <Link href="/categories">Continue Shopping</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
