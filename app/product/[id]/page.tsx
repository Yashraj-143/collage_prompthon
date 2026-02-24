import { products } from "@/lib/data"
import { notFound } from "next/navigation"
import { ProductDetail } from "@/components/product-detail"
import { SiteFooter } from "@/components/site-footer"

export function generateStaticParams() {
  return products.map((p) => ({ id: p.id }))
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const product = products.find((p) => p.id === id)
  if (!product) return { title: "Product Not Found" }
  return { title: `${product.name} - NovaShop`, description: product.description }
}

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const product = products.find((p) => p.id === id)
  if (!product) notFound()

  return (
    <>
      <ProductDetail product={product} />
      <SiteFooter />
    </>
  )
}
