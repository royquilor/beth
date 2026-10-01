import { page } from "@/lib/catalog"
import type { Lock } from "@/lib/place"
import { proofFor } from "@/lib/read"

/** The one practice that opens the next band. Not a second score. */
export function NextProof({ lock }: { lock: Lock }) {
  const proof = proofFor(lock)

  return (
    <section
      id="gap"
      className="flex flex-col gap-2 rounded-xl border bg-card p-4"
    >
      <h2 className="text-base">{page.nextProof}</h2>
      <p className="text-base">{proof.practice}</p>
    </section>
  )
}
