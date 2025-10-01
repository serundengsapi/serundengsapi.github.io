import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { EducationHub } from "@/components/education-hub"

export default function LearnPage() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-6xl">
            <div className="mb-8">
              <h1 className="font-heading text-4xl font-bold md:text-5xl">Educational Resources</h1>
              <p className="mt-4 text-lg text-muted-foreground">
                Comprehensive guides to help you master blockchain technology and cryptocurrency.
              </p>
            </div>
            <EducationHub />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
