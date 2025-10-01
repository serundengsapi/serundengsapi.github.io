"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Brain, TrendingUp, TrendingDown, AlertCircle, Sparkles, Loader2 } from "lucide-react"
import { useState } from "react"

interface AnalysisResult {
  sentiment: "bullish" | "bearish" | "neutral"
  confidence: number
  prediction: string
  keyFactors: string[]
  recommendation: string
  timeframe: string
}

export function AIAnalyzer() {
  const [crypto, setCrypto] = useState("")
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [result, setResult] = useState<AnalysisResult | null>(null)

  const handleAnalyze = async () => {
    if (!crypto.trim()) return

    setIsAnalyzing(true)
    setResult(null)

    // Simulate AI analysis with realistic delay
    await new Promise((resolve) => setTimeout(resolve, 2500))

    // Mock AI analysis result
    const mockResult: AnalysisResult = {
      sentiment: Math.random() > 0.5 ? "bullish" : Math.random() > 0.3 ? "bearish" : "neutral",
      confidence: Math.floor(Math.random() * 30) + 70,
      prediction: `Based on current market sentiment and recent news events, ${crypto} shows ${
        Math.random() > 0.5 ? "strong potential for growth" : "signs of consolidation"
      } in the coming weeks. Technical indicators suggest ${
        Math.random() > 0.5 ? "accumulation" : "distribution"
      } patterns forming.`,
      keyFactors: [
        "Increased institutional adoption and mainstream acceptance",
        "Positive regulatory developments in major markets",
        "Strong on-chain metrics and network activity",
        "Growing developer ecosystem and protocol upgrades",
        "Favorable macroeconomic conditions for risk assets",
      ],
      recommendation: `Consider ${
        Math.random() > 0.5 ? "accumulating" : "monitoring"
      } positions with proper risk management. Set stop-losses and take-profit levels based on your risk tolerance.`,
      timeframe: "7-14 days",
    }

    setResult(mockResult)
    setIsAnalyzing(false)
  }

  const getSentimentIcon = (sentiment: string) => {
    switch (sentiment) {
      case "bullish":
        return <TrendingUp className="h-5 w-5" />
      case "bearish":
        return <TrendingDown className="h-5 w-5" />
      default:
        return <AlertCircle className="h-5 w-5" />
    }
  }

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case "bullish":
        return "bg-green-500/10 text-green-500 border-green-500/20"
      case "bearish":
        return "bg-red-500/10 text-red-500 border-red-500/20"
      default:
        return "bg-accent/10 text-accent border-accent/20"
    }
  }

  return (
    <div className="space-y-6">
      {/* Input Section */}
      <Card className="overflow-hidden border-primary/30 bg-gradient-to-br from-primary/5 to-accent/5">
        <div className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <Brain className="h-5 w-5 text-primary" />
            <h2 className="font-heading text-xl font-semibold">Analyze Cryptocurrency</h2>
          </div>
          <p className="text-sm text-muted-foreground mb-4">
            Enter a cryptocurrency name or symbol to get AI-powered market analysis and predictions.
          </p>
          <Textarea
            placeholder="e.g., Bitcoin, Ethereum, BTC, ETH..."
            value={crypto}
            onChange={(e) => setCrypto(e.target.value)}
            className="mb-4 min-h-[100px]"
            disabled={isAnalyzing}
          />
          <Button
            onClick={handleAnalyze}
            disabled={!crypto.trim() || isAnalyzing}
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
          >
            {isAnalyzing ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Analyzing Market Data...
              </>
            ) : (
              <>
                <Sparkles className="mr-2 h-4 w-4" />
                Generate Analysis
              </>
            )}
          </Button>
        </div>
      </Card>

      {/* Results Section */}
      {result && (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
          {/* Sentiment Overview */}
          <Card className="overflow-hidden border-border/50">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-heading text-2xl font-semibold">Market Sentiment</h3>
                <Badge variant="outline" className={`${getSentimentColor(result.sentiment)} text-base px-4 py-2`}>
                  <span className="mr-2">{getSentimentIcon(result.sentiment)}</span>
                  {result.sentiment.toUpperCase()}
                </Badge>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <div className="text-sm text-muted-foreground mb-2">Confidence Level</div>
                  <div className="flex items-center gap-3">
                    <div className="flex-1 h-3 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-1000"
                        style={{ width: `${result.confidence}%` }}
                      />
                    </div>
                    <span className="font-heading text-xl font-bold">{result.confidence}%</span>
                  </div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground mb-2">Analysis Timeframe</div>
                  <div className="font-heading text-xl font-bold">{result.timeframe}</div>
                </div>
              </div>
            </div>
          </Card>

          {/* Prediction */}
          <Card className="overflow-hidden border-border/50">
            <div className="p-6">
              <h3 className="font-heading text-xl font-semibold mb-4">AI Prediction</h3>
              <p className="text-muted-foreground leading-relaxed">{result.prediction}</p>
            </div>
          </Card>

          {/* Key Factors */}
          <Card className="overflow-hidden border-border/50">
            <div className="p-6">
              <h3 className="font-heading text-xl font-semibold mb-4">Key Influencing Factors</h3>
              <ul className="space-y-3">
                {result.keyFactors.map((factor, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-semibold mt-0.5">
                      {index + 1}
                    </div>
                    <span className="text-muted-foreground leading-relaxed flex-1">{factor}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Card>

          {/* Recommendation */}
          <Card className="overflow-hidden border-accent/30 bg-gradient-to-br from-accent/5 to-primary/5">
            <div className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <AlertCircle className="h-5 w-5 text-accent" />
                <h3 className="font-heading text-xl font-semibold">Recommendation</h3>
              </div>
              <p className="text-muted-foreground leading-relaxed mb-4">{result.recommendation}</p>
              <div className="rounded-lg bg-background/50 border border-border/50 p-4">
                <p className="text-sm text-muted-foreground">
                  <strong className="text-foreground">Disclaimer:</strong> This analysis is generated by AI and should
                  not be considered financial advice. Always conduct your own research and consult with financial
                  professionals before making investment decisions.
                </p>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Info Card */}
      {!result && !isAnalyzing && (
        <Card className="border-border/50">
          <div className="p-6">
            <h3 className="font-heading text-lg font-semibold mb-3">How It Works</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span>AI analyzes recent news events and market sentiment</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span>Evaluates technical indicators and on-chain metrics</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span>Considers macroeconomic factors and regulatory developments</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span>Generates predictions with confidence levels and timeframes</span>
              </li>
            </ul>
          </div>
        </Card>
      )}
    </div>
  )
}
