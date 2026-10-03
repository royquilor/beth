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
  "h-auto rounded-none bg-muted px-1 py-1 text-xs leading-3 font-normal uppercase"

const applyLink = buttonVariants({
  variant: "outline",
  className: "h-auto w-fit px-2.5 py-1.5 shadow-none",
})

/**
 * Two facts on the row: company and title.
 * The company name is underlined so the row reads as the control that opens the sheet.
 * The band, the posting sentence, craft, seat, salary, and place open in the sheet.
 */
export function RoleTable({
  roles,
  lock,
}: {
  roles: Role[]
  lock?: Lock
}) {
  const groups = groupByWeek(roles)

  return (
    <div className="flex flex-col gap-8">
      {groups.map((group) => (
        <section key={group.week} className="flex flex-col gap-1">
          <h3 className="text-base uppercase">{weekLabel(group.week)}</h3>
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
            className="grid h-auto w-full grid-cols-2 items-baseline justify-start gap-3 px-0 py-3 text-left whitespace-normal"
          />
        }
      >
        <span className="flex min-w-0 items-baseline gap-2">
          {shade ? <span aria-hidden="true">{shade}</span> : null}
          <span className="underline underline-offset-4">{role.company}</span>
        </span>
        <span className="min-w-0 text-muted-foreground">{role.title}</span>
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
      <SheetTitle className="pr-8 text-base font-normal">
        {role.company}
      </SheetTitle>
      <p className="text-muted-foreground">{role.title}</p>
      <p>{role.why}</p>
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
