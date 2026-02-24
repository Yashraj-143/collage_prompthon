import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { ThemeProvider } from "next-themes"
import { StoreProvider } from "@/lib/store"
import { SiteHeader } from "@/components/site-header"
import { Toaster } from "sonner"
import "./globals.css"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })

export const metadata: Metadata = {
  title: "NovaShop - Premium Online Store",
  description:
    "Discover premium products across electronics, clothing, home & living, sports, and books. Shop with confidence.",
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f8f7f4" },
    { media: "(prefers-color-scheme: dark)", color: "#1a1816" },
  ],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <StoreProvider>
            <SiteHeader />
            <main>{children}</main>
            <Toaster position="bottom-right" />
          </StoreProvider>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
