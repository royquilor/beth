import { Badge } from "@/components/ui/badge"
import { buttonVariants } from "@/components/ui/button"
import { Dash } from "@/components/rule"
import { page } from "@/lib/catalog"
import type { Role } from "@/lib/roles"
import { bandLabel, metaLine, prongBadge, seatBadge } from "@/lib/read"

/**
 * Shade steps down the list: light, mid, dark, then repeat.
 * It is a rhythm, not a score and not the band.
 */
const shades = ["░", "▒", "▓"] as const

const chip =
  "h-auto rounded-none bg-muted px-1 py-1 text-xs leading-3 font-normal uppercase"

const applyLink = buttonVariants({
  variant: "outline",
  className: "h-auto px-2.5 py-1.5 shadow-none",
})

export function RoleCard({ role, index }: { role: Role; index: number }) {
  const meta = metaLine(role)
  const shade = shades[index % shades.length]

  return (
    <article className="flex flex-col gap-4 rounded-xl border bg-card p-4 text-base">
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
      <Dash />
      <div className="flex items-center gap-2">
        <span aria-hidden="true">{shade}</span>
        <h3>{role.company}</h3>
      </div>
      <Dash />
      <p className="text-muted-foreground">{role.title}</p>
      <p>{role.why}</p>
      {meta ? <p className="text-muted-foreground">{meta}</p> : null}
      <div className="flex flex-wrap gap-2">
        <a
          href={role.href}
          className={applyLink}
          target="_blank"
          rel="noopener noreferrer"
        >
          {page.apply}
        </a>
      </div>
    </article>
  )
}
