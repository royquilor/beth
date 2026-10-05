"use client"

"use client"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { page } from "@/lib/catalog"

type Provider = "github" | "google"

/**
 * Create account, from the signup block.
 * The same two fields as sign-in. No name, no second password, no strength meter.
 */
export function SignupForm({
  email,
  password,
  message,
  pending,
  confirm,
  onEmail,
  onPassword,
  onSubmit,
  onProvider,
  onSwitch,
  onResend,
}: {
  email: string
  password: string
  message: string | null
  pending: boolean
  confirm: boolean
  onEmail: (value: string) => void
  onPassword: (value: string) => void
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void
  onProvider: (provider: Provider) => void
  onSwitch: () => void
  onResend: () => void
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{page.createAccount}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={onSubmit}>
          <FieldGroup>
            <ProviderButtons pending={pending} onProvider={onProvider} />
            <EmailField email={email} message={message} onEmail={onEmail} />
            <PasswordField
              password={password}
              message={message}
              autoComplete="new-password"
              onPassword={onPassword}
            />
            <Notice message={message} confirm={confirm} pending={pending} email={email} onResend={onResend} />
            <Field>
              <Button type="submit" disabled={pending}>
                {page.createAccount}
              </Button>
              <FieldDescription className="text-center">
                <Button type="button" variant="link" className="h-auto px-0" onClick={onSwitch}>
                  {page.haveAccount}
                </Button>
              </FieldDescription>
            </Field>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  )
}

export function ProviderButtons({
  pending,
  onProvider,
}: {
  pending: boolean
  onProvider: (provider: Provider) => void
}) {
  return (
    <Field>
      <Button type="button" variant="outline" disabled={pending} onClick={() => onProvider("github")}>
        {page.continueGitHub}
      </Button>
      <Button type="button" variant="outline" disabled={pending} onClick={() => onProvider("google")}>
        {page.continueGoogle}
      </Button>
    </Field>
  )
}

export function EmailField({
  email,
  message,
  onEmail,
  disabled = false,
}: {
  email: string
  message: string | null
  onEmail: (value: string) => void
  disabled?: boolean
}) {
  return (
    <Field data-invalid={message ? true : undefined}>
      <FieldLabel htmlFor="email">{page.email}</FieldLabel>
      <Input
        id="email"
        type="email"
        autoComplete="email"
        required
        disabled={disabled}
        value={email}
        aria-invalid={Boolean(message)}
        onChange={(event) => onEmail(event.target.value)}
      />
    </Field>
  )
}

export function PasswordField({
  password,
  message,
  autoComplete,
  onPassword,
  forgot,
}: {
  password: string
  message: string | null
  autoComplete: "current-password" | "new-password"
  onPassword: (value: string) => void
  forgot?: React.ReactNode
}) {
  return (
    <Field data-invalid={message ? true : undefined}>
      <div className="flex items-center">
        <FieldLabel htmlFor="password">{page.password}</FieldLabel>
        {forgot}
      </div>
      <Input
        id="password"
        type="password"
        autoComplete={autoComplete}
        required
        value={password}
        aria-invalid={Boolean(message)}
        onChange={(event) => onPassword(event.target.value)}
      />
    </Field>
  )
}

export function Notice({
  message,
  confirm,
  pending,
  email,
  onResend,
}: {
  message: string | null
  confirm: boolean
  pending: boolean
  email: string
  onResend: () => void
}) {
  if (!message && !confirm) return null

  return (
    <Field data-invalid={message ? true : undefined}>
      {message ? <FieldError>{message}</FieldError> : null}
      {confirm ? (
        <Button type="button" variant="outline" disabled={pending || !email} onClick={onResend}>
          {page.resend}
        </Button>
      ) : null}
    </Field>
  )
}
