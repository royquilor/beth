import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from "@/components/ui/empty"
import { RoleCard } from "@/components/role-card"
import { page } from "@/lib/catalog"
import type { Role } from "@/lib/roles"

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

/**
 * Roles above the band. The proof already sits above this list,
 * so the cards do not link to a separate gap.
 */
export function StretchList({ roles }: { roles: Role[] }) {
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
          <RoleCard key={role.id} role={role} index={index} />
        ))
      )}
    </section>
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
