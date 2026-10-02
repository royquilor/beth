import type { Metadata } from "next"

import { Lockup } from "@/components/lockup"
import { Placement } from "@/components/placement"
import { Questions } from "@/components/questions"
import { EveryRole, InRange, StretchList } from "@/components/role-sections"
import { Rule } from "@/components/rule"
import { buttonVariants } from "@/components/ui/button"
import { page, questions } from "@/lib/catalog"
import { lockFrom, parseAnswers, type Answers } from "@/lib/place"
import { checkedOn, type Role } from "@/lib/roles"
import { aimCompany, everyRole, splitRoles } from "@/lib/read"

const rolesLink = buttonVariants({
  variant: "outline",
  size: "lg",
})

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
    const value = answers[question.id]

    if (Array.isArray(value)) {
      for (const item of value) {
        params.append(question.id, item)
      }
    } else {
      params.set(question.id, value)
    }
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
  const showRoles = first(params.roles) === "1"

  return (
    <main className="mx-auto flex w-full max-w-md flex-col gap-10 px-6 py-10">
      <Lockup
        showQuestions={Boolean(answers || skip)}
        dek={answers ? null : skip ? page.skipLead : page.dek}
      />
      <Rule />
      {answers ? (
        <Locked answers={answers} viewAll={viewAll} showRoles={showRoles} />
      ) : skip ? (
        <EveryRole roles={everyRole()} />
      ) : (
        <Questions />
      )}
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
  showRoles,
}: {
  answers: Answers
  viewAll: boolean
  showRoles: boolean
}) {
  const lock = lockFrom(answers)
  const split = splitRoles(lock)
  const company = aimCompany(split.stretch, split.inRange)
  const hasRoles = split.inRange.length > 0 || split.stretch.length > 0
  // In-range roles are the ones this band can take. Otherwise show the stretch list.
  const rolesHref =
    split.inRange.length > 0
      ? hrefFor(answers, { roles: "1" })
      : hrefFor(answers, { view: "all" })
  const listOpen = viewAll || showRoles

  return (
    <div className="flex flex-col gap-10">
      <Placement lock={lock} company={company} />
      {listOpen ? (
        <OpenedRoles
          viewAll={viewAll || split.inRange.length === 0}
          inRange={split.inRange}
          stretch={split.stretch}
        />
      ) : hasRoles ? (
        <a href={rolesHref} className={rolesLink}>
          {page.seeRoles}
        </a>
      ) : null}
    </div>
  )
}

/** The list sits under the sentence. It is not the result. */
function OpenedRoles({
  viewAll,
  inRange,
  stretch,
}: {
  viewAll: boolean
  inRange: Role[]
  stretch: Role[]
}) {
  if (viewAll) {
    return <StretchList roles={stretch} />
  }

  return <InRange roles={inRange} />
}
