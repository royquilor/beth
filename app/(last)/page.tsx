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

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<Search>
}) {
  const params = await searchParams
  const catalogue = await loadCatalogue()
  const answers = parseAnswers(params)
  const companies = first(params.companies) === "1"
  const skip = !answers && !companies && first(params.skip) === "1"
  const questions = !answers && !companies && !skip
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
