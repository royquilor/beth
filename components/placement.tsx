import { page } from "@/lib/catalog"
import type { Lock } from "@/lib/place"
import { lockSentence, practiceLine } from "@/lib/read"

/**
 * The result leads with this, not the role list.
 * The sentence is the lock. The card is the one proof.
 * The company is where to aim the piece. It does not change the band.
 */
export function Placement({ lock, company }: { lock: Lock; company?: string }) {
  return (
    <section className="flex flex-col gap-4">
      <p className="text-base">{lockSentence(lock)}</p>
      <div
        id="gap"
        className="flex flex-col gap-2 rounded-xl border bg-card p-4"
      >
        <h2 className="text-base uppercase">{page.nextProof}</h2>
        <p className="text-base">{practiceLine(lock, company)}</p>
      </div>
    </section>
  )
}
