import type { Metadata } from "next"
import { AccountView } from "@/components/account-view"

export const metadata: Metadata = {
  title: "My Account - NovaShop",
  description: "View your orders and account details",
}

export default function AccountPage() {
  return <AccountView />
}
