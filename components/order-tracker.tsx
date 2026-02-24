"use client"

import { useState } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { Package, Truck, MapPin, CheckCircle2, Clock, ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useStore } from "@/lib/store"
import { cn } from "@/lib/utils"

const statusSteps = [
  { key: "processing", label: "Processing", description: "Order is being prepared", icon: Clock },
  { key: "shipped", label: "Shipped", description: "Order has been shipped", icon: Package },
  { key: "out-for-delivery", label: "Out for Delivery", description: "Order is on the way", icon: Truck },
  { key: "delivered", label: "Delivered", description: "Order has been delivered", icon: CheckCircle2 },
] as const

export function OrderTracker() {
  const searchParams = useSearchParams()
  const initialId = searchParams.get("orderId") || ""
  const [orderId, setOrderId] = useState(initialId)
  const [searchId, setSearchId] = useState(initialId)
  const { getOrder } = useStore()

  const order = orderId ? getOrder(orderId) : undefined
  const currentStepIndex = order ? statusSteps.findIndex((s) => s.key === order.status) : -1

  function handleSearch(e: React.FormEvent) {
    e.preventDefault()
    setOrderId(searchId)
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-2xl font-bold text-foreground sm:text-3xl">Track Your Order</h1>
      <p className="mt-1 text-muted-foreground">Enter your order ID to see the current status</p>

      <form onSubmit={handleSearch} className="mt-6 flex gap-3">
        <Input
          placeholder="Enter Order ID (e.g., ORD-ABC123-XYZ)"
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
          className="max-w-md"
        />
        <Button type="submit" className="bg-accent text-accent-foreground hover:bg-accent/90">
          Track
        </Button>
      </form>

      {orderId && !order && (
        <div className="mt-10 flex flex-col items-center py-12 text-center">
          <MapPin className="h-12 w-12 text-muted-foreground/40" />
          <h2 className="mt-4 text-lg font-semibold text-foreground">Order not found</h2>
          <p className="mt-1 text-sm text-muted-foreground">Please check your order ID and try again.</p>
        </div>
      )}

      {order && (
        <div className="mt-10">
          <div className="rounded-xl border border-border bg-card p-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Order ID</p>
                <p className="font-bold tracking-wide text-card-foreground">{order.id}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-muted-foreground">Order Date</p>
                <p className="text-sm font-medium text-card-foreground">
                  {new Date(order.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
            </div>
          </div>

          {/* Timeline */}
          <div className="mt-8 px-2">
            <div className="relative flex flex-col gap-0">
              {statusSteps.map((step, index) => {
                const isCompleted = index <= currentStepIndex
                const isCurrent = index === currentStepIndex
                const Icon = step.icon
                return (
                  <div key={step.key} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div
                        className={cn(
                          "flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all duration-500",
                          isCompleted
                            ? "border-accent bg-accent text-accent-foreground"
                            : "border-border bg-background text-muted-foreground",
                          isCurrent && "ring-4 ring-accent/20"
                        )}
                      >
                        <Icon className="h-5 w-5" />
                      </div>
                      {index < statusSteps.length - 1 && (
                        <div
                          className={cn(
                            "w-0.5 flex-1 min-h-12 transition-colors duration-500",
                            index < currentStepIndex ? "bg-accent" : "bg-border"
                          )}
                        />
                      )}
                    </div>
                    <div className="pb-10">
                      <p
                        className={cn(
                          "font-semibold",
                          isCompleted ? "text-foreground" : "text-muted-foreground"
                        )}
                      >
                        {step.label}
                      </p>
                      <p className="text-sm text-muted-foreground">{step.description}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Order Items */}
          <div className="mt-6 rounded-xl border border-border bg-card p-6">
            <h3 className="font-semibold text-card-foreground">Order Items</h3>
            <div className="mt-3 flex flex-col gap-3">
              {order.items.map((item) => (
                <div key={item.product.id} className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">
                    {item.product.name} x{item.quantity}
                  </span>
                  <span className="font-medium text-card-foreground">
                    ${(item.product.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
              <div className="mt-2 border-t border-border pt-2">
                <div className="flex justify-between font-bold text-card-foreground">
                  <span>Total</span>
                  <span>${order.total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 flex justify-center">
            <Button variant="outline" asChild>
              <Link href="/">
                <ShoppingBag className="mr-2 h-4 w-4" />
                Continue Shopping
              </Link>
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
