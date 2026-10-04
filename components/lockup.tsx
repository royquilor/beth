import { Mark } from "@/components/mark"
import { ModeToggle } from "@/components/mode-toggle"
import { page } from "@/lib/catalog"

/**
 * Header. The name is not set in type. The mark is the lockup.
 * The page heading is read out and kept off the mark.
 * It sits still. Hover runs the inward spiral.
 * Next holds the step and runs a diagonal sweep on this tile.
 * Questions, Companies, and the theme control stay in the top right.
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
      <h1 className="sr-only">{page.title}</h1>
      <div className="flex items-center justify-between gap-3">
        <Mark />
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
          <ModeToggle />
        </nav>
      </div>
      {dek ? <p className="text-pretty text-base">{dek}</p> : null}
    </header>
  )
}
