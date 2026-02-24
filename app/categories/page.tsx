import type { Metadata } from "next"
import { CategoriesView } from "@/components/categories-view"
import { SiteFooter } from "@/components/site-footer"
import { Suspense } from "react"

export const metadata: Metadata = {
  title: "Categories - NovaShop",
  description: "Browse all product categories and find what you need",
}

export default function CategoriesPage() {
  return (
    <>
      <Suspense fallback={<div className="flex min-h-[60vh] items-center justify-center text-muted-foreground">Loading...</div>}>
        <CategoriesView />
      </Suspense>
      <SiteFooter />
    </>
  )
}
