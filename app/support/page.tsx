import type { Metadata } from "next"
import { SupportView } from "@/components/support-view"
import { SiteFooter } from "@/components/site-footer"

export const metadata: Metadata = {
  title: "Support - NovaShop",
  description: "Get help and find answers to your questions",
}

export default function SupportPage() {
  return (
    <>
      <SupportView />
      <SiteFooter />
    </>
  )
}
