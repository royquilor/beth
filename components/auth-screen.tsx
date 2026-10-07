"use client"

import { Mark } from "@/components/mark"
import { Button } from "@/components/ui/button"
import { FieldError } from "@/components/ui/field"
import { page } from "@/lib/catalog"

/**
 * The auth column from the frames.
 * The mark sits at the top. The form sits in the middle. The switch sits at the bottom.
 */
export function AuthScreen({
  children,
  footer,
}: {
  children: React.ReactNode
  footer?: React.ReactNode
}) {
  return (
    <div className="flex min-h-svh flex-col items-center">
      <div className="flex w-full max-w-sm flex-1 flex-col gap-10 p-6">
        <header className="flex h-8 items-center justify-center">
          <h1 className="sr-only">{page.title}</h1>
          <Mark />
        </header>
        <div className="flex flex-1 flex-col items-center justify-center">{children}</div>
        {footer ? <footer className="flex justify-center">{footer}</footer> : null}
      </div>
    </div>
  )
}

/** The line under the entry buttons. There is no terms page yet, so the words stay text. */
export function TermsLine() {
  return (
    <p className="text-center text-xs leading-6 text-pretty text-muted-foreground">
      {page.termsLead} <span className="text-foreground underline">{page.terms}</span>
    </p>
  )
}

export function AccountFooter({ onSwitch }: { onSwitch: () => void }) {
  return (
    <p className="text-center text-xs leading-6 text-muted-foreground">
      {page.haveAccount}{" "}
      <Button
        type="button"
        variant="link"
        className="h-auto px-0 text-xs text-foreground underline"
        onClick={onSwitch}
      >
        {page.logIn}
      </Button>
    </p>
  )
}

export function FormNote({
  message,
  invalid,
}: {
  message: string | null
  invalid: boolean
}) {
  if (!message) return null

  if (invalid) {
    return <FieldError className="text-center">{message}</FieldError>
  }

  // A reset note is the next step, not a failed field.
  return (
    <p role="status" className="text-center text-sm text-muted-foreground">
      {message}
    </p>
  )
}
