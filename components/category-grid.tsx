"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { categories } from "@/lib/data"

export function CategoryGrid() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-20">
      <div className="flex items-end justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">Shop by Category</h2>
          <p className="mt-2 text-muted-foreground">Browse our curated collections</p>
        </div>
        <Link
          href="/categories"
          className="hidden items-center gap-1 text-sm font-medium text-foreground transition-colors hover:text-accent sm:flex"
        >
          View all
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
      <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {categories.map((category) => (
          <Link
            key={category.id}
            href={`/categories?category=${category.id}`}
            className="group relative overflow-hidden rounded-xl"
          >
            <div className="aspect-[4/3] overflow-hidden">
              <img
                src={category.image}
                alt={category.name}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
              />
            </div>
            <div className="absolute inset-0 flex flex-col items-center justify-end bg-gradient-to-t from-black/70 via-black/20 to-transparent p-4">
              <h3 className="text-sm font-semibold text-white sm:text-base">{category.name}</h3>
              <p className="text-xs text-white/70">{category.count} products</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
