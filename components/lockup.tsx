import { Mark } from "@/components/mark"
import { page } from "@/lib/catalog"

/**
 * Header. The name is not set in type. The mark is the lockup.
 * Result screens put "? Questions" on the right. The ask screen does not.
 */
export function Lockup({ showQuestions = false }: { showQuestions?: boolean }) {
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
      <p className="text-base">{page.dek}</p>
    </header>
  )
}
