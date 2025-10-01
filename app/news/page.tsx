import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { NewsFeed } from "@/components/news-feed"
import { createClient } from "@/lib/supabase/server"

export const revalidate = 300 // Revalidate every 5 minutes

export default async function NewsPage() {
  const supabase = await createClient()

  const { data: news, error } = await supabase
    .from("news")
    .select("*")
    .order("published_at", { ascending: false })
    .limit(50)

  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-6xl">
            <div className="mb-8">
              <h1 className="font-heading text-4xl font-bold md:text-5xl">Crypto News Feed</h1>
              <p className="mt-4 text-lg text-muted-foreground">
                Stay updated with the latest cryptocurrency news from trusted sources worldwide.
              </p>
            </div>
            <NewsFeed initialNews={news || []} />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
