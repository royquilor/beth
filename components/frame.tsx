import { Lockup } from "@/components/lockup"
import { MarkPhaseProvider } from "@/components/mark"
import { Rule } from "@/components/rule"
import { bethEnv } from "@/lib/beth-env"
import { page } from "@/lib/catalog"
import { checkedOn } from "@/lib/roles"

/**
 * The public column. Sign in is omitted when the env file is missing.
 */
export function Frame({
  dek,
  signedIn,
  next,
  companies = false,
  children,
}: {
  dek: string | null
  signedIn: boolean
  next: string
  companies?: boolean
  children: React.ReactNode
}) {
  return (
    <MarkPhaseProvider>
      <main className="mx-auto flex w-full max-w-lg flex-col gap-10 px-6 py-10">
        <Lockup
          links={[
            { href: "/", label: page.questions },
            { href: "/?companies=1", label: page.companies },
          ]}
          dek={dek}
          session={bethEnv() ? { signedIn, next } : null}
        />
        <Rule />
        {children}
        <Rule />
        <footer className="text-base text-pretty text-muted-foreground">
          <p>
            {companies
              ? page.companiesFoot
              : `Checked ${checkedOn} against the company pages. A closed role comes off.`}
          </p>
        </footer>
      </main>
    </MarkPhaseProvider>
  )
}
