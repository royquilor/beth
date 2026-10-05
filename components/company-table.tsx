"use client"

import { Badge } from "@/components/ui/badge"
import { Button, buttonVariants } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  groupCompanies,
  type Company,
  type Stage,
  type Work,
} from "@/lib/company"
import { page } from "@/lib/catalog"

const chip =
  "h-auto rounded-none bg-muted px-1 py-1 text-xs leading-tight font-normal tracking-wide whitespace-nowrap uppercase"

const siteLink = buttonVariants({
  variant: "outline",
  className: "h-auto w-fit px-2.5 py-1.5 shadow-none",
})

const stageLabel: Record<Stage, string> = {
  "pre-seed": "Pre-seed",
  seed: "Seed",
  later: "Later",
}

const workLabel: Record<Work, string> = {
  remote: "Remote",
  hybrid: "Hybrid London",
  room: "In the room",
}

function groupValue(stage: Stage | null) {
  return stage ?? "open"
}

function groupTitle(stage: Stage | null) {
  return stage ? stageLabel[stage] : page.noRound
}

/**
 * Same row and sheet as the roles.
 * The groups are horizontal tabs. Seed opens first.
 * The row is the company and the description from its site.
 * The company name is underlined so the row reads as the control that opens the sheet.
 * The sheet holds the tags and the official site.
 * No shade yet. The values questions are not written.
 */
export function CompanyTable({ companies }: { companies: Company[] }) {
  const groups = groupCompanies(companies)
  const first = groups[0]

  if (!first) return null

  return (
    <Tabs defaultValue={groupValue(first.stage)} className="gap-6">
      <TabsList variant="line" className="max-w-full">
        {groups.map((group) => (
          <TabsTrigger
            key={groupValue(group.stage)}
            value={groupValue(group.stage)}
          >
            {groupTitle(group.stage)}
          </TabsTrigger>
        ))}
      </TabsList>
      {groups.map((group) => (
        <TabsContent
          key={groupValue(group.stage)}
          value={groupValue(group.stage)}
          className="text-base"
        >
          <div className="flex flex-col">
            {group.companies.map((company) => (
              <CompanyRow key={company.id} company={company} />
            ))}
          </div>
        </TabsContent>
      ))}
    </Tabs>
  )
}

function CompanyRow({ company }: { company: Company }) {
  return (
    <Sheet>
      <SheetTrigger
        render={
          <Button
            variant="ghost"
            className="grid h-auto w-full grid-cols-2 items-baseline justify-start gap-3 px-0 py-3 text-left leading-normal whitespace-normal"
          />
        }
      >
        <span className="underline-name min-w-0">{company.name}</span>
        <span className="min-w-0 text-pretty text-muted-foreground">
          {company.why}
        </span>
      </SheetTrigger>
      <SheetContent
        side="bottom"
        className="max-h-[85vh] overflow-y-auto text-base"
      >
        <CompanySheet company={company} />
      </SheetContent>
    </Sheet>
  )
}

function CompanySheet({ company }: { company: Company }) {
  return (
    <div className="mx-auto flex w-full max-w-lg flex-col gap-4 px-6 py-10">
      <SheetTitle className="pr-8 text-base leading-heading font-normal text-balance">
        {company.name}
      </SheetTitle>
      <p className="text-pretty">{company.why}</p>
      <div className="flex flex-wrap gap-2">
        {company.stage ? (
          <Badge variant="secondary" className={chip}>
            {stageLabel[company.stage]}
          </Badge>
        ) : null}
        {company.work ? (
          <Badge variant="secondary" className={chip}>
            {workLabel[company.work]}
          </Badge>
        ) : null}
      </div>
      {company.round ? (
        <p className="text-muted-foreground">{company.round}</p>
      ) : null}
      {company.where ? (
        <p className="text-muted-foreground">{company.where}</p>
      ) : null}
      <a
        href={company.href}
        className={siteLink}
        target="_blank"
        rel="noopener noreferrer"
      >
        {page.siteFor(company.name)}
      </a>
    </div>
  )
}
