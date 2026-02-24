"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-background">
      <div className="mx-auto flex max-w-7xl flex-col items-center px-4 pb-20 pt-24 text-center lg:pt-32">
        <span className="mb-4 inline-block rounded-full border border-border bg-secondary px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-muted-foreground">
          New Collection 2026
        </span>
        <h1 className="max-w-4xl text-balance text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl">
          Discover products that define your style
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
          Curated collections of premium products across electronics, fashion, home, and more.
          Free shipping on all orders over $99.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Button size="lg" className="bg-foreground text-background hover:bg-foreground/90" asChild>
            <Link href="/categories">
              Shop Now
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href="/about">Our Story</Link>
          </Button>
        </div>
        <div className="mt-16 grid grid-cols-3 gap-8 text-center sm:gap-16">
          <div>
            <p className="text-2xl font-bold text-foreground sm:text-3xl">20k+</p>
            <p className="mt-1 text-xs text-muted-foreground sm:text-sm">Happy Customers</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-foreground sm:text-3xl">500+</p>
            <p className="mt-1 text-xs text-muted-foreground sm:text-sm">Premium Products</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-foreground sm:text-3xl">99%</p>
            <p className="mt-1 text-xs text-muted-foreground sm:text-sm">Satisfaction Rate</p>
          </div>
        </div>
      </div>
    </section>
  )
}
