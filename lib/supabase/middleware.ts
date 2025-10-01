import { createServerClient } from "@supabase/ssr"
import { NextResponse, type NextRequest } from "next/server"

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) => supabaseResponse.cookies.set(name, value, options))
        },
      },
    },
  )

  const {
    data: { user },
  } = await supabase.auth.getUser()

  // Allow access to auth pages and public pages
  const isAuthPage = request.nextUrl.pathname.startsWith("/auth")
  const isPublicPage = ["/", "/news", "/tracker", "/learn", "/analyzer"].includes(request.nextUrl.pathname)

  // Don't redirect if on auth pages or public pages
  if (isAuthPage || isPublicPage) {
    return supabaseResponse
  }

  return supabaseResponse
}
