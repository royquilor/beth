import { redirect } from "next/navigation"

import { safeAuthCode } from "@/lib/auth-error"
import { createClient } from "@/lib/supabase/server"

/**
 * Exchanges the provider code for a session.
 * Cookie writes work here. They do not work in a Server Component.
 * Success goes to /app. A failure, or an email that is not confirmed, goes to /login.
 */
export async function GET(request: Request) {
  const url = new URL(request.url)
  const code = url.searchParams.get("code")
  const type = url.searchParams.get("type")
  const authError = url.searchParams.get("error_code") ?? url.searchParams.get("error")

  if (authError) {
    redirect(`/login?error=${safeAuthCode(authError)}`)
  }

  if (!code) {
    redirect("/login?error=failed")
  }

  const supabase = await createClient()
  const { data, error } = await supabase.auth.exchangeCodeForSession(code)

  if (error) {
    redirect(`/login?error=${safeAuthCode(error.code ?? null)}`)
  }

  if (!data.user?.email_confirmed_at) {
    await supabase.auth.signOut()
    redirect("/login?error=email_not_confirmed")
  }

  if (type === "recovery") {
    redirect("/login?recovery=1")
  }

  redirect("/app")
}
