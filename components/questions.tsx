"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import type { QuestionnaireItemStatus } from "@shadcn/react/questionnaire"

import {
  Questionnaire,
  QuestionnaireActions,
  QuestionnaireChoice,
  QuestionnaireChoices,
  QuestionnaireDescription,
  QuestionnaireError,
  QuestionnaireItem,
  QuestionnaireNext,
  QuestionnairePrevious,
  QuestionnaireProgress,
  QuestionnaireSubmit,
  QuestionnaireTitle,
} from "@/components/ui/questionnaire"
import { page, questions } from "@/lib/catalog"
import { handsProof, showProof } from "@/lib/place"

type QuestionId = (typeof questions)[number]["id"]

// The component reads this list for progress and navigation.
// Each name is the query key parseAnswers expects.
const items = questions.map((question) => ({
  name: question.id,
  required: true,
  choices: question.options.map((option) => ({ value: option.value })),
}))

/**
 * Six closed questions, composed from the shadcn Questionnaire.
 * Every item is required, so the component's Skip stays unused.
 * shortcuts="letters" binds A, B, C to the choices in order.
 * The component owns the keys, and it only hears them on the form.
 * A letter pressed on the page is forwarded onto the form.
 * A letter selects. It does not advance.
 * Beth's Skip is a mode: it leaves this form and opens every role.
 * Answers stay in the URL. Nothing is stored.
 * The face comes from --font-sans (Open Runde).
 */
export function Questions() {
  const router = useRouter()
  const [item, setItem] = useState<QuestionId>(questions[0].id)
  const [statuses, setStatuses] = useState<
    Partial<Record<QuestionId, QuestionnaireItemStatus>>
  >({})
  // Next and Lock stay off until the current question has an answer.
  const unanswered = statuses[item] !== "answered"

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      // The questionnaire's own listener is on the form.
      // A key pressed on the page, with focus outside, never reaches it.
      if (
        event.defaultPrevented ||
        event.metaKey ||
        event.ctrlKey ||
        event.altKey ||
        event.repeat
      ) {
        return
      }

      if (!/^[a-z]$/i.test(event.key)) {
        return
      }

      const form = document.querySelector("[data-slot=questionnaire]")
      const target = event.target

      if (!(form instanceof HTMLElement) || !(target instanceof Node)) {
        return
      }

      if (form.contains(target)) {
        return
      }

      form.dispatchEvent(
        new KeyboardEvent("keydown", {
          key: event.key,
          bubbles: true,
          cancelable: true,
        })
      )
    }

    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [])

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    const params = new URLSearchParams()

    for (const question of questions) {
      const values = formData
        .getAll(question.id)
        .filter((value): value is string => typeof value === "string")
      // Hands and show may carry two proofs. Store the strongest.
      const value =
        question.id === "hands"
          ? handsProof(values)
          : question.id === "show"
            ? showProof(values)
            : (values[0] ?? null)

      if (!value) {
        return
      }

      params.set(question.id, value)
    }

    router.push(`/?${params.toString()}`)
  }

  return (
    <div className="flex flex-col gap-6">
      <Questionnaire
        item={item}
        items={items}
        shortcuts="letters"
        onItemChange={(next) => setItem(next as QuestionId)}
        onSubmit={handleSubmit}
      >
        <QuestionnaireProgress />
        {questions.map((question) => (
          <QuestionnaireItem
            key={question.id}
            name={question.id}
            required
            multiple={"multiple" in question && question.multiple}
            onStatusChange={(status) =>
              setStatuses((current) => ({
                ...current,
                [question.id]: status,
              }))
            }
          >
            <QuestionnaireTitle>{question.prompt}</QuestionnaireTitle>
            {"note" in question ? (
              <QuestionnaireDescription>{question.note}</QuestionnaireDescription>
            ) : null}
            <QuestionnaireChoices>
              {question.options.map((option) => (
                <QuestionnaireChoice key={option.value} value={option.value}>
                  {option.label}
                </QuestionnaireChoice>
              ))}
            </QuestionnaireChoices>
            <QuestionnaireError />
          </QuestionnaireItem>
        ))}
        <QuestionnaireActions>
          <QuestionnairePrevious size="lg">{page.back}</QuestionnairePrevious>
          <QuestionnaireNext size="lg" disabled={unanswered}>
            {page.next}
          </QuestionnaireNext>
          <QuestionnaireSubmit size="lg" disabled={unanswered}>
            {page.lock}
          </QuestionnaireSubmit>
        </QuestionnaireActions>
      </Questionnaire>
      <a
        href="/?skip=1"
        className="w-fit text-base text-muted-foreground hover:text-foreground"
      >
        {page.skip}
      </a>
    </div>
  )
}
