import { page } from "@/lib/catalog"
import type { Company } from "@/lib/company"

/** A to Z. Case does not split tldraw from the T names. */
function byName(a: Company, b: Company) {
  return a.name.localeCompare(b.name, undefined, { sensitivity: "base" })
}

/**
 * The last column is the careers page, and only when the company is hiring.
 * A closed board leaves the cell empty. The row stays.
 */
function Careers({ company }: { company: Company }) {
  if (!company.hiring || !company.careers) return null

  return (
    <a
      href={company.careers}
      className="whitespace-nowrap no-underline"
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${page.hiring}, ${company.name}`}
    >
      {page.hiring}
    </a>
  )
}

/**
 * One list. No stage tabs, and a row does not open a sheet.
 * The name is the link to the company site.
 * The description is the line copied from that site.
 * The last column opens the careers page.
 */
export function CompanyTable({ companies }: { companies: Company[] }) {
  const rows = [...companies].sort(byName)

  return (
    <div className="flex flex-col text-sm">
      {rows.map((company) => (
        <div
          key={company.id}
          className="grid grid-cols-[minmax(0,1fr)_auto] items-baseline gap-x-6 gap-y-2 border-b border-input pt-3 pb-5 leading-normal sm:grid-cols-[minmax(8rem,14rem)_minmax(0,1fr)_auto] sm:gap-y-0"
        >
          <a
            href={company.href}
            className="min-w-0 no-underline sm:col-start-1"
            target="_blank"
            rel="noopener noreferrer"
          >
            {company.name}
          </a>
          <p className="col-span-2 min-w-0 text-pretty text-muted-foreground sm:col-span-1 sm:col-start-2">
            {company.why}
          </p>
          <div className="col-start-2 row-start-1 sm:col-start-3">
            <Careers company={company} />
          </div>
        </div>
      ))}
    </div>
  )
}
