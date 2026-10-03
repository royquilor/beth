import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from "@/components/ui/empty"
import { RoleTable } from "@/components/role-table"
import { page } from "@/lib/catalog"
import type { Lock } from "@/lib/place"
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
export function InRange({ roles, lock }: { roles: Role[]; lock: Lock }) {
  return (
    <section className="flex flex-col gap-10">
      <Heading title={page.inRange} lead={page.rangeLead} />
      <RoleTable roles={roles} lock={lock} />
    </section>
  )
}

/**
 * Roles above the band. The proof already sits above this list,
 * so the rows do not link to a separate gap.
 */
export function StretchList({ roles, lock }: { roles: Role[]; lock: Lock }) {
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
        <RoleTable roles={roles} lock={lock} />
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

  return <RoleTable roles={roles} level={2} />
}
