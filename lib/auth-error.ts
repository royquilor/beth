import { page } from "@/lib/catalog"

/**
 * Provider errors become a sentence from the catalogue.
 * The raw message stays off the page.
 * Auth hides which provider an existing email used, unless the code names it.
 */
const named = {
  github: page.alreadyGitHub,
  google: page.alreadyGoogle,
  email: page.alreadyEmail,
} as const

const codes = new Set([
  "invalid_credentials",
  "email_not_confirmed",
  "weak_password",
  "over_request_rate_limit",
  "over_email_send_rate_limit",
  "email_exists",
  "user_already_exists",
  "identity_already_exists",
  "email_conflict_identity_not_deletable",
  "failed",
])

export function safeAuthCode(code: string | null) {
  if (code && codes.has(code)) return code

  return "failed"
}

export function sentenceForProvider(provider: string | null) {
  if (provider === "github" || provider === "google" || provider === "email") {
    return named[provider]
  }

  return page.alreadyAccount
}

export function mapAuthCode(code: string | null) {
  if (!code) return null

  if (
    code === "email_exists" ||
    code === "user_already_exists" ||
    code === "identity_already_exists" ||
    code === "email_conflict_identity_not_deletable"
  ) {
    return page.alreadyAccount
  }

  if (code === "invalid_credentials") return page.credentials
  if (code === "email_not_confirmed") return page.confirmSent
  if (code === "weak_password") return page.weak
  if (code === "over_request_rate_limit" || code === "over_email_send_rate_limit") {
    return page.rate
  }

  return page.authFailed
}
