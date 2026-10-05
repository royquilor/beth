"use server"

import { redirect } from "next/navigation"

import { bethEnv } from "@/lib/beth-env"
import { pathAfterSignOut } from "@/lib/sign-out-path"
import { createClient } from "@/lib/supabase/server"

/**
 * Ends the session.
 * A lock in the URL is this person's result, so that page returns to the questions.
 * Companies and Skip stay. /app returns to /login.
 */
export async function signOut(formData: FormData) {
  if (bethEnv()) {
    const supabase = await createClient()
    await supabase.auth.signOut()
  }

  redirect(pathAfterSignOut(String(formData.get("next") ?? "/")))
}
