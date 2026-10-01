"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import type { QuestionnaireItemStatus } from "@shadcn/react/questionnaire"

import {
  Questionnaire,
  QuestionnaireActions,
  QuestionnaireChoice,
  QuestionnaireChoices,
  QuestionnaireError,
  QuestionnaireItem,
  QuestionnaireNext,
  QuestionnairePrevious,
  QuestionnaireProgress,
  QuestionnaireSubmit,
  QuestionnaireTitle,
} from "@/components/ui/questionnaire"
import { page, questions } from "@/lib/catalog"

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

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    const params = new URLSearchParams()

    for (const question of questions) {
      const value = formData.get(question.id)

      if (typeof value !== "string" || value.length === 0) {
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
        onItemChange={(next) => setItem(next as QuestionId)}
        onSubmit={handleSubmit}
      >
        <QuestionnaireProgress />
        {questions.map((question) => (
          <QuestionnaireItem
            key={question.id}
            name={question.id}
            required
            onStatusChange={(status) =>
              setStatuses((current) => ({
                ...current,
                [question.id]: status,
              }))
            }
          >
            <QuestionnaireTitle>{question.prompt}</QuestionnaireTitle>
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
