"use client"

import { useRef, useState } from "react"
import { useRouter } from "next/navigation"

import { AuthForm } from "@/components/auth-form"
import { type Pending, type Provider } from "@/components/signup-form"
import {
  createAccount,
  saveNewPassword,
  sendReset,
  signInWithEmail,
  startProvider,
} from "@/lib/auth-client"
import { playProviderStep, playStep, waitForPlayBeat, type PlayStep } from "@/lib/auth-play"
import { page } from "@/lib/catalog"

type Mode = "sign-in" | "create" | "forgot" | "recovery"

/** Sign in and create account. GitHub, then Google, then email and password. */
export function LoginForm({
  account = false,
  recovery = false,
  notice = null,
  confirm = false,
  play = false,
}: {
  account?: boolean
  recovery?: boolean
  notice?: string | null
  confirm?: boolean
  play?: boolean
}) {
  const router = useRouter()
  const [mode, setMode] = useState<Mode>(
    recovery ? "recovery" : account ? "create" : "sign-in"
  )
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [message, setMessage] = useState<string | null>(
    notice ?? (confirm ? page.confirmSent : null)
  )
  const [note, setNote] = useState<string | null>(null)
  const [pending, setPending] = useState<Pending>(null)
  // The click handler can run twice before React stores pending.
  const busy = useRef(false)
  // The confirm sentence and the reset sentence are the next step.
  // A real failure is the only message that marks the fields.
  const invalid =
    Boolean(message) && message !== page.confirmSent && message !== page.resetSent

  function clear(next: Mode) {
    setMode(next)
    setMessage(null)
    setNote(null)
  }

  function show(step: PlayStep) {
    if (step.kind === "message") setMessage(step.message)
    else setNote(step.note)
  }

  function enterApp() {
    router.push("/app")
    router.refresh()
  }

  function release() {
    busy.current = false
    setPending(null)
  }

  async function onProvider(provider: Provider) {
    if (busy.current) return

    busy.current = true
    setPending(provider)
    setMessage(null)
    setNote(null)

    if (play) {
      try {
        await waitForPlayBeat()
        show(playProviderStep(provider, email))
      } finally {
        release()
      }
      return
    }

    try {
      const next = await startProvider(provider)
      if (!next) return

      setMessage(next)
      release()
    } catch {
      setMessage(page.authFailed)
      release()
    }
  }

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (busy.current) return

    busy.current = true
    setPending("submit")
    setMessage(null)
    setNote(null)
    let hold = false

    if (play) {
      try {
        await waitForPlayBeat()
        show(playStep(mode, email))
      } finally {
        release()
      }
      return
    }

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

        hold = true
        enterApp()
        return
      }

      if (mode === "create") {
        const result = await createAccount(email, password)
        setMessage(result.message)
        return
      }

      const result = await signInWithEmail(email, password)
      if (!result.ok) {
        setMessage(result.message)
        return
      }

      hold = true
      enterApp()
    } catch {
      setMessage(page.authFailed)
    } finally {
      // A redirect keeps the spinner up until the next page replaces this one.
      if (!hold) release()
    }
  }

  return (
    <AuthForm
      mode={mode}
      email={email}
      password={password}
      message={message}
      note={note}
      play={play}
      invalid={invalid}
      pending={pending}
      onEmail={setEmail}
      onPassword={setPassword}
      onSubmit={onSubmit}
      onProvider={onProvider}
      onForgot={() => clear("forgot")}
      onSwitch={() => clear("sign-in")}
    />
  )
}
