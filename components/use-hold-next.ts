"use client"

import { useEffect, useRef } from "react"

import { markStepMs, useMarkPhase } from "@/components/mark"
import { questions } from "@/lib/catalog"

/**
 * Next holds the current question for one sweep of the mark, then moves.
 * A second click during that beat does not skip ahead.
 * Reduced motion lets the questionnaire advance on the click.
 */
export function useHoldNext<T extends string>(
  item: T,
  setItem: (value: T | ((current: T) => T)) => void
) {
  const { setPhase } = useMarkPhase()
  const wait = useRef<number | null>(null)

  useEffect(() => {
    return () => {
      if (wait.current) window.clearTimeout(wait.current)
    }
  }, [])

  function handleNext(event: React.MouseEvent<HTMLButtonElement>) {
    if (wait.current) {
      event.preventDefault()
      return
    }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return
    }

    const index = questions.findIndex((question) => question.id === item)
    const next = questions[index + 1]

    if (!next) return

    // The questionnaire advances on this click unless we stop it.
    event.preventDefault()
    const from = item
    setPhase("step")
    wait.current = window.setTimeout(() => {
      wait.current = null
      setPhase("rest")
      setItem((current) => (current === from ? (next.id as T) : current))
    }, markStepMs)
  }

  return handleNext
}
