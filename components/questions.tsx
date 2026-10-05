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
import { useHoldNext } from "@/components/use-hold-next"
import { page, questions } from "@/lib/catalog"
import { handsProof, prongProof, showProof } from "@/lib/place"
import { saveLock } from "@/lib/save-lock"

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
 * Next holds the question for one sweep of the mark, then moves.
 * Beth's Skip is a mode: it leaves this form and opens every role.
 * A stranger keeps the answers in the URL.
 * A signed-in Lock writes that person's row, then uses the same URL.
 * The face comes from --font-sans (Open Runde).
 */
export function Questions({ signedIn = false }: { signedIn?: boolean }) {
  const router = useRouter()
  const [saveError, setSaveError] = useState(false)
  const [item, setItem] = useState<QuestionId>(questions[0].id)
  const handleNext = useHoldNext(item, setItem)
  const [statuses, setStatuses] = useState<
    Partial<Record<QuestionId, QuestionnaireItemStatus>>
  >({})
  // An empty question stays pressable, so Next can show its error.
  // An answer holds the step for one sweep of the mark.
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

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSaveError(false)

    const formData = new FormData(event.currentTarget)
    const params = new URLSearchParams()

    for (const question of questions) {
      const values = formData
        .getAll(question.id)
        .filter((value): value is string => typeof value === "string")
      // Hands and show store the strongest proof. Craft stores every selection.
      if (question.id === "prong") {
        const crafts = prongProof(values)

        if (!crafts) return

        for (const craft of crafts) {
          params.append(question.id, craft)
        }

        continue
      }

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

    if (signedIn) {
      const saved = await saveLock(params)

      if (!saved) {
        setSaveError(true)
        return
      }
    }

    router.push(`/?${params.toString()}`)
  }

  return (
    <div className="flex flex-col gap-6">
      {saveError ? (
        <p className="text-base text-destructive">{page.saveFailed}</p>
      ) : null}
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
              <QuestionnaireDescription>
                {question.note}
              </QuestionnaireDescription>
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
          <QuestionnaireNext
            size="lg"
            onClick={(event) => {
              // Let the questionnaire validate and name the fix.
              if (unanswered) return
              handleNext(event)
            }}
          >
            {page.next}
          </QuestionnaireNext>
          <QuestionnaireSubmit size="lg">{page.lock}</QuestionnaireSubmit>
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
