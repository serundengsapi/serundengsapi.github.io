import { Card } from "@/components/ui/card"
import { BookOpen, TrendingUp, Newspaper, Brain } from "lucide-react"
import Link from "next/link"

const features = [
  {
    icon: BookOpen,
    title: "Educational Resources",
    description:
      "Comprehensive guides on blockchain technology, cryptocurrency fundamentals, and advanced trading strategies.",
    href: "/learn",
    color: "primary",
  },
  {
    icon: TrendingUp,
    title: "Real-Time Price Tracker",
    description: "Track live prices, market caps, and 24h changes for all major cryptocurrencies in one place.",
    href: "/tracker",
    color: "accent",
  },
  {
    icon: Newspaper,
    title: "Curated News Feed",
    description: "Stay updated with the latest crypto news aggregated from trusted sources across the industry.",
    href: "/news",
    color: "primary",
  },
  {
    icon: Brain,
    title: "AI Crypto Analyzer",
    description: "Get AI-powered predictions and market sentiment analysis based on news events and trends.",
    href: "/analyzer",
    color: "accent",
  },
]

export function Features() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-heading text-3xl font-bold md:text-4xl">Everything You Need to Succeed</h2>
          <p className="mt-4 text-muted-foreground">
            Powerful tools and resources to help you navigate the crypto landscape with confidence.
          </p>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => {
            const Icon = feature.icon
            return (
              <Link key={feature.title} href={feature.href}>
                <Card className="group relative h-full overflow-hidden border-border/50 bg-card p-6 transition-all hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10">
                  <div
                    className={`inline-flex h-12 w-12 items-center justify-center rounded-lg ${
                      feature.color === "primary" ? "bg-primary/10 text-primary" : "bg-accent/10 text-accent"
                    } transition-transform group-hover:scale-110`}
                  >
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-4 font-heading text-xl font-semibold">{feature.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
                  <div className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-primary to-accent transition-all group-hover:w-full" />
                </Card>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
