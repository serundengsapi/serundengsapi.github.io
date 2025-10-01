import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { createClient } from "@/lib/supabase/server"
import { notFound } from "next/navigation"
import { NewsDetailContent } from "@/components/news-detail-content"

export const revalidate = 60

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function NewsDetailPage({ params }: PageProps) {
  const { id } = await params
  const supabase = await createClient()

  // Fetch news article
  const { data: article, error } = await supabase.from("news").select("*").eq("id", id).single()

  if (error || !article) {
    notFound()
  }

  // Fetch comments count
  const { count: commentsCount } = await supabase
    .from("comments")
    .select("*", { count: "exact", head: true })
    .eq("news_id", id)

  // Fetch votes count
  const { data: votesData } = await supabase.from("votes").select("vote_type").eq("news_id", id)

  const upvotes = votesData?.filter((v) => v.vote_type === "up").length || 0
  const downvotes = votesData?.filter((v) => v.vote_type === "down").length || 0

  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="pt-24 pb-20">
        <NewsDetailContent
          article={article}
          initialCommentsCount={commentsCount || 0}
          initialUpvotes={upvotes}
          initialDownvotes={downvotes}
        />
      </main>
      <Footer />
    </div>
  )
}
