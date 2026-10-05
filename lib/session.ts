import { bethEnv } from "@/lib/beth-env"
import { createClient } from "@/lib/supabase/server"

/** Claims from a checked JWT. A stranger, or a missing env file, is null. */
export async function sessionClaims() {
  if (!bethEnv()) return null

  try {
    const supabase = await createClient()
    const { data, error } = await supabase.auth.getClaims()

    if (error || !data?.claims?.sub) return null

    return data.claims
  } catch {
    return null
  }
}
