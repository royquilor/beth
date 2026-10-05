import { bethEnv } from "@/lib/beth-env"
import { page } from "@/lib/catalog"
import { signOut } from "@/lib/sign-out"
import { Mark } from "@/components/mark"
import { ModeToggle } from "@/components/mode-toggle"
import { Button } from "@/components/ui/button"

/**
 * Header. The name is not set in type. The mark is the lockup.
 * The page heading is read out and kept off the mark.
 * It sits still. Hover runs the inward spiral.
 * Next holds the step and runs a diagonal sweep on this tile.
 * Questions, Companies, and the theme control stay in the top right.
 * Sign in sits after those links. No env file means no Sign in control.
 * The ask screen keeps the dek. Pass null to hide the line.
 * Skip and Companies pass their own lead.
 */
export function Lockup({
  links = [],
  dek = page.dek,
  session = null,
}: {
  links?: { href: string; label: string }[]
  dek?: string | null
  session?: { signedIn: boolean; next: string } | null
}) {
  const showSession = Boolean(session && bethEnv())

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
          {showSession && session?.signedIn ? (
            <form action={signOut}>
              <input type="hidden" name="next" value={session.next} />
              <Button
                type="submit"
                variant="ghost"
                className="h-auto px-0 text-sm font-normal text-muted-foreground"
              >
                {page.signOut}
              </Button>
            </form>
          ) : null}
          {showSession && session && !session.signedIn ? (
            <a
              href="/login"
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              {page.signIn}
            </a>
          ) : null}
          <ModeToggle />
        </nav>
      </div>
      {dek ? <p className="text-pretty text-base">{dek}</p> : null}
    </header>
  )
}
