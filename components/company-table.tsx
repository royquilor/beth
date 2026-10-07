import type { Company } from "@/lib/company"

/** A to Z. Case does not split tldraw from the T names. */
function byName(a: Company, b: Company) {
  return a.name.localeCompare(b.name, undefined, { sensitivity: "base" })
}

/**
 * One list. No stage tabs, and a row does not open a sheet.
 * The name is the link to the company site.
 * The description is the line copied from that site.
 */
export function CompanyTable({ companies }: { companies: Company[] }) {
  const rows = [...companies].sort(byName)

  return (
    <div className="flex flex-col text-sm">
      {rows.map((company) => (
        <div
          key={company.id}
          className="grid grid-cols-2 items-baseline gap-3 border-b border-input pt-3 pb-5 leading-normal"
        >
          <a
            href={company.href}
            className="min-w-0 no-underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            {company.name}
          </a>
          <p className="min-w-0 text-pretty text-muted-foreground">
            {company.why}
          </p>
        </div>
      ))}
    </div>
  )
}
