import { createServerClient } from "@supabase/ssr"
import { NextResponse, type NextRequest } from "next/server"

import { bethEnv } from "@/lib/beth-env"

/**
 * Refreshes a session that already exists and sends it back on the response.
 * An unauthenticated request to /app goes to /login.
 * /, skip, and companies stay open. A missing env file does not redirect.
 */
export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  })

  const env = bethEnv()

  if (!env) return supabaseResponse

  const supabase = createServerClient(env.url, env.key, {
    cookies: {
      getAll() {
        return request.cookies.getAll()
      },
      setAll(cookiesToSet, headers) {
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
        supabaseResponse = NextResponse.next({
          request,
        })
        cookiesToSet.forEach(({ name, value, options }) =>
          supabaseResponse.cookies.set(name, value, options)
        )
        Object.entries(headers).forEach(([key, value]) =>
          supabaseResponse.headers.set(key, value)
        )
      },
    },
  })

  // Do not run code between createServerClient and getClaims().
  // getClaims() checks the JWT. getSession() does not.
  const { data } = await supabase.auth.getClaims()
  const user = data?.claims
  const pathname = request.nextUrl.pathname
  const app = pathname === "/app" || pathname.startsWith("/app/")

  if (!user && app) {
    const url = request.nextUrl.clone()
    url.pathname = "/login"
    url.search = ""
    const redirect = NextResponse.redirect(url)
    supabaseResponse.cookies.getAll().forEach((cookie) => {
      redirect.cookies.set(cookie)
    })
    return redirect
  }

  return supabaseResponse
}
