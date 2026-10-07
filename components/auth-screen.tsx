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
  aside,
}: {
  children: React.ReactNode
  footer?: React.ReactNode
  aside?: React.ReactNode
}) {
  return (
    <div className="flex min-h-svh flex-col items-center">
      <div className="flex w-full max-w-sm flex-1 flex-col gap-10 p-6">
        <header className="flex h-8 items-center justify-center">
          <h1 className="sr-only">{page.title}</h1>
          <Mark />
        </header>
        <div className="flex flex-1 flex-col items-center justify-center">{children}</div>
        {footer || aside ? (
          <div className="flex flex-col items-center gap-4">
            {footer ? <footer className="flex justify-center">{footer}</footer> : null}
            {aside}
          </div>
        ) : null}
      </div>
    </div>
  )
}

/** The line under the entry buttons. There is no terms page yet, so the words stay text. */
export function TermsLine() {
  return (
    <p className="text-center text-xs leading-6 text-pretty text-muted-foreground">
      {page.termsLead} <span className="text-foreground">{page.terms}</span>
    </p>
  )
}

export function AccountFooter({ onSwitch }: { onSwitch: () => void }) {
  return (
    <p className="text-center text-xs leading-6 text-pretty text-muted-foreground">
      {page.haveAccount}{" "}
      <Button
        type="button"
        variant="link"
        className="h-auto px-0 text-xs text-foreground no-underline hover:no-underline"
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
    return <FieldError className="text-center text-pretty">{message}</FieldError>
  }

  // A reset note is the next step, not a failed field.
  return (
    <p role="status" className="text-center text-sm text-pretty text-muted-foreground">
      {message}
    </p>
  )
}
