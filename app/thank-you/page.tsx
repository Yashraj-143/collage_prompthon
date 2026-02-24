import type { Metadata } from "next"
import { ThankYouView } from "@/components/thank-you-view"
import { Suspense } from "react"

export const metadata: Metadata = {
  title: "Order Confirmed - NovaShop",
  description: "Your order has been placed successfully",
}

export default function ThankYouPage() {
  return (
    <Suspense fallback={<div className="flex min-h-[60vh] items-center justify-center text-muted-foreground">Loading...</div>}>
      <ThankYouView />
    </Suspense>
  )
}
