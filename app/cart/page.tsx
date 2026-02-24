import type { Metadata } from "next"
import { CartView } from "@/components/cart-view"

export const metadata: Metadata = {
  title: "Shopping Cart - NovaShop",
  description: "Review your cart and proceed to checkout",
}

export default function CartPage() {
  return <CartView />
}
