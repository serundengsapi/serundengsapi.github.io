"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { useState } from "react"

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-xl">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <svg className="h-5 w-5 text-primary-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <span className="font-heading text-xl font-bold">CryptoLearn</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-8 md:flex">
            <Link
              href="/tracker"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Price Tracker
            </Link>
            <Link
              href="/news"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              News
            </Link>
            <Link
              href="/learn"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Learn
            </Link>
            <Link
              href="/analyzer"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              AI Analyzer
            </Link>
            <Button className="bg-accent text-accent-foreground hover:bg-accent/90">Get Started</Button>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="border-t border-border/40 py-4 md:hidden">
            <div className="flex flex-col gap-4">
              <Link
                href="/tracker"
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                Price Tracker
              </Link>
              <Link
                href="/news"
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                News
              </Link>
              <Link
                href="/learn"
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                Learn
              </Link>
              <Link
                href="/analyzer"
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                AI Analyzer
              </Link>
              <Button className="bg-accent text-accent-foreground hover:bg-accent/90">Get Started</Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
