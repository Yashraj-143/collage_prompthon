"use client"

import { useEffect, useState, useRef } from "react"
import { Shield, Truck, Headphones, RefreshCcw } from "lucide-react"

const stats = [
  { label: "Happy Customers", value: 20000, suffix: "+" },
  { label: "Products Sold", value: 150000, suffix: "+" },
  { label: "Countries Served", value: 50, suffix: "+" },
  { label: "5-Star Reviews", value: 12000, suffix: "+" },
]

const features = [
  {
    icon: Shield,
    title: "Secure Payments",
    description: "All transactions are encrypted and processed through secure payment gateways.",
  },
  {
    icon: Truck,
    title: "Fast Delivery",
    description: "Free shipping on orders over $99. Most orders delivered within 5-7 business days.",
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    description: "Our dedicated support team is available around the clock to help with any questions.",
  },
  {
    icon: RefreshCcw,
    title: "Easy Returns",
    description: "30-day hassle-free return policy. Not satisfied? Get a full refund, no questions asked.",
  },
]

function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const started = useRef(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true
          const duration = 2000
          const startTime = performance.now()
          function step(time: number) {
            const elapsed = time - startTime
            const progress = Math.min(elapsed / duration, 1)
            const eased = 1 - Math.pow(1 - progress, 3)
            setCount(Math.floor(eased * value))
            if (progress < 1) requestAnimationFrame(step)
          }
          requestAnimationFrame(step)
        }
      },
      { threshold: 0.3 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [value])

  return (
    <div ref={ref} className="text-3xl font-bold text-foreground sm:text-4xl">
      {count.toLocaleString()}
      {suffix}
    </div>
  )
}

export function AboutView() {
  return (
    <div>
      {/* Hero */}
      <section className="mx-auto max-w-7xl px-4 py-20 text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl">
          About NovaShop
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-pretty leading-relaxed text-muted-foreground">
          Founded in 2020, NovaShop started with a simple mission: to make premium products accessible to everyone.
          Today, we serve millions of customers worldwide with a curated selection of the finest products across
          electronics, fashion, home goods, sports equipment, and books.
        </p>
      </section>

      {/* Animated Stats */}
      <section className="border-y border-border bg-secondary/50">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-4 py-16 sm:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="mx-auto max-w-7xl px-4 py-20">
        <h2 className="text-center text-2xl font-bold text-foreground sm:text-3xl">Why Choose NovaShop</h2>
        <p className="mx-auto mt-2 max-w-xl text-center text-muted-foreground">
          We go above and beyond to ensure the best shopping experience
        </p>
        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => {
            const Icon = feature.icon
            return (
              <div
                key={feature.title}
                className="group rounded-xl border border-border bg-card p-6 text-center transition-all duration-300 hover:shadow-md hover:-translate-y-1"
              >
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-accent/10 text-accent transition-colors group-hover:bg-accent group-hover:text-accent-foreground">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mt-4 font-semibold text-card-foreground">{feature.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{feature.description}</p>
              </div>
            )
          })}
        </div>
      </section>

      {/* Mission */}
      <section className="border-t border-border bg-secondary/50 py-20">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <h2 className="text-2xl font-bold text-foreground sm:text-3xl">Our Mission</h2>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            {"\"We believe that everyone deserves access to high-quality products at fair prices. Our team works tirelessly to source, curate, and deliver the best products from around the world, ensuring that every purchase brings joy and satisfaction to our customers.\""}
          </p>
          <p className="mt-4 text-sm font-semibold text-foreground">- The NovaShop Team</p>
        </div>
      </section>
    </div>
  )
}
