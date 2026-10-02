import type { Band, Prong, Seat } from "@/lib/place"

/**
 * A live posting, tagged by hand.
 * Band is read from the requirements, not from the word senior or staff.
 * A second prong is set only when the posting names it.
 * Salary and place are copied only when the company published them.
 * `week` is the ISO week the role entered the list, such as 2026-W40.
 */
export type Role = {
  id: string
  company: string
  title: string
  band: Band
  prong: Prong
  also?: Prong
  seat: Seat
  href: string
  why: string
  salary?: string
  where?: string
  week: string
}

/** A role that left the live list. `off` says why, in one sentence. */
export type ArchivedRole = Role & {
  off: string
}
