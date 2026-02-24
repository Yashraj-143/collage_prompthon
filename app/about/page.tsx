import type { Metadata } from "next"
import { AboutView } from "@/components/about-view"
import { SiteFooter } from "@/components/site-footer"

export const metadata: Metadata = {
  title: "About Us - NovaShop",
  description: "Learn about NovaShop and our mission to deliver premium products",
}

export default function AboutPage() {
  return (
    <>
      <AboutView />
      <SiteFooter />
    </>
  )
}
