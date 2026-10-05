import { parseAnswers } from "@/lib/place"
import { createClient } from "@/lib/supabase/client"

/**
 * Writes the six answers for the signed-in person, then the caller routes.
 * The primary key is user_id. Row security rejects any other id.
 */
export async function saveLock(params: URLSearchParams) {
  const answers = parseAnswers({
    hands: params.get("hands") ?? undefined,
    ships: params.get("ships") ?? undefined,
    show: params.get("show") ?? undefined,
    seat: params.get("seat") ?? undefined,
    origin: params.get("origin") ?? undefined,
    prong: params.getAll("prong"),
  })

  if (!answers) return false

  const supabase = createClient()
  const { data, error } = await supabase.auth.getClaims()
  const userId = data?.claims?.sub

  if (error || !userId) return false

  const saved = await supabase.from("answers").upsert({
    user_id: userId,
    hands: answers.hands,
    ships: answers.ships,
    show: answers.show,
    seat: answers.seat,
    origin: answers.origin,
    prong: answers.prong,
  })

  return !saved.error
}
