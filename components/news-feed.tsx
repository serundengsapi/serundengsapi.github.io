"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Clock, TrendingUp, ArrowRight } from "lucide-react"
import Link from "next/link"

interface NewsArticle {
  id: string
  title: string
  description: string
  content: string
  url: string
  source: string
  published_at: string
  category: string
  sentiment?: "positive" | "negative" | "neutral"
  image_url?: string
}

interface NewsFeedProps {
  initialNews: NewsArticle[]
}

export function NewsFeed({ initialNews }: NewsFeedProps) {
  const articles = initialNews

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

  if (!articles || articles.length === 0) {
    return (
      <Card className="p-8 text-center">
        <p className="text-muted-foreground">No news articles available. Please check back later.</p>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {/* Featured Article */}
      {articles.length > 0 && (
        <Card className="overflow-hidden border-primary/30 bg-gradient-to-br from-primary/5 to-accent/5">
          {articles[0].image_url && (
            <div className="relative h-64 w-full overflow-hidden">
              <img
                src={articles[0].image_url || "/placeholder.svg"}
                alt={articles[0].title}
                className="h-full w-full object-cover"
                onError={(e) => {
                  e.currentTarget.style.display = "none"
                }}
              />
            </div>
          )}
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
                {getTimeAgo(articles[0].published_at)}
              </div>
              <span className="text-sm text-muted-foreground">• {articles[0].source}</span>
            </div>
            <Button className="mt-6 bg-primary text-primary-foreground hover:bg-primary/90" asChild>
              <Link href={`/news/${articles[0].id}`}>
                Read Full Article
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </Card>
      )}

      {/* News Grid */}
      <div className="grid gap-6 md:grid-cols-2">
        {articles.slice(1).map((article) => (
          <Link key={article.id} href={`/news/${article.id}`}>
            <Card className="group overflow-hidden border-border/50 transition-all hover:border-primary/50 h-full cursor-pointer">
              {article.image_url && (
                <div className="relative h-48 w-full overflow-hidden">
                  <img
                    src={article.image_url || "/placeholder.svg"}
                    alt={article.title}
                    className="h-full w-full object-cover transition-transform group-hover:scale-105"
                    onError={(e) => {
                      e.currentTarget.style.display = "none"
                    }}
                  />
                </div>
              )}
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
                <div className="mt-4 flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {getTimeAgo(article.published_at)}
                  </div>
                  <span>• {article.source}</span>
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
