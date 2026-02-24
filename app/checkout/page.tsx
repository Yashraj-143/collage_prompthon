import type { Metadata } from "next"
import { CheckoutForm } from "@/components/checkout-form"

export const metadata: Metadata = {
  title: "Checkout - NovaShop",
  description: "Complete your order",
}

export default function CheckoutPage() {
  return <CheckoutForm />
}
