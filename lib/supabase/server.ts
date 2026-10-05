import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"

import { bethEnv } from "@/lib/beth-env"

/**
 * One server client per request.
 * Cookie writes from a Server Component are ignored. Next.js 16 refreshes
 * a session in `proxy.ts`, and that file is the sign-in slice, not this one.
 */
export async function createClient() {
  const env = bethEnv()

  if (!env) {
    throw new Error(
      "Beth needs both NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY."
    )
  }

  const cookieStore = await cookies()

  return createServerClient(env.url, env.key, {
    cookies: {
      getAll() {
        return cookieStore.getAll()
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          )
        } catch {
          // A Server Component can read cookies. It cannot write them.
        }
      },
    },
  })
}
