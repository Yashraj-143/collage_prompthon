"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, ShieldCheck, ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { useStore } from "@/lib/store"

export function CheckoutForm() {
  const router = useRouter()
  const { cart, cartTotal, placeOrder } = useStore()
  const [form, setForm] = useState({ name: "", phone: "", address: "", pincode: "" })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [processing, setProcessing] = useState(false)

  if (cart.length === 0) {
    return (
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-center px-4 py-32 text-center">
        <ShoppingBag className="h-16 w-16 text-muted-foreground/40" />
        <h1 className="mt-4 text-2xl font-bold text-foreground">No items to checkout</h1>
        <p className="mt-2 text-muted-foreground">Add some products to your cart first.</p>
        <Button className="mt-6 bg-accent text-accent-foreground hover:bg-accent/90" asChild>
          <Link href="/categories">Browse Products</Link>
        </Button>
      </div>
    )
  }

  function validate() {
    const e: Record<string, string> = {}
    if (!form.name.trim()) e.name = "Name is required"
    if (!form.phone.trim() || !/^\d{10}$/.test(form.phone)) e.phone = "Valid 10-digit phone required"
    if (!form.address.trim()) e.address = "Address is required"
    if (!form.pincode.trim() || !/^\d{6}$/.test(form.pincode)) e.pincode = "Valid 6-digit pincode required"
    setErrors(e)
    return Object.keys(e).length === 0
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!validate()) return
    setProcessing(true)
    // Simulate payment processing
    await new Promise((r) => setTimeout(r, 2000))
    const orderId = placeOrder(form)
    router.push(`/thank-you?orderId=${orderId}`)
  }

  const shipping = cartTotal >= 99 ? 0 : 9.99
  const total = cartTotal + shipping

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <Link href="/cart" className="mb-6 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="h-4 w-4" />
        Back to Cart
      </Link>

      <h1 className="text-2xl font-bold text-foreground sm:text-3xl">Checkout</h1>

      <div className="mt-8 grid gap-8 lg:grid-cols-5">
        <form onSubmit={handleSubmit} className="flex flex-col gap-6 lg:col-span-3">
          <div className="rounded-xl border border-border bg-card p-6">
            <h2 className="text-lg font-bold text-card-foreground">Delivery Address</h2>
            <div className="mt-4 flex flex-col gap-4">
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="John Doe"
                  className="mt-1"
                />
                {errors.name && <p className="mt-1 text-xs text-destructive">{errors.name}</p>}
              </div>
              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value.replace(/\D/g, "").slice(0, 10) })}
                  placeholder="1234567890"
                  className="mt-1"
                  maxLength={10}
                />
                {errors.phone && <p className="mt-1 text-xs text-destructive">{errors.phone}</p>}
              </div>
              <div>
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  value={form.address}
                  onChange={(e) => setForm({ ...form, address: e.target.value })}
                  placeholder="123 Main Street, Apt 4B"
                  className="mt-1"
                />
                {errors.address && <p className="mt-1 text-xs text-destructive">{errors.address}</p>}
              </div>
              <div>
                <Label htmlFor="pincode">Pincode</Label>
                <Input
                  id="pincode"
                  value={form.pincode}
                  onChange={(e) => setForm({ ...form, pincode: e.target.value.replace(/\D/g, "").slice(0, 6) })}
                  placeholder="110001"
                  className="mt-1"
                  maxLength={6}
                />
                {errors.pincode && <p className="mt-1 text-xs text-destructive">{errors.pincode}</p>}
              </div>
            </div>
          </div>

          <Button
            type="submit"
            size="lg"
            className="bg-accent text-accent-foreground hover:bg-accent/90"
            disabled={processing}
          >
            {processing ? (
              <span className="flex items-center gap-2">
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-accent-foreground border-t-transparent" />
                Processing Payment...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4" />
                Pay ${total.toFixed(2)}
              </span>
            )}
          </Button>
        </form>

        {/* Summary */}
        <div className="h-fit rounded-xl border border-border bg-card p-6 lg:col-span-2">
          <h2 className="text-lg font-bold text-card-foreground">Order Summary</h2>
          <div className="mt-4 flex flex-col gap-3">
            {cart.map((item) => (
              <div key={item.product.id} className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">
                  {item.product.name} x{item.quantity}
                </span>
                <span className="text-card-foreground">${(item.product.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
            <Separator />
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Subtotal</span>
              <span className="text-card-foreground">${cartTotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Shipping</span>
              <span className="text-card-foreground">{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
            </div>
            <Separator />
            <div className="flex justify-between font-bold text-card-foreground">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
