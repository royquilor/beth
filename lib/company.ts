/**
 * A company Roy would work with.
 * Hiring is not the gate. A posting can be tagged later.
 * Stage is the last public round. Pre-seed and seed stay,
 * because a small team can take freelance.
 * A field that is unsure is left off. The company stays on the full list.
 */

export const stages = ["pre-seed", "seed", "later"] as const
export type Stage = (typeof stages)[number]

export const works = ["remote", "hybrid", "room"] as const
export type Work = (typeof works)[number]

export type Company = {
  id: string
  name: string
  href: string
  /** Copied from the company's own site. Not a reason written for Roy. */
  why: string
  stage?: Stage
  /** Copied when a round is public. The year stops an old seed reading as a new one. */
  round?: string
  work?: Work
  where?: string
}

export type CompanyGroup = {
  stage: Stage | null
  companies: Company[]
}

/** A to Z by name. Case does not split tldraw from the T names. */
function byName(a: Company, b: Company) {
  return a.name.localeCompare(b.name, undefined, { sensitivity: "base" })
}

/**
 * Pre-seed, then seed, then later.
 * A company with no public round stays on the list, after the staged ones.
 * Names inside a stage are alphabetical. The file keeps the order they were filed.
 */
export function groupCompanies(companies: Company[]): CompanyGroup[] {
  const groups: CompanyGroup[] = []

  for (const stage of stages) {
    const rows = companies
      .filter((company) => company.stage === stage)
      .sort(byName)

    if (rows.length > 0) {
      groups.push({ stage, companies: rows })
    }
  }

  const open = companies
    .filter((company) => company.stage === undefined)
    .sort(byName)

  if (open.length > 0) {
    groups.push({ stage: null, companies: open })
  }

  return groups
}
