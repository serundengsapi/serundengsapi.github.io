"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink, Clock, TrendingUp } from "lucide-react"
import useSWR from "swr"

interface NewsArticle {
  id: string
  title: string
  description: string
  url: string
  source: string
  publishedAt: string
  category: string
  sentiment?: "positive" | "negative" | "neutral"
}

// Mock news data - in production, this would come from a real API
const mockNews: NewsArticle[] = [
  {
    id: "1",
    title: "Bitcoin Reaches New All-Time High Amid Institutional Adoption",
    description:
      "Major financial institutions continue to embrace Bitcoin, driving prices to unprecedented levels as mainstream adoption accelerates.",
    url: "#",
    source: "CryptoNews",
    publishedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    category: "Bitcoin",
    sentiment: "positive",
  },
  {
    id: "2",
    title: "Ethereum 2.0 Upgrade Shows Promising Results",
    description:
      "The latest Ethereum network upgrade demonstrates significant improvements in transaction speed and energy efficiency.",
    url: "#",
    source: "BlockchainDaily",
    publishedAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
    category: "Ethereum",
    sentiment: "positive",
  },
  {
    id: "3",
    title: "Regulatory Framework for Crypto Assets Takes Shape",
    description:
      "Global regulators work together to establish comprehensive guidelines for cryptocurrency trading and custody.",
    url: "#",
    source: "FinanceToday",
    publishedAt: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
    category: "Regulation",
    sentiment: "neutral",
  },
  {
    id: "4",
    title: "DeFi Protocol Launches Revolutionary Lending Platform",
    description:
      "New decentralized finance platform introduces innovative features for peer-to-peer lending with enhanced security.",
    url: "#",
    source: "DeFiInsider",
    publishedAt: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
    category: "DeFi",
    sentiment: "positive",
  },
  {
    id: "5",
    title: "NFT Market Sees Surge in Digital Art Collections",
    description:
      "Major artists and brands enter the NFT space, bringing renewed interest and innovation to digital collectibles.",
    url: "#",
    source: "NFTWorld",
    publishedAt: new Date(Date.now() - 18 * 60 * 60 * 1000).toISOString(),
    category: "NFT",
    sentiment: "positive",
  },
  {
    id: "6",
    title: "Blockchain Technology Adoption Grows in Supply Chain",
    description:
      "Fortune 500 companies implement blockchain solutions for enhanced transparency and efficiency in logistics.",
    url: "#",
    source: "TechCrypto",
    publishedAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    category: "Technology",
    sentiment: "positive",
  },
]

const fetcher = () => Promise.resolve(mockNews)

export function NewsFeed() {
  const { data: articles, error } = useSWR<NewsArticle[]>("news", fetcher)

  const getTimeAgo = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))

    if (diffInHours < 1) return "Just now"
    if (diffInHours === 1) return "1 hour ago"
    if (diffInHours < 24) return `${diffInHours} hours ago`
    const diffInDays = Math.floor(diffInHours / 24)
    if (diffInDays === 1) return "1 day ago"
    return `${diffInDays} days ago`
  }

  const getSentimentColor = (sentiment?: string) => {
    switch (sentiment) {
      case "positive":
        return "bg-green-500/10 text-green-500 border-green-500/20"
      case "negative":
        return "bg-red-500/10 text-red-500 border-red-500/20"
      default:
        return "bg-accent/10 text-accent border-accent/20"
    }
  }

  return (
    <div className="space-y-6">
      {/* Featured Article */}
      {articles && articles.length > 0 && (
        <Card className="overflow-hidden border-primary/30 bg-gradient-to-br from-primary/5 to-accent/5">
          <div className="p-8">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="h-5 w-5 text-primary" />
              <span className="text-sm font-semibold text-primary">Featured Story</span>
            </div>
            <h2 className="font-heading text-2xl font-bold md:text-3xl">{articles[0].title}</h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">{articles[0].description}</p>
            <div className="mt-6 flex flex-wrap items-center gap-4">
              <Badge variant="outline" className={getSentimentColor(articles[0].sentiment)}>
                {articles[0].sentiment || "neutral"}
              </Badge>
              <Badge variant="outline">{articles[0].category}</Badge>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="h-4 w-4" />
                {getTimeAgo(articles[0].publishedAt)}
              </div>
              <span className="text-sm text-muted-foreground">• {articles[0].source}</span>
            </div>
            <Button className="mt-6 bg-primary text-primary-foreground hover:bg-primary/90" asChild>
              <a href={articles[0].url} target="_blank" rel="noopener noreferrer">
                Read Full Article
                <ExternalLink className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </div>
        </Card>
      )}

      {/* News Grid */}
      <div className="grid gap-6 md:grid-cols-2">
        {articles?.slice(1).map((article) => (
          <Card
            key={article.id}
            className="group overflow-hidden border-border/50 transition-all hover:border-primary/50"
          >
            <div className="p-6">
              <div className="mb-3 flex flex-wrap items-center gap-2">
                <Badge variant="outline" className={getSentimentColor(article.sentiment)}>
                  {article.sentiment || "neutral"}
                </Badge>
                <Badge variant="outline">{article.category}</Badge>
              </div>
              <h3 className="font-heading text-xl font-semibold leading-tight group-hover:text-primary transition-colors">
                {article.title}
              </h3>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed line-clamp-2">{article.description}</p>
              <div className="mt-4 flex items-center justify-between">
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {getTimeAgo(article.publishedAt)}
                  </div>
                  <span>• {article.source}</span>
                </div>
                <Button variant="ghost" size="sm" className="text-accent hover:text-accent/80" asChild>
                  <a href={article.url} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {error && (
        <Card className="p-8 text-center">
          <p className="text-muted-foreground">Failed to load news. Please try again later.</p>
        </Card>
      )}

      {!articles && !error && (
        <Card className="p-8 text-center">
          <p className="text-muted-foreground">Loading news...</p>
        </Card>
      )}
    </div>
  )
}
