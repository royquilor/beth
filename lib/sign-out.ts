"use server"

import { redirect } from "next/navigation"

import { bethEnv } from "@/lib/beth-env"
import { createClient } from "@/lib/supabase/server"

/**
 * Ends the session and stays on the public URL.
 * /app needs a session, so sign-out from there returns to /login.
 */
export async function signOut(formData: FormData) {
  if (bethEnv()) {
    const supabase = await createClient()
    await supabase.auth.signOut()
  }

  const next = String(formData.get("next") ?? "/")
  const path = next.startsWith("/") && !next.startsWith("//") ? next : "/"

  if (path === "/app" || path.startsWith("/app/") || path.startsWith("/app?")) {
    redirect("/login")
  }

  redirect(path)
}
