"use client"

import { Badge } from "@/components/ui/badge"
import { Button, buttonVariants } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { page } from "@/lib/catalog"
import type { Lock } from "@/lib/place"
import type { Role } from "@/lib/roles"
import {
  bandLabel,
  groupByWeek,
  metaLine,
  prongBadge,
  seatBadge,
  shadeOf,
  weekLabel,
} from "@/lib/read"

const chip =
  "h-auto rounded-none bg-muted px-1 py-1 text-xs leading-tight font-normal tracking-wide whitespace-nowrap uppercase"

const applyLink = buttonVariants({
  variant: "outline",
  className: "h-auto w-fit px-2.5 py-1.5 shadow-none",
})

/**
 * Two facts on the row: company and title.
 * The company name is underlined so the row reads as the control that opens the sheet.
 * The band, the posting sentence, craft, seat, salary, and place open in the sheet.
 * Under In range or Stretch the week stays an h3, because those sections already have an h2.
 * Skip has no section title, so the week is the h2. Otherwise the outline skips from h1 to h3.
 */
export function RoleTable({
  roles,
  lock,
  level = 3,
}: {
  roles: Role[]
  lock?: Lock
  level?: 2 | 3
}) {
  const groups = groupByWeek(roles)
  const Week = level === 2 ? "h2" : "h3"
  // Under a section title the week steps down, so it does not match its parent.
  // On skip the week is the section, so it stays at the section size.
  const weekClass =
    level === 2
      ? "text-balance text-base leading-heading font-normal tracking-wide uppercase"
      : "text-balance text-sm leading-heading font-normal tracking-wide uppercase"

  return (
    <div className="flex flex-col gap-8">
      {groups.map((group) => (
        <section key={group.week} className="flex flex-col gap-1">
          <Week className={weekClass}>{weekLabel(group.week)}</Week>
          <div className="flex flex-col">
            {group.roles.map((role) => (
              <RoleRow
                key={role.id}
                role={role}
                shade={lock ? shadeOf(lock, role) : null}
              />
            ))}
          </div>
        </section>
      ))}
    </div>
  )
}

function RoleRow({ role, shade }: { role: Role; shade: string | null }) {
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
        <span className="flex min-w-0 items-baseline gap-2">
          {shade ? <span aria-hidden="true">{shade}</span> : null}
          <span className="underline-name">{role.company}</span>
        </span>
        <span className="min-w-0 text-pretty text-muted-foreground">
          {role.title}
        </span>
      </SheetTrigger>
      <SheetContent
        side="bottom"
        className="max-h-[85vh] overflow-y-auto text-base"
      >
        <RoleSheet role={role} />
      </SheetContent>
    </Sheet>
  )
}

function RoleSheet({ role }: { role: Role }) {
  const meta = metaLine(role)

  return (
    <div className="mx-auto flex w-full max-w-lg flex-col gap-4 px-6 py-10">
      <SheetTitle className="pr-8 text-balance text-base leading-heading font-normal">
        {role.company}
      </SheetTitle>
      <p className="text-pretty text-muted-foreground">{role.title}</p>
      <p className="text-pretty">{role.why}</p>
      <div className="flex flex-wrap gap-2">
        <Badge variant="secondary" className={chip}>
          {page.assumes} {bandLabel[role.band]}
        </Badge>
        <Badge variant="secondary" className={chip}>
          {prongBadge[role.prong]}
        </Badge>
        {role.also ? (
          <Badge variant="secondary" className={chip}>
            {prongBadge[role.also]}
          </Badge>
        ) : null}
        <Badge variant="secondary" className={chip}>
          {seatBadge[role.seat]}
        </Badge>
      </div>
      {meta ? <p className="text-muted-foreground">{meta}</p> : null}
      <a
        href={role.href}
        className={applyLink}
        target="_blank"
        rel="noopener noreferrer"
      >
        {page.applyTo(role.company)}
      </a>
    </div>
  )
}
