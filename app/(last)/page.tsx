import type { Metadata } from "next"
import { redirect } from "next/navigation"

import { CompanyTable } from "@/components/company-table"
import { Frame } from "@/components/frame"
import { Locked } from "@/components/locked"
import { Questions } from "@/components/questions"
import { EveryRole } from "@/components/role-sections"
import { loadCatalogue } from "@/lib/catalogue"
import { page } from "@/lib/catalog"
import { bethEnv } from "@/lib/beth-env"
import { parseAnswers } from "@/lib/place"
import { everyRole } from "@/lib/read"
import { sessionClaims } from "@/lib/session"

type Search = Record<string, string | string[] | undefined>

function first(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value
}

function currentPath(params: Search) {
  const query = new URLSearchParams()

  for (const [key, value] of Object.entries(params)) {
    if (Array.isArray(value)) {
      value.forEach((item) => query.append(key, item))
    } else if (value) {
      query.set(key, value)
    }
  }

  const text = query.toString()
  return text ? `/?${text}` : "/"
}

/**
 * The company list is the front page.
 * Where do I fit opens the six questions.
 * A lock in the query still wins, and Skip still lists every role.
 */
function viewOf(params: Search) {
  const answers = parseAnswers(params)
  const skip = !answers && first(params.skip) === "1"
  const questions = !answers && !skip && first(params.questions) === "1"
  const companies = !answers && !skip && !questions

  return { answers, skip, questions, companies }
}

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<Search>
}): Promise<Metadata> {
  const { answers, skip, questions } = viewOf(await searchParams)

  return {
    description:
      answers || questions
        ? page.dek
        : skip
          ? page.skipLead
          : page.companiesLead,
  }
}

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<Search>
}) {
  const params = await searchParams
  const { answers, skip, questions, companies } = viewOf(params)

  // The old company flag is the same list. One address for it.
  if (companies && first(params.companies) === "1") redirect("/")

  const catalogue = await loadCatalogue()
  const claims = bethEnv() ? await sessionClaims() : null
  const signedIn = Boolean(claims)

  return (
    <Frame
      signedIn={signedIn}
      next={currentPath(params)}
      companies={companies}
      questions={questions}
      dek={
        answers
          ? null
          : companies
            ? page.companiesLead
            : skip
              ? page.skipLead
              : page.dek
      }
    >
      {companies ? (
        <CompanyTable companies={catalogue.companies} />
      ) : answers ? (
        <Locked answers={answers} roles={catalogue.roles} />
      ) : skip ? (
        <EveryRole roles={everyRole(catalogue.roles)} />
      ) : (
        <Questions signedIn={signedIn} />
      )}
    </Frame>
  )
}
