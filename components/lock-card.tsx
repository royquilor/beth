import { Badge } from "@/components/ui/badge"
import { Mark } from "@/components/mark"
import { Dash } from "@/components/rule"
import { page } from "@/lib/catalog"
import type { Lock } from "@/lib/place"
import {
  bandLabel,
  countSentence,
  craftPhrase,
  proofFor,
  seatLabel,
} from "@/lib/read"

const chip =
  "h-auto rounded-none bg-muted px-1 py-1 text-xs leading-tight font-normal tracking-wide whitespace-nowrap uppercase"

/**
 * Worked example. The ask screen does not mount this.
 * The all-screens frame still specifies the card, so the layout stays here.
 */
export function LockCard({
  lock,
  inRange,
  stretch,
  kicker,
}: {
  lock: Lock
  inRange: number
  stretch: number
  kicker?: string
}) {
  const proof = proofFor(lock)

  return (
    <article className="flex flex-col gap-4 rounded-xl border bg-card p-4 text-base">
      <div className="flex items-center justify-between gap-3">
        <Mark />
        {kicker ? (
          <Badge variant="secondary" className={chip}>
            {kicker}
          </Badge>
        ) : null}
      </div>
      <p>
        {page.title} {bandLabel[lock.band]}
      </p>
      <Dash />
      <p>
        {craftPhrase(lock.prong)} · {seatLabel[lock.seat]}
      </p>
      <Dash />
      <p>{proof.line}</p>
      <p>{countSentence(lock, inRange, stretch)}</p>
    </article>
  )
}
