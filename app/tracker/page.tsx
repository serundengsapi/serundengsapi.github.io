import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { PriceTracker } from "@/components/price-tracker"

export default function TrackerPage() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-6xl">
            <div className="mb-8">
              <h1 className="font-heading text-4xl font-bold md:text-5xl">Real-Time Price Tracker</h1>
              <p className="mt-4 text-lg text-muted-foreground">
                Track live cryptocurrency prices, market caps, and 24-hour changes.
              </p>
            </div>
            <PriceTracker />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
