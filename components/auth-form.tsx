"use client"

import { AuthPlayNote } from "@/components/auth-play-note"
import {
  AccountFooter,
  AuthScreen,
  FormNote,
  TermsLine,
} from "@/components/auth-screen"
import {
  EmailField,
  PasswordField,
  ProviderButtons,
  type Pending,
  type Provider,
} from "@/components/signup-form"
import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"
import { page } from "@/lib/catalog"

type Mode = "sign-in" | "create" | "forgot" | "recovery"

/** The four frames, plus forgot and the new-password step, in one column. */
export function AuthForm({
  mode,
  email,
  password,
  message,
  note = null,
  play = false,
  invalid,
  pending,
  onEmail,
  onPassword,
  onSubmit,
  onProvider,
  onForgot,
  onSwitch,
}: {
  mode: Mode
  email: string
  password: string
  message: string | null
  note?: string | null
  play?: boolean
  invalid: boolean
  pending: Pending
  onEmail: (value: string) => void
  onPassword: (value: string) => void
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void
  onProvider: (provider: Provider) => void
  onForgot: () => void
  onSwitch: () => void
}) {
  // On the confirmation screen the form is gone, so Log in is the way back to the column.
  const aside = play ? (
    <AuthPlayNote onBack={message === page.confirmSent ? onSwitch : undefined} />
  ) : null

  if (message === page.confirmSent) {
    return (
      <AuthScreen aside={aside}>
        <div role="status" className="flex w-full flex-col items-center gap-1 text-center">
          <h2 className="text-base font-semibold text-balance">{page.confirmSent}</h2>
          {email ? (
            <p className="text-base text-pretty break-all text-muted-foreground">{email}</p>
          ) : null}
        </div>
      </AuthScreen>
    )
  }

  const title =
    mode === "create"
      ? page.createTitle
      : mode === "sign-in"
        ? page.welcome
        : mode === "recovery"
          ? page.setPassword
          : page.forgot
  const submitLabel =
    mode === "forgot"
      ? page.forgot
      : mode === "recovery"
        ? page.setPassword
        : mode === "create"
          ? page.createAccount
          : page.signIn
  const submitBusy = pending === "submit"
  const canSubmit =
    mode === "forgot"
      ? email.length > 0
      : mode === "recovery"
        ? password.length > 0
        : email.length > 0 && password.length > 0
  const showProviders = mode === "sign-in" || mode === "create"

  return (
    <AuthScreen
      aside={aside}
      footer={
        mode === "sign-in" || mode === "recovery" ? null : (
          <AccountFooter onSwitch={onSwitch} />
        )
      }
    >
      <section className="flex w-full flex-col items-center gap-4">
        <h2 className="text-center text-base font-semibold text-pretty">{title}</h2>
        <form className="flex w-full flex-col gap-4 p-4" onSubmit={onSubmit}>
          {showProviders ? (
            <>
              <ProviderButtons pending={pending} onProvider={onProvider} />
              <p className="text-center text-sm">{page.or}</p>
            </>
          ) : null}
          {mode === "recovery" ? null : (
            <EmailField
              email={email}
              invalid={invalid}
              onEmail={onEmail}
              autoFocus={mode === "sign-in" || mode === "create"}
            />
          )}
          {mode === "forgot" ? null : (
            <PasswordField
              password={password}
              invalid={invalid}
              autoComplete={mode === "sign-in" ? "current-password" : "new-password"}
              onPassword={onPassword}
              forgot={
                mode === "sign-in" ? (
                  <Button
                    type="button"
                    variant="link"
                    className="ml-auto h-auto px-0 text-sm font-medium text-muted-foreground"
                    onClick={onForgot}
                  >
                    {page.forgotShort}
                  </Button>
                ) : null
              }
            />
          )}
          <FormNote message={message} invalid={invalid} />
          {note ? (
            <p role="status" className="text-center text-sm text-pretty text-muted-foreground">
              {note}
            </p>
          ) : null}
          <Button
            type="submit"
            className="w-full"
            size="lg"
            disabled={!canSubmit || (pending !== null && !submitBusy)}
            aria-busy={submitBusy || undefined}
          >
            {submitBusy ? <Spinner aria-hidden /> : null}
            {submitBusy && mode === "create" ? page.creating : submitLabel}
          </Button>
          {showProviders ? <TermsLine /> : null}
        </form>
      </section>
    </AuthScreen>
  )
}
