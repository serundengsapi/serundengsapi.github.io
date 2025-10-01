import Link from "next/link"

export function Footer() {
  return (
    <footer className="border-t border-border/40 bg-card/50 py-12">
      <div className="container mx-auto px-4">
        <div className="grid gap-8 md:grid-cols-4">
          <div>
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <svg className="h-5 w-5 text-primary-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <span className="font-heading text-xl font-bold">CryptoLearn</span>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">
              Your trusted platform for cryptocurrency education and market analysis.
            </p>
          </div>

          <div>
            <h4 className="font-heading font-semibold">Platform</h4>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <Link href="/tracker" className="text-muted-foreground transition-colors hover:text-foreground">
                  Price Tracker
                </Link>
              </li>
              <li>
                <Link href="/news" className="text-muted-foreground transition-colors hover:text-foreground">
                  News Feed
                </Link>
              </li>
              <li>
                <Link href="/learn" className="text-muted-foreground transition-colors hover:text-foreground">
                  Learn
                </Link>
              </li>
              <li>
                <Link href="/analyzer" className="text-muted-foreground transition-colors hover:text-foreground">
                  AI Analyzer
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-semibold">Resources</h4>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <Link
                  href="/learn/blockchain"
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  Blockchain Basics
                </Link>
              </li>
              <li>
                <Link href="/learn/trading" className="text-muted-foreground transition-colors hover:text-foreground">
                  Trading Guide
                </Link>
              </li>
              <li>
                <Link href="/learn/security" className="text-muted-foreground transition-colors hover:text-foreground">
                  Security Tips
                </Link>
              </li>
              <li>
                <Link href="/learn/defi" className="text-muted-foreground transition-colors hover:text-foreground">
                  DeFi Explained
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-semibold">Company</h4>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <Link href="/about" className="text-muted-foreground transition-colors hover:text-foreground">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground transition-colors hover:text-foreground">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-muted-foreground transition-colors hover:text-foreground">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-muted-foreground transition-colors hover:text-foreground">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-border/40 pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} CryptoLearn. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
