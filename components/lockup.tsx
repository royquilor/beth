import { Mark } from "@/components/mark"
import { page } from "@/lib/catalog"

/**
 * Header. The name is not set in type. The mark is the lockup.
 * Result screens put "? Questions" on the right and drop the dek.
 * The lock sentence below is the result. The ask screen keeps the dek.
 * Pass null to hide the line. Skip passes its own lead.
 */
export function Lockup({
  showQuestions = false,
  dek = page.dek,
}: {
  showQuestions?: boolean
  dek?: string | null
}) {
  return (
    <header className="flex flex-col gap-10">
      <div className="flex items-center justify-between gap-3">
        <Mark />
        {showQuestions ? (
          <a
            href="/"
            className="text-base text-muted-foreground uppercase hover:text-foreground"
          >
            {page.questions}
          </a>
        ) : null}
      </div>
      {dek ? <p className="text-base">{dek}</p> : null}
    </header>
  )
}
