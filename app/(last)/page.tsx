import type { Metadata } from "next"

import { Lockup } from "@/components/lockup"
import { Placement } from "@/components/placement"
import { Questions } from "@/components/questions"
import { EveryRole, InRange, StretchList } from "@/components/role-sections"
import { Rule } from "@/components/rule"
import { page } from "@/lib/catalog"
import { lockFrom, parseAnswers, type Answers } from "@/lib/place"
import { checkedOn, type Role } from "@/lib/roles"
import { aimCompany, everyRole, splitRoles } from "@/lib/read"

export const metadata: Metadata = {
  title: page.title,
  description: page.dek,
}

type Search = Record<string, string | string[] | undefined>

function first(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value
}

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<Search>
}) {
  const params = await searchParams
  const answers = parseAnswers(params)
  const skip = !answers && first(params.skip) === "1"

  return (
    <main className="mx-auto flex w-full max-w-lg flex-col gap-10 px-6 py-10">
      <Lockup
        showQuestions={Boolean(answers || skip)}
        dek={answers ? null : skip ? page.skipLead : page.dek}
      />
      <Rule />
      {answers ? (
        <Locked answers={answers} />
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

function Locked({ answers }: { answers: Answers }) {
  const lock = lockFrom(answers)
  const split = splitRoles(lock)
  const company = aimCompany(split.stretch, split.inRange)
  // In range sits under the proof. Stretch replaces it when nothing is in range.
  const showStretch = split.inRange.length === 0

  return (
    <div className="flex flex-col gap-10">
      <Placement lock={lock} company={company} />
      <OpenedRoles
        viewAll={showStretch}
        inRange={split.inRange}
        stretch={split.stretch}
      />
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
