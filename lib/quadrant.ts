import { quadrant } from "@/lib/catalog"
import type { Band, Lock, Origin } from "@/lib/place"

/**
 * Which cell the lock already is.
 * A file is Taste or Prototype. A diff is Ship or Spike.
 * Origin is the other axis. Seat and prong are not.
 */

export type ProofPole = "file" | "diff"

export type CellKey = `${Origin}-${ProofPole}`

export const cellOrder = [
  "design-file",
  "engineering-file",
  "design-diff",
  "engineering-diff",
] as const satisfies readonly CellKey[]

export function proofPole(band: Band): ProofPole {
  if (band === "ship" || band === "spike") return "diff"
  return "file"
}

export function cellKey(lock: Pick<Lock, "band" | "origin">): CellKey {
  return `${lock.origin}-${proofPole(lock.band)}`
}

/** Figure name. Poles stay in it when the cell has no title. */
export function quadrantLabel(lock: Pick<Lock, "band" | "origin">) {
  const key = cellKey(lock)
  const cell = quadrant.cells[key]
  const poles = `${quadrant[lock.origin]}. ${quadrant[proofPole(lock.band)]}.`

  if (cell.names.length === 0) {
    return `${quadrant.you}. ${poles}`
  }

  return `${quadrant.you}. ${cell.names.join(". ")}. ${poles}`
}
