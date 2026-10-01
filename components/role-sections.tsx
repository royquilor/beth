import { buttonVariants } from "@/components/ui/button"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from "@/components/ui/empty"
import { RoleCard } from "@/components/role-card"
import { page } from "@/lib/catalog"
import type { Role } from "@/lib/roles"

const quiet = buttonVariants({
  variant: "outline",
  className: "shadow-sm",
})

function Heading({ title, lead }: { title: string; lead: string }) {
  return (
    <div className="flex flex-col gap-2">
      <h2 className="text-base uppercase">{title}</h2>
      <p className="text-base text-muted-foreground">{lead}</p>
    </div>
  )
}

/** In range. Apply only. The section title carries the fit. */
export function InRange({ roles }: { roles: Role[] }) {
  return (
    <section className="flex flex-col gap-10">
      <Heading title={page.inRange} lead={page.rangeLead} />
      <div className="flex flex-col gap-3">
        {roles.map((role, index) => (
          <RoleCard key={role.id} role={role} index={index} />
        ))}
      </div>
    </section>
  )
}

/** Stretch list from "See all roles". Each card can open the one gap. */
export function StretchList({
  roles,
  gapsHref,
}: {
  roles: Role[]
  gapsHref: string
}) {
  return (
    <section className="flex flex-col gap-3">
      <Heading title={page.stretch} lead={page.stretchLead} />
      {roles.length === 0 ? (
        <Empty className="flex-none border border-dashed p-10">
          <EmptyHeader>
            <EmptyTitle className="text-base font-normal tracking-normal uppercase">
              {page.nothingAbove}
            </EmptyTitle>
            <EmptyDescription className="text-base">
              {page.emptyStretch}
            </EmptyDescription>
          </EmptyHeader>
        </Empty>
      ) : (
        roles.map((role, index) => (
          <RoleCard
            key={role.id}
            role={role}
            index={index}
            gapsHref={gapsHref}
          />
        ))
      )}
    </section>
  )
}

/** No posting matched. See the stretch list, or the one gap. */
export function NothingInRange({
  allHref,
  gapsHref,
}: {
  allHref: string
  gapsHref: string
}) {
  return (
    <Empty className="flex-none gap-4 border border-dashed p-10">
      <EmptyHeader className="max-w-none gap-4">
        <EmptyTitle className="text-base font-normal tracking-normal uppercase">
          {page.nothingInRange}
        </EmptyTitle>
        <EmptyDescription className="text-base">
          {page.emptyRange}
        </EmptyDescription>
      </EmptyHeader>
      <p className="text-base" aria-hidden="true">
        □
      </p>
      <EmptyContent className="gap-2">
        <a href={allHref} className={quiet}>
          {page.seeAll}
        </a>
        <a href={gapsHref} className={quiet}>
          {page.checkGaps}
        </a>
      </EmptyContent>
    </Empty>
  )
}

/** Skip mode. No lock, so no stretch split and no gap link. */
export function EveryRole({ roles }: { roles: Role[] }) {
  if (roles.length === 0) {
    return (
      <Empty className="flex-none border border-dashed p-10">
        <EmptyHeader>
          <EmptyTitle className="text-base font-normal tracking-normal uppercase">
            {page.emptyAll}
          </EmptyTitle>
        </EmptyHeader>
      </Empty>
    )
  }

  return (
    <div className="flex flex-col gap-3">
      {roles.map((role, index) => (
        <RoleCard key={role.id} role={role} index={index} />
      ))}
    </div>
  )
}
