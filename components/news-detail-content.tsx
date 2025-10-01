"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Clock, ThumbsUp, ThumbsDown, MessageSquare, ExternalLink } from "lucide-react"
import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import { SocialShare } from "@/components/social-share"
import { CommentsSection } from "@/components/comments-section"

interface NewsArticle {
  id: string
  title: string
  description: string
  content: string
  url: string
  source: string
  author: string
  published_at: string
  category: string
  sentiment?: "positive" | "negative" | "neutral"
  image_url?: string
}

interface NewsDetailContentProps {
  article: NewsArticle
  initialCommentsCount: number
  initialUpvotes: number
  initialDownvotes: number
}

export function NewsDetailContent({
  article,
  initialCommentsCount,
  initialUpvotes,
  initialDownvotes,
}: NewsDetailContentProps) {
  const [user, setUser] = useState<any>(null)
  const [userVote, setUserVote] = useState<"up" | "down" | null>(null)
  const [upvotes, setUpvotes] = useState(initialUpvotes)
  const [downvotes, setDownvotes] = useState(initialDownvotes)
  const [commentsCount, setCommentsCount] = useState(initialCommentsCount)
  const [isVoting, setIsVoting] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    const checkUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      setUser(user)

      if (user) {
        // Check if user has voted
        const { data: vote } = await supabase
          .from("votes")
          .select("vote_type")
          .eq("news_id", article.id)
          .eq("user_id", user.id)
          .single()

        if (vote) {
          setUserVote(vote.vote_type as "up" | "down")
        }
      }
    }
    checkUser()
  }, [supabase, article.id])

  const handleVote = async (voteType: "up" | "down") => {
    if (!user) {
      router.push("/auth/login")
      return
    }

    setIsVoting(true)

    try {
      if (userVote === voteType) {
        // Remove vote
        await supabase.from("votes").delete().eq("news_id", article.id).eq("user_id", user.id)

        if (voteType === "up") {
          setUpvotes((prev) => prev - 1)
        } else {
          setDownvotes((prev) => prev - 1)
        }
        setUserVote(null)
      } else {
        // Add or update vote
        const { error } = await supabase.from("votes").upsert(
          {
            news_id: article.id,
            user_id: user.id,
            vote_type: voteType,
          },
          { onConflict: "news_id,user_id" },
        )

        if (error) throw error

        // Update counts
        if (userVote === "up" && voteType === "down") {
          setUpvotes((prev) => prev - 1)
          setDownvotes((prev) => prev + 1)
        } else if (userVote === "down" && voteType === "up") {
          setDownvotes((prev) => prev - 1)
          setUpvotes((prev) => prev + 1)
        } else if (voteType === "up") {
          setUpvotes((prev) => prev + 1)
        } else {
          setDownvotes((prev) => prev + 1)
        }

        setUserVote(voteType)
      }
    } catch (error) {
      console.error("Error voting:", error)
    } finally {
      setIsVoting(false)
    }
  }

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
    <div className="container mx-auto px-4">
      <div className="mx-auto max-w-4xl">
        <Card className="overflow-hidden border-primary/20">
          {/* Article Header */}
          {article.image_url && (
            <div className="relative h-96 w-full overflow-hidden">
              <img
                src={article.image_url || "/placeholder.svg"}
                alt={article.title}
                className="h-full w-full object-cover"
                onError={(e) => {
                  e.currentTarget.style.display = "none"
                }}
              />
            </div>
          )}

          <div className="p-8">
            {/* Meta Info */}
            <div className="mb-6 flex flex-wrap items-center gap-3">
              <Badge variant="outline" className={getSentimentColor(article.sentiment)}>
                {article.sentiment || "neutral"}
              </Badge>
              <Badge variant="outline">{article.category}</Badge>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="h-4 w-4" />
                {getTimeAgo(article.published_at)}
              </div>
              <span className="text-sm text-muted-foreground">• {article.source}</span>
              {article.author && <span className="text-sm text-muted-foreground">• By {article.author}</span>}
            </div>

            {/* Title */}
            <h1 className="font-heading text-3xl font-bold leading-tight md:text-4xl">{article.title}</h1>

            {/* Description */}
            <p className="mt-4 text-lg text-muted-foreground leading-relaxed">{article.description}</p>

            {/* Interaction Bar */}
            <div className="mt-8 flex flex-wrap items-center gap-4 border-y border-border/50 py-4">
              {/* Voting */}
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleVote("up")}
                  disabled={isVoting}
                  className={userVote === "up" ? "bg-green-500/10 text-green-500 border-green-500/50" : ""}
                >
                  <ThumbsUp className="h-4 w-4 mr-1" />
                  {upvotes}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleVote("down")}
                  disabled={isVoting}
                  className={userVote === "down" ? "bg-red-500/10 text-red-500 border-red-500/50" : ""}
                >
                  <ThumbsDown className="h-4 w-4 mr-1" />
                  {downvotes}
                </Button>
              </div>

              {/* Comments Count */}
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MessageSquare className="h-4 w-4" />
                <span>{commentsCount} comments</span>
              </div>

              {/* Social Share */}
              <SocialShare url={`${typeof window !== "undefined" ? window.location.href : ""}`} title={article.title} />

              {/* Original Source */}
              <Button variant="outline" size="sm" asChild className="ml-auto bg-transparent">
                <a href={article.url} target="_blank" rel="noopener noreferrer">
                  Original Source
                  <ExternalLink className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </div>

            {/* Article Content */}
            <div className="mt-8 prose prose-invert max-w-none">
              <div className="text-foreground leading-relaxed whitespace-pre-wrap">{article.content}</div>
            </div>
          </div>
        </Card>

        {/* Comments Section */}
        <div className="mt-8">
          <CommentsSection newsId={article.id} user={user} onCommentCountChange={setCommentsCount} />
        </div>
      </div>
    </div>
  )
}
