import { page } from "@/lib/catalog"

export type AuthMode = "sign-in" | "create" | "forgot" | "recovery"

/** A catalogue sentence, or a line that stands in for leaving the column. */
export type PlayStep = { kind: "message"; message: string } | { kind: "note"; note: string }

// Long enough to see the spinner. The real request is not this fast.
const beatMs = 700

const named: Record<string, string> = {
  wrong: page.credentials,
  taken: page.alreadyAccount,
  weak: page.weak,
  wait: page.rate,
  fail: page.authFailed,
}

/** The flag is `play=1`, and only while `next dev` is running. */
export function authPlayEnabled(flag: string | null, nodeEnv = process.env.NODE_ENV) {
  return nodeEnv === "development" && flag === "1"
}

/** The word before @. `Wrong@Example.com` and `wrong` are the same word. */
export function playLocal(email: string) {
  return (email.split("@")[0] ?? "").trim().toLowerCase()
}

function namedStep(email: string): PlayStep | null {
  const message = named[playLocal(email)]

  return message ? { kind: "message", message } : null
}

/**
 * What a fake submit shows. Nothing is sent.
 * A known word before @ is that sentence. Anything else is the next step for this mode.
 */
export function playStep(mode: AuthMode, email: string): PlayStep {
  const special = namedStep(email)
  if (special) return special

  if (mode === "create") return { kind: "message", message: page.confirmSent }
  if (mode === "forgot") return { kind: "message", message: page.resetSent }

  // Sign-in and a new password would open /app. There is no session here.
  return { kind: "note", note: "This would open the questions." }
}

/** A provider click would leave for GitHub or Google. Play stays on the column. */
export function playProviderStep(provider: "github" | "google", email: string): PlayStep {
  const special = namedStep(email)
  if (special) return special

  const name = provider === "github" ? "GitHub" : "Google"

  return { kind: "note", note: `This would open ${name}.` }
}

export function waitForPlayBeat() {
  return new Promise((resolve) => setTimeout(resolve, beatMs))
}
