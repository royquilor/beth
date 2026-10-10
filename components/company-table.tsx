import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { page } from "@/lib/catalog"
import { descriptionOf, stageLine, type Company } from "@/lib/company"

/** A to Z. Case does not split tldraw from the T names. */
function byName(a: Company, b: Company) {
  return a.name.localeCompare(b.name, undefined, { sensitivity: "base" })
}

/**
 * The series they published, in a badge.
 * No public round leaves the cell empty. The row stays.
 */
function Stage({ company }: { company: Company }) {
  const stage = stageLine(company)
  if (!stage) return null

  return <Badge variant="outline">{stage}</Badge>
}

/**
 * Someone to follow. The avatar opens their X profile.
 * A company with no named person leaves the cell empty.
 */
function Follow({ company }: { company: Company }) {
  const lead = company.lead
  if (!lead) return null

  return (
    <a
      href={lead.href}
      className="inline-flex no-underline"
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${lead.name}, ${company.name}`}
    >
      <Avatar size="sm">
        <AvatarImage src={lead.src} alt="" />
        <AvatarFallback>{lead.name.slice(0, 1)}</AvatarFallback>
      </Avatar>
    </a>
  )
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
      className="no-underline"
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${page.hiring}, ${company.name}`}
    >
      {page.hiring}
    </a>
  )
}

/** Quieter than the table's own border. Same edge as a field. */
const row = "border-input"

/** More room than the table default. The first column stays a fixed width. */
const head = "h-auto w-56 px-4 py-4"
const cell = "px-4 py-5"

/**
 * One list, built with the Table component.
 * No stage tabs, and a row does not open a sheet.
 * The name is the link to the company site.
 * The description is why a designer might care, when a page shows a design culture.
 * A company with no design reading keeps the short line from its site.
 * Stage is the series they published. A missing round leaves that cell empty.
 * Follow is someone to follow. The avatar opens their X profile.
 * The last column opens the careers page.
 * Its header is hidden. The cell still says Hiring.
 */
export function CompanyTable({ companies }: { companies: Company[] }) {
  const rows = [...companies].sort(byName)

  return (
    <Table>
      <TableHeader>
        <TableRow className={row}>
          <TableHead className={head}>{page.name}</TableHead>
          <TableHead className="h-auto px-4 py-4">{page.description}</TableHead>
          <TableHead className="h-auto px-4 py-4">{page.stage}</TableHead>
          <TableHead className="h-auto px-4 py-4">{page.lead}</TableHead>
          <TableHead className="h-auto px-4 py-4 text-right">
            <span className="sr-only">{page.hiring}</span>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map((company) => (
          <TableRow key={company.id} className={row}>
            <TableCell className={cell}>
              <a
                href={company.href}
                className="no-underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                {company.name}
              </a>
            </TableCell>
            <TableCell
              className={`${cell} text-pretty leading-normal whitespace-normal text-muted-foreground`}
            >
              {descriptionOf(company)}
            </TableCell>
            <TableCell className={cell}>
              <Stage company={company} />
            </TableCell>
            <TableCell className={cell}>
              <Follow company={company} />
            </TableCell>
            <TableCell className={`${cell} text-right`}>
              <Careers company={company} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
