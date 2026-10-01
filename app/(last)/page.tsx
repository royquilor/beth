import type { Metadata } from "next"

import { Lockup } from "@/components/lockup"
import { NextProof } from "@/components/next-proof"
import { Questions } from "@/components/questions"
import {
  EveryRole,
  InRange,
  NothingInRange,
  StretchList,
} from "@/components/role-sections"
import { Rule } from "@/components/rule"
import { page, questions } from "@/lib/catalog"
import { lockFrom, parseAnswers, type Answers } from "@/lib/place"
import { checkedOn } from "@/lib/roles"
import { everyRole, splitRoles } from "@/lib/read"

export const metadata: Metadata = {
  title: page.title,
  description: page.dek,
}

type Search = Record<string, string | string[] | undefined>

function first(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value
}

function hrefFor(answers: Answers, extra?: Record<string, string>) {
  const params = new URLSearchParams()

  for (const question of questions) {
    params.set(question.id, answers[question.id])
  }

  for (const [key, value] of Object.entries(extra ?? {})) {
    params.set(key, value)
  }

  return `/?${params.toString()}`
}

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<Search>
}) {
  const params = await searchParams
  const answers = parseAnswers(params)
  const skip = !answers && first(params.skip) === "1"
  const viewAll = first(params.view) === "all"
  const gaps = first(params.gaps) === "1"

  return (
    <main className="mx-auto flex w-full max-w-sm flex-col gap-10 px-6 py-10">
      <Lockup showQuestions={Boolean(answers || skip)} />
      <Rule />
      {answers ? (
        <Locked answers={answers} viewAll={viewAll} />
      ) : skip ? (
        <EveryRole roles={everyRole()} />
      ) : (
        <Questions />
      )}
      {answers && gaps ? <NextProof lock={lockFrom(answers)} /> : null}
      <Rule />
      <footer className="text-base text-muted-foreground">
        <p>
          Checked {checkedOn} against the company pages. A closed role comes
          off.
        </p>
      </footer>
    </main>
  )
}

function Locked({
  answers,
  viewAll,
}: {
  answers: Answers
  viewAll: boolean
}) {
  const lock = lockFrom(answers)
  const split = splitRoles(lock)
  const gapsHref = `${hrefFor(answers, viewAll ? { view: "all", gaps: "1" } : { gaps: "1" })}#gap`

  if (viewAll) {
    return <StretchList roles={split.stretch} gapsHref={gapsHref} />
  }

  if (split.inRange.length === 0) {
    return (
      <NothingInRange
        allHref={hrefFor(answers, { view: "all" })}
        gapsHref={gapsHref}
      />
    )
  }

  return <InRange roles={split.inRange} />
}
