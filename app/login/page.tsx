import { redirect } from "next/navigation"

import { LoginForm } from "@/components/login-form"
import { authPlayEnabled } from "@/lib/auth-play"
import { mapAuthCode } from "@/lib/auth-error"
import { bethEnv } from "@/lib/beth-env"
import { sessionClaims } from "@/lib/session"

type Search = Record<string, string | string[] | undefined>

function first(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value
}

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<Search>
}) {
  const params = await searchParams
  const play = authPlayEnabled(first(params.play) ?? null)
  // Play renders the column with no session and no letter, so a signed-in visit can stay.
  if (!bethEnv() && !play) redirect("/")

  const recovery = first(params.recovery) === "1"
  const claims = await sessionClaims()

  if (claims && !recovery && !play) redirect("/app")

  const error = first(params.error) ?? null

  return (
    <LoginForm
      account={first(params.account) === "1"}
      recovery={recovery}
        notice={mapAuthCode(error)}
        confirm={error === "email_not_confirmed"}
        play={play}
      />
  )
}
