"use client"

import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { CheckCircle2, Package, ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"

export function ThankYouView() {
  const searchParams = useSearchParams()
  const orderId = searchParams.get("orderId")

  return (
    <div className="mx-auto flex max-w-2xl flex-col items-center px-4 py-24 text-center">
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900/30">
        <CheckCircle2 className="h-10 w-10 text-emerald-600 dark:text-emerald-400" />
      </div>
      <h1 className="mt-6 text-3xl font-bold text-foreground">Thank You!</h1>
      <p className="mt-2 text-lg text-muted-foreground">Your order has been placed successfully.</p>

      {orderId && (
        <div className="mt-6 rounded-xl border border-border bg-card p-6">
          <p className="text-sm text-muted-foreground">Order ID</p>
          <p className="mt-1 text-lg font-bold tracking-wide text-card-foreground">{orderId}</p>
        </div>
      )}

      <p className="mt-6 max-w-sm text-sm leading-relaxed text-muted-foreground">
        We have received your order and it is now being processed. You will receive a confirmation email shortly.
      </p>

      <div className="mt-8 flex flex-wrap justify-center gap-4">
        {orderId && (
          <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90" asChild>
            <Link href={`/track-order?orderId=${orderId}`}>
              <Package className="mr-2 h-4 w-4" />
              Track Order
            </Link>
          </Button>
        )}
        <Button size="lg" variant="outline" asChild>
          <Link href="/">
            <ShoppingBag className="mr-2 h-4 w-4" />
            Continue Shopping
          </Link>
        </Button>
      </div>
    </div>
  )
}
