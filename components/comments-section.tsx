"use client"

import type React from "react"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import { MessageSquare, Send, Trash2 } from "lucide-react"

interface Comment {
  id: string
  content: string
  created_at: string
  user_id: string
  profiles: {
    display_name: string
    email: string
  }
}

interface CommentsSectionProps {
  newsId: string
  user: any
  onCommentCountChange: (count: number) => void
}

export function CommentsSection({ newsId, user, onCommentCountChange }: CommentsSectionProps) {
  const [comments, setComments] = useState<Comment[]>([])
  const [newComment, setNewComment] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    fetchComments()
  }, [newsId])

  const fetchComments = async () => {
    setIsLoading(true)
    const { data, error } = await supabase
      .from("comments")
      .select(
        `
        id,
        content,
        created_at,
        user_id,
        profiles (
          display_name,
          email
        )
      `,
      )
      .eq("news_id", newsId)
      .order("created_at", { ascending: false })

    if (!error && data) {
      setComments(data as any)
      onCommentCountChange(data.length)
    }
    setIsLoading(false)
  }

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!user) {
      router.push("/auth/login")
      return
    }

    if (!newComment.trim()) return

    setIsSubmitting(true)

    try {
      const { error } = await supabase.from("comments").insert({
        news_id: newsId,
        user_id: user.id,
        content: newComment.trim(),
      })

      if (error) throw error

      setNewComment("")
      await fetchComments()
    } catch (error) {
      console.error("Error posting comment:", error)
      alert("Failed to post comment. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDeleteComment = async (commentId: string) => {
    if (!confirm("Are you sure you want to delete this comment?")) return

    try {
      const { error } = await supabase.from("comments").delete().eq("id", commentId)

      if (error) throw error

      await fetchComments()
    } catch (error) {
      console.error("Error deleting comment:", error)
      alert("Failed to delete comment. Please try again.")
    }
  }

  const getTimeAgo = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60))

    if (diffInMinutes < 1) return "Just now"
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`
    const diffInHours = Math.floor(diffInMinutes / 60)
    if (diffInHours < 24) return `${diffInHours}h ago`
    const diffInDays = Math.floor(diffInHours / 24)
    return `${diffInDays}d ago`
  }

  return (
    <Card className="p-6 border-primary/20">
      <div className="flex items-center gap-2 mb-6">
        <MessageSquare className="h-5 w-5 text-primary" />
        <h2 className="font-heading text-2xl font-bold">Comments ({comments.length})</h2>
      </div>

      {/* Comment Form */}
      {user ? (
        <form onSubmit={handleSubmitComment} className="mb-8">
          <Textarea
            placeholder="Share your thoughts..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="min-h-[100px] bg-background/50"
            disabled={isSubmitting}
          />
          <Button
            type="submit"
            className="mt-3 bg-primary hover:bg-primary/90"
            disabled={isSubmitting || !newComment.trim()}
          >
            <Send className="h-4 w-4 mr-2" />
            {isSubmitting ? "Posting..." : "Post Comment"}
          </Button>
        </form>
      ) : (
        <Card className="p-6 mb-8 bg-muted/50 border-border/50">
          <p className="text-center text-muted-foreground">
            <Button variant="link" className="text-primary p-0" onClick={() => router.push("/auth/login")}>
              Sign in
            </Button>{" "}
            to join the conversation
          </p>
        </Card>
      )}

      {/* Comments List */}
      <div className="space-y-4">
        {isLoading ? (
          <p className="text-center text-muted-foreground py-8">Loading comments...</p>
        ) : comments.length === 0 ? (
          <p className="text-center text-muted-foreground py-8">No comments yet. Be the first to comment!</p>
        ) : (
          comments.map((comment) => (
            <Card key={comment.id} className="p-4 bg-background/50 border-border/50">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/20 text-primary font-semibold text-sm">
                      {comment.profiles?.display_name?.[0]?.toUpperCase() ||
                        comment.profiles?.email?.[0]?.toUpperCase() ||
                        "U"}
                    </div>
                    <div>
                      <p className="font-medium text-sm">
                        {comment.profiles?.display_name || comment.profiles?.email || "Anonymous"}
                      </p>
                      <p className="text-xs text-muted-foreground">{getTimeAgo(comment.created_at)}</p>
                    </div>
                  </div>
                  <p className="text-sm leading-relaxed whitespace-pre-wrap">{comment.content}</p>
                </div>
                {user && user.id === comment.user_id && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDeleteComment(comment.id)}
                    className="text-red-500 hover:text-red-600 hover:bg-red-500/10"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </Card>
          ))
        )}
      </div>
    </Card>
  )
}
