"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

import { Button, buttonVariants } from "@/components/ui/button"
import { page, questions } from "@/lib/catalog"
import { cn } from "cn"

/**
 * Six closed questions. Skip is a real mode.
 * Answers stay in the URL for the session. Nothing is stored.
 */
export function Questions() {
  const router = useRouter()
  const [step, setStep] = useState(0)
  const [draft, setDraft] = useState<Record<string, string>>({})
  const question = questions[step]
  const selected = draft[question.id]
  const last = step === questions.length - 1

  function choose(value: string) {
    setDraft((current) => ({ ...current, [question.id]: value }))
  }

  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!selected) {
      return
    }

    if (!last) {
      setStep((current) => current + 1)
      return
    }

    const params = new URLSearchParams()

    for (const item of questions) {
      const value = item.id === question.id ? selected : draft[item.id]

      if (!value) {
        return
      }

      params.set(item.id, value)
    }

    router.push(`/?${params.toString()}`)
  }

  return (
    <form onSubmit={submit} className="flex flex-col gap-6">
      <fieldset className="flex flex-col gap-6">
        <legend className="flex flex-col gap-2">
          <span className="text-sm leading-5 text-muted-foreground">
            {step + 1} of {questions.length}
          </span>
          <span className="text-base">{question.prompt}</span>
        </legend>
        <div className="flex flex-col gap-2" role="presentation">
          {question.options.map((option) => {
            const checked = selected === option.value

            return (
              <label
                key={option.value}
                onClick={() => choose(option.value)}
                className={cn(
                  "flex w-full cursor-pointer items-center rounded-lg border bg-background px-3 py-2 text-base leading-5",
                  checked ? "border-foreground" : "border-border",
                  "has-[:focus-visible]:border-ring has-[:focus-visible]:ring-3 has-[:focus-visible]:ring-ring/50"
                )}
              >
                <input
                  type="radio"
                  name={question.id}
                  value={option.value}
                  checked={checked}
                  onChange={() => choose(option.value)}
                  className="sr-only"
                />
                {option.label}
              </label>
            )
          })}
        </div>
      </fieldset>
      <div className="flex flex-wrap items-center gap-2">
        {step > 0 ? (
          <Button
            type="button"
            variant="outline"
            className="shadow-sm"
            onClick={() => setStep((current) => current - 1)}
          >
            {page.back}
          </Button>
        ) : null}
        <Button type="submit" disabled={!selected}>
          {last ? page.lock : page.next}
        </Button>
        <a
          href="/?skip=1"
          className={buttonVariants({
            variant: "outline",
            className: "shadow-sm",
          })}
        >
          {page.skip}
        </a>
      </div>
    </form>
  )
}
