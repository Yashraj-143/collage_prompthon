import Link from "next/link"

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-secondary/50">
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          <div>
            <h3 className="text-sm font-semibold text-foreground">Shop</h3>
            <ul className="mt-3 flex flex-col gap-2">
              <li><Link href="/categories?category=electronics" className="text-sm text-muted-foreground hover:text-foreground">Electronics</Link></li>
              <li><Link href="/categories?category=clothing" className="text-sm text-muted-foreground hover:text-foreground">Clothing</Link></li>
              <li><Link href="/categories?category=home" className="text-sm text-muted-foreground hover:text-foreground">Home & Living</Link></li>
              <li><Link href="/categories?category=sports" className="text-sm text-muted-foreground hover:text-foreground">Sports</Link></li>
              <li><Link href="/categories?category=books" className="text-sm text-muted-foreground hover:text-foreground">Books</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-foreground">Company</h3>
            <ul className="mt-3 flex flex-col gap-2">
              <li><Link href="/about" className="text-sm text-muted-foreground hover:text-foreground">About Us</Link></li>
              <li><Link href="/support" className="text-sm text-muted-foreground hover:text-foreground">Support</Link></li>
              <li><Link href="/support" className="text-sm text-muted-foreground hover:text-foreground">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-foreground">Customer</h3>
            <ul className="mt-3 flex flex-col gap-2">
              <li><Link href="/cart" className="text-sm text-muted-foreground hover:text-foreground">Cart</Link></li>
              <li><Link href="/account" className="text-sm text-muted-foreground hover:text-foreground">My Account</Link></li>
              <li><Link href="/support" className="text-sm text-muted-foreground hover:text-foreground">FAQ</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-foreground">NovaShop</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Premium products, exceptional quality. Your one-stop destination for everything you need.
            </p>
          </div>
        </div>
        <div className="mt-10 border-t border-border pt-6">
          <p className="text-center text-xs text-muted-foreground">
            2026 NovaShop. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
