import { answersFromRow, type AnswerRow } from "@/lib/answers"
import { bethEnv } from "@/lib/beth-env"
import { sessionClaims } from "@/lib/session"
import { createClient } from "@/lib/supabase/server"

/**
 * The signed-in person's lock.
 * A stranger does not run this query. anon has no grant on answers.
 * user_id and updated_at stay off the page.
 */
export async function loadSavedLock() {
  if (!bethEnv()) return null

  const claims = await sessionClaims()

  if (!claims?.sub) return null

  const supabase = await createClient()
  const row = await supabase
    .from("answers")
    .select("hands, ships, show, seat, origin, prong")
    .eq("user_id", claims.sub)
    .maybeSingle()

  if (row.error) {
    throw new Error(`Beth answers: ${row.error.message}`)
  }

  if (!row.data) return null

  return answersFromRow(row.data as AnswerRow)
}
