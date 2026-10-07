"use client"

import { GitHubMark, GoogleMark } from "@/components/provider-marks"
import { Button } from "@/components/ui/button"
import { Field, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Spinner } from "@/components/ui/spinner"
import { page } from "@/lib/catalog"

export type Provider = "github" | "google"

/** Which control is in flight. Null means the form is idle. */
export type Pending = Provider | "submit" | null

export function ProviderButtons({
  pending,
  onProvider,
}: {
  pending: Pending
  onProvider: (provider: Provider) => void
}) {
  return (
    <div className="flex w-full gap-2">
      <ProviderButton
        provider="github"
        label={page.continueGitHub}
        pending={pending}
        onProvider={onProvider}
      >
        <GitHubMark />
      </ProviderButton>
      <ProviderButton
        provider="google"
        label={page.continueGoogle}
        pending={pending}
        onProvider={onProvider}
      >
        <GoogleMark />
      </ProviderButton>
    </div>
  )
}

function ProviderButton({
  provider,
  label,
  pending,
  onProvider,
  children,
}: {
  provider: Provider
  label: string
  pending: Pending
  onProvider: (provider: Provider) => void
  children: React.ReactNode
}) {
  const busy = pending === provider
  // The clicked button keeps its colour and shows the spinner.
  // The other controls wait, so a second request does not start.
  const waiting = pending !== null && !busy

  return (
    <Button
      type="button"
      variant="secondary"
      className="flex-1"
      disabled={waiting}
      aria-busy={busy || undefined}
      aria-label={label}
      size="icon-lg"
      onClick={() => onProvider(provider)}
    >
      {busy ? <Spinner aria-hidden /> : children}
    </Button>
  )
}

export function EmailField({
  email,
  invalid,
  onEmail,
  disabled = false,
  autoFocus = false,
}: {
  email: string
  invalid: boolean
  onEmail: (value: string) => void
  disabled?: boolean
  autoFocus?: boolean
}) {
  return (
    <Field className="gap-1" data-invalid={invalid ? true : undefined}>
      <FieldLabel htmlFor="email">{page.email}</FieldLabel>
      <Input
        id="email"
        type="email"
        autoComplete="email"
        placeholder={page.emailAddress}
        required
        disabled={disabled}
        autoFocus={autoFocus}
        value={email}
        aria-invalid={invalid ? true : undefined}
        onChange={(event) => onEmail(event.target.value)}
      />
    </Field>
  )
}

export function PasswordField({
  password,
  invalid,
  autoComplete,
  onPassword,
  forgot,
}: {
  password: string
  invalid: boolean
  autoComplete: "current-password" | "new-password"
  onPassword: (value: string) => void
  forgot?: React.ReactNode
}) {
  return (
    <Field className="gap-1" data-invalid={invalid ? true : undefined}>
      <div className="flex w-full items-center">
        <FieldLabel htmlFor="password">{page.password}</FieldLabel>
        {forgot}
      </div>
      <Input
        id="password"
        type="password"
        autoComplete={autoComplete}
        placeholder={page.password}
        required
        value={password}
        aria-invalid={invalid ? true : undefined}
        onChange={(event) => onPassword(event.target.value)}
      />
    </Field>
  )
}
