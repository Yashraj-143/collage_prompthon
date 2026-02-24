import type { Metadata } from "next"
import { OrderTracker } from "@/components/order-tracker"
import { Suspense } from "react"

export const metadata: Metadata = {
  title: "Track Order - NovaShop",
  description: "Track your order status",
}

export default function TrackOrderPage() {
  return (
    <Suspense fallback={<div className="flex min-h-[60vh] items-center justify-center text-muted-foreground">Loading...</div>}>
      <OrderTracker />
    </Suspense>
  )
}
