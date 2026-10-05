import { createBrowserClient } from "@supabase/ssr"

import { bethEnv } from "@/lib/beth-env"

/**
 * Browser client for the sheet's signed-in submit and the login form.
 * createBrowserClient keeps one instance. The lists stay on the server client.
 */
export function createClient() {
  // Next inlines each NEXT_PUBLIC_ name. Passing process.env as a whole
  // object leaves both values empty in the browser.
  const env = bethEnv({
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY:
      process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
  })

  if (!env) {
    throw new Error(
      "Beth needs both NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY."
    )
  }

  return createBrowserClient(env.url, env.key)
}
