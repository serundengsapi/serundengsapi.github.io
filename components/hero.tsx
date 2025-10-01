"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, TrendingUp } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"

export function Hero() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <section className="relative overflow-hidden pt-32 pb-20">
      {/* Animated background grid */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#7350FF10_1px,transparent_1px),linear-gradient(to_bottom,#7350FF10_1px,transparent_1px)] bg-[size:4rem_4rem]" />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/50 to-background" />
      </div>

      {/* Glowing orbs */}
      <div className="absolute top-20 left-1/4 h-96 w-96 rounded-full bg-primary/20 blur-[120px]" />
      <div className="absolute bottom-0 right-1/4 h-96 w-96 rounded-full bg-accent/20 blur-[120px]" />

      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-4xl text-center">
          <div
            className={`inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-sm font-medium text-primary transition-all duration-700 ${
              mounted ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            }`}
          >
            <TrendingUp className="h-4 w-4" />
            <span>AI-Powered Crypto Analysis</span>
          </div>

          <h1
            className={`mt-8 font-heading text-5xl font-bold leading-tight text-balance md:text-7xl transition-all duration-700 delay-100 ${
              mounted ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            }`}
          >
            Master the Future of{" "}
            <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              Cryptocurrency
            </span>
          </h1>

          <p
            className={`mt-6 text-lg text-muted-foreground text-balance md:text-xl transition-all duration-700 delay-200 ${
              mounted ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            }`}
          >
            Your comprehensive platform for crypto education, real-time price tracking, curated news, and AI-powered
            market analysis. Start your blockchain journey today.
          </p>

          <div
            className={`mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row transition-all duration-700 delay-300 ${
              mounted ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            }`}
          >
            <Button asChild size="lg" className="group bg-primary text-primary-foreground hover:bg-primary/90">
              <Link href="/auth/sign-up">
                Get Started
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-accent text-accent hover:bg-accent/10 bg-transparent"
            >
              <Link href="/tracker">View Live Prices</Link>
            </Button>
          </div>

          {/* Stats */}
          <div
            className={`mt-20 grid grid-cols-2 gap-8 md:grid-cols-4 transition-all duration-700 delay-500 ${
              mounted ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            }`}
          >
            <div className="text-center">
              <div className="font-heading text-3xl font-bold text-primary md:text-4xl">10K+</div>
              <div className="mt-2 text-sm text-muted-foreground">Active Learners</div>
            </div>
            <div className="text-center">
              <div className="font-heading text-3xl font-bold text-accent md:text-4xl">500+</div>
              <div className="mt-2 text-sm text-muted-foreground">Crypto Assets</div>
            </div>
            <div className="text-center">
              <div className="font-heading text-3xl font-bold text-primary md:text-4xl">24/7</div>
              <div className="mt-2 text-sm text-muted-foreground">Live Updates</div>
            </div>
            <div className="text-center">
              <div className="font-heading text-3xl font-bold text-accent md:text-4xl">AI</div>
              <div className="mt-2 text-sm text-muted-foreground">Powered Analysis</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
