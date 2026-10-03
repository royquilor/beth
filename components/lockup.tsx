import { Mark } from "@/components/mark"
import { page } from "@/lib/catalog"

/**
 * Header. The name is not set in type. The mark is the lockup.
 * Questions and Companies stay in the top right on every screen.
 * The ask screen keeps the dek. Pass null to hide the line.
 * Skip and Companies pass their own lead.
 */
export function Lockup({
  links = [],
  dek = page.dek,
}: {
  links?: { href: string; label: string }[]
  dek?: string | null
}) {
  return (
    <header className="flex flex-col gap-10">
      <div className="flex items-center justify-between gap-3">
        <Mark />
        {links.length > 0 ? (
          <nav className="flex items-center gap-4">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                {link.label}
              </a>
            ))}
          </nav>
        ) : null}
      </div>
      {dek ? <p className="text-base">{dek}</p> : null}
    </header>
  )
}
