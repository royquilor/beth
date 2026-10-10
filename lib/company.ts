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

/**
 * Someone to follow. The link is their public X profile.
 * The picture is a file in this repo. It is not loaded from X.
 * A title is not inferred. An email is not collected.
 */
export type Lead = {
  name: string
  href: string
  src: string
}

export type Company = {
  id: string
  name: string
  href: string
  /**
   * The line from the company's own site.
   * Shown when no design reading is on the record.
   */
  why: string
  /**
   * Why a designer might care.
   * Written only when the company's own page or posting shows a design culture.
   * Absent means that evidence was not found. It is not a low score.
   */
  fit?: string
  stage?: Stage
  /** Copied when a round is public. The year stops an old seed reading as a new one. */
  round?: string
  work?: Work
  where?: string
  /** Careers page. Absent when the company has not published one. */
  careers?: string
  /**
   * True when that careers page listed an open role.
   * A closed board does not remove the company.
   */
  hiring?: boolean
  /** Named by Roy. Absent until someone is named. Not a guess. */
  lead?: Lead
}

export type CompanyGroup = {
  stage: Stage | null
  companies: Company[]
}

/**
 * The series the company published, without the date.
 * "Series C, Jan 2025" reads as Series C.
 * No public round returns nothing, and the cell stays empty.
 */
export function stageLine(company: Company) {
  const series = company.round?.split(",")[0]?.trim()
  if (!series) return undefined
  return series
}

/**
 * The sentence on the row.
 * A design reading when one is filed. Otherwise the line from the site.
 */
export function descriptionOf(company: Company) {
  if (company.fit) return company.fit
  return company.why
}

/**
 * Beth fills the published fields.
 * Careers, hiring, the person to follow, and the design line stay on the file.
 */
export function withFileFields(fromBeth: Company, filed: Company): Company {
  return {
    ...fromBeth,
    careers: filed.careers,
    hiring: filed.hiring,
    lead: filed.lead,
    fit: filed.fit,
  }
}

/** A to Z by name. Case does not split tldraw from the T names. */
function byName(a: Company, b: Company) {
  return a.name.localeCompare(b.name, undefined, { sensitivity: "base" })
}

/**
 * Pre-seed, then seed, then later.
 * A company with no public round stays on the list, after the staged ones.
 * Names inside a stage are alphabetical. The file keeps the order they were filed.
 * The company page does not use these groups. It lists the filed companies.
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
