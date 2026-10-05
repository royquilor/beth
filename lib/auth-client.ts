import { mapAuthCode } from "@/lib/auth-error"
import { page } from "@/lib/catalog"
import { createClient } from "@/lib/supabase/client"

export type Provider = "github" | "google"

function callbackUrl() {
  return `${window.location.origin}/auth/callback`
}

/** A mapped sentence, or null when the call can continue. */
function failure(code: string | null | undefined) {
  return mapAuthCode(code ?? null) ?? page.authFailed
}

export async function startProvider(provider: Provider) {
  const supabase = createClient()
  const { error } = await supabase.auth.signInWithOAuth({
    provider,
    options: { redirectTo: callbackUrl() },
  })

  return error ? failure(error.code) : null
}

export async function resendSignup(email: string) {
  const supabase = createClient()
  const { error } = await supabase.auth.resend({
    type: "signup",
    email,
    options: { emailRedirectTo: callbackUrl() },
  })

  return error ? failure(error.code) : page.confirmSent
}

export async function sendReset(email: string) {
  const supabase = createClient()
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${callbackUrl()}?type=recovery`,
  })

  return error ? failure(error.code) : page.resetSent
}

export async function saveNewPassword(password: string) {
  const supabase = createClient()
  const { error } = await supabase.auth.updateUser({ password })

  return error ? failure(error.code) : null
}

export async function createAccount(email: string, password: string) {
  const supabase = createClient()
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: { emailRedirectTo: callbackUrl() },
  })

  if (error) {
    return { message: failure(error.code), confirm: false }
  }

  // Confirm email is on. An empty identities list means this email already exists.
  // Auth does not say which provider, so the sentence does not guess.
  if ((data.user?.identities?.length ?? 0) === 0) {
    return { message: page.alreadyAccount, confirm: false }
  }

  return { message: page.confirmSent, confirm: true }
}

export async function signInWithEmail(email: string, password: string) {
  const supabase = createClient()
  const { error } = await supabase.auth.signInWithPassword({ email, password })

  if (error) {
    return {
      message: failure(error.code),
      confirm: error.code === "email_not_confirmed",
      ok: false,
    }
  }

  return { message: null, confirm: false, ok: true }
}
