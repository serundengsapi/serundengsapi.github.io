import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { AIAnalyzer } from "@/components/ai-analyzer"

export default function AnalyzerPage() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <div className="mb-8">
              <h1 className="font-heading text-4xl font-bold md:text-5xl">AI Crypto Analyzer</h1>
              <p className="mt-4 text-lg text-muted-foreground">
                Get AI-powered predictions and market sentiment analysis based on current news and trends.
              </p>
            </div>
            <AIAnalyzer />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
