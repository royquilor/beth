import { Placement } from "@/components/placement"
import { InRange, StretchList } from "@/components/role-sections"
import { lockFrom, type Answers, type Lock } from "@/lib/place"
import type { Role } from "@/lib/roles"
import { aimCompany, splitRoles } from "@/lib/read"

export function Locked({ answers, roles }: { answers: Answers; roles: Role[] }) {
  const lock = lockFrom(answers)
  const split = splitRoles(lock, roles)
  const company = aimCompany(split.stretch, split.inRange)
  // In range sits under the proof. Stretch replaces it when nothing is in range.
  const showStretch = split.inRange.length === 0

  return (
    <div className="flex flex-col gap-10">
      <Placement lock={lock} company={company} />
      <OpenedRoles
        viewAll={showStretch}
        lock={lock}
        inRange={split.inRange}
        stretch={split.stretch}
      />
    </div>
  )
}

/** The list sits under the sentence. It is not the result. */
function OpenedRoles({
  viewAll,
  lock,
  inRange,
  stretch,
}: {
  viewAll: boolean
  lock: Lock
  inRange: Role[]
  stretch: Role[]
}) {
  if (viewAll) {
    return <StretchList roles={stretch} lock={lock} />
  }

  return <InRange roles={inRange} lock={lock} />
}
