"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

import {
  EmailField,
  Notice,
  PasswordField,
  ProviderButtons,
  SignupForm,
} from "@/components/signup-form"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Field, FieldDescription, FieldGroup } from "@/components/ui/field"
import {
  createAccount,
  resendSignup,
  saveNewPassword,
  sendReset,
  signInWithEmail,
  startProvider,
  type Provider,
} from "@/lib/auth-client"
import { page } from "@/lib/catalog"

type Mode = "sign-in" | "create" | "forgot" | "recovery"

/** Sign in and create account. GitHub, then Google, then email and password. */
export function LoginForm({
  account = false,
  recovery = false,
  notice = null,
  confirm = false,
}: {
  account?: boolean
  recovery?: boolean
  notice?: string | null
  confirm?: boolean
}) {
  const router = useRouter()
  const [mode, setMode] = useState<Mode>(
    recovery ? "recovery" : account ? "create" : "sign-in"
  )
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [message, setMessage] = useState<string | null>(notice)
  const [showConfirm, setShowConfirm] = useState(confirm)
  const [pending, setPending] = useState(false)
  // The confirm sentence and the reset sentence are the next step.
  // A real failure is the only message that marks the fields.
  const invalid =
    Boolean(message) && message !== page.confirmSent && message !== page.resetSent

  function clear(next: Mode) {
    setMode(next)
    setMessage(null)
    setShowConfirm(false)
  }

  function enterApp() {
    router.push("/app")
    router.refresh()
  }

  async function onProvider(provider: Provider) {
    setPending(true)
    setMessage(null)
    try {
      const next = await startProvider(provider)
      if (next) setMessage(next)
    } finally {
      setPending(false)
    }
  }

  async function onResend() {
    setPending(true)
    setMessage(await resendSignup(email))
    setShowConfirm(true)
    setPending(false)
  }

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setPending(true)
    setMessage(null)

    try {
      if (mode === "forgot") {
        setMessage(await sendReset(email))
        return
      }

      if (mode === "recovery") {
        const next = await saveNewPassword(password)
        if (next) {
          setMessage(next)
          return
        }
        enterApp()
        return
      }

      if (mode === "create") {
        const result = await createAccount(email, password)
        setMessage(result.message)
        setShowConfirm(result.confirm)
        return
      }

      const result = await signInWithEmail(email, password)
      if (!result.ok) {
        setMessage(result.message)
        setShowConfirm(result.confirm)
        return
      }

      enterApp()
    } finally {
      setPending(false)
    }
  }

  if (mode === "create") {
    return (
      <SignupForm
        email={email}
        password={password}
        message={message}
        pending={pending}
        confirm={showConfirm}
        invalid={invalid}
        onEmail={setEmail}
        onPassword={setPassword}
        onSubmit={onSubmit}
        onProvider={onProvider}
        onSwitch={() => clear("sign-in")}
        onResend={onResend}
      />
    )
  }

  const title = mode === "sign-in" ? page.signIn : page.forgot
  const submit =
    mode === "forgot" ? page.forgot : mode === "recovery" ? page.setPassword : page.signIn

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={onSubmit}>
          <FieldGroup>
            {mode === "sign-in" ? (
              <ProviderButtons pending={pending} onProvider={onProvider} />
            ) : null}
            <EmailField
              email={email}
              invalid={invalid}
              onEmail={setEmail}
              disabled={mode === "recovery"}
            />
            {mode === "forgot" ? null : (
              <PasswordField
                password={password}
                invalid={invalid}
                autoComplete={mode === "recovery" ? "new-password" : "current-password"}
                onPassword={setPassword}
                forgot={
                  mode === "sign-in" ? (
                    <Button
                      type="button"
                      variant="link"
                      className="ml-auto h-auto px-0"
                      onClick={() => clear("forgot")}
                    >
                      {page.forgot}
                    </Button>
                  ) : null
                }
              />
            )}
            <Notice
              message={message}
              confirm={showConfirm}
              invalid={invalid}
              pending={pending}
              email={email}
              onResend={onResend}
            />
            <Field>
              <Button type="submit" disabled={pending}>
                {submit}
              </Button>
              <FieldDescription className="text-center">
                <Button
                  type="button"
                  variant="link"
                  className="h-auto px-0"
                  onClick={() => clear(mode === "sign-in" ? "create" : "sign-in")}
                >
                  {mode === "sign-in" ? page.needAccount : page.haveAccount}
                </Button>
              </FieldDescription>
            </Field>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  )
}
