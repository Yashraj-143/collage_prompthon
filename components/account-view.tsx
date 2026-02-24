"use client"

import Link from "next/link"
import { Package, ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useStore } from "@/lib/store"

export function AccountView() {
  const { orders } = useStore()

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <h1 className="text-2xl font-bold text-foreground sm:text-3xl">My Account</h1>
      <p className="mt-1 text-muted-foreground">View your recent orders and account details</p>

      <div className="mt-10">
        <h2 className="text-xl font-bold text-foreground">Order History</h2>

        {orders.length === 0 ? (
          <div className="mt-8 flex flex-col items-center py-16 text-center">
            <Package className="h-12 w-12 text-muted-foreground/40" />
            <h3 className="mt-4 text-lg font-semibold text-foreground">No orders yet</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Once you place an order, it will appear here.
            </p>
            <Button className="mt-4 bg-accent text-accent-foreground hover:bg-accent/90" asChild>
              <Link href="/categories">
                <ShoppingBag className="mr-2 h-4 w-4" />
                Start Shopping
              </Link>
            </Button>
          </div>
        ) : (
          <div className="mt-4 flex flex-col gap-4">
            {orders
              .slice()
              .reverse()
              .map((order) => (
                <div key={order.id} className="rounded-xl border border-border bg-card p-5">
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Order ID</p>
                      <p className="font-bold tracking-wide text-card-foreground">{order.id}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">
                        {new Date(order.date).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </p>
                      <Badge
                        variant="outline"
                        className={
                          order.status === "delivered"
                            ? "border-emerald-500/30 text-emerald-600 dark:text-emerald-400"
                            : "border-amber-500/30 text-amber-600 dark:text-amber-400"
                        }
                      >
                        {order.status.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}
                      </Badge>
                    </div>
                  </div>
                  <div className="mt-3 flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span>{order.items.length} item{order.items.length !== 1 ? "s" : ""}</span>
                      <span className="text-border">|</span>
                      <span className="font-semibold text-card-foreground">${order.total.toFixed(2)}</span>
                    </div>
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/track-order?orderId=${order.id}`}>Track Order</Link>
                    </Button>
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  )
}
