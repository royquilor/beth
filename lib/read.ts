import { page, proofs } from "@/lib/catalog"
import {
  bandRank,
  fitOf,
  type Band,
  type Fit,
  type Lock,
  type Prong,
  type Seat,
} from "@/lib/place"
import type { Role } from "@/lib/roles"

export const bandLabel: Record<Band, string> = {
  taste: "Taste",
  prototype: "Prototype",
  ship: "Ship",
  spike: "Spike",
}

export const prongLabel: Record<Prong, string> = {
  systems: "systems",
  motion: "motion and brand",
  judgment: "what to build and the flow",
  css: "HTML and CSS",
  frontend: "production frontend",
}

export const seatLabel: Record<Seat, string> = {
  team: "team present",
  solo: "only person on the UI",
}

export const prongBadge: Record<Prong, string> = {
  systems: "Systems",
  motion: "Motion",
  judgment: "Product",
  css: "CSS",
  frontend: "Frontend",
}

/** Catalog order. Two crafts stay distinct when one label already contains "and". */
export function craftPhrase(crafts: Prong[]) {
  const labels = crafts.map((craft) => prongLabel[craft])

  if (labels.length <= 1) return labels[0] ?? ""
  if (labels.length === 2) return `${labels[0]}, and ${labels[1]}`

  return `${labels.slice(0, -1).join(", ")}, and ${labels[labels.length - 1]}`
}

export const seatBadge: Record<Seat, string> = {
  team: "Team",
  solo: "Only UI",
}

export function proofFor(lock: Lock) {
  return proofs[lock.band][lock.origin]
}

/**
 * First line of a finished result.
 * Band, prong, seat, and origin. It does not name a job.
 * The band is still the one lockFrom already set.
 */
export function lockSentence(lock: Lock) {
  const seat =
    lock.seat === "team"
      ? "with engineers beside you"
      : "as the only person on the UI"

  const origin =
    lock.origin === "design"
      ? "The work started in design."
      : "The work started in engineering."

  return `You can prove ${bandLabel[lock.band]}, in ${craftPhrase(lock.prong)}, ${seat}. ${origin}`
}

/**
 * Prefer a stretch role. That posting is the next band, so the piece aims there.
 * If nothing sits above, use the first in-range company, a place the piece can land.
 * No company leaves the catalog practice unchanged.
 */
export function aimCompany(
  stretch: { company: string }[],
  inRange: { company: string }[]
) {
  return stretch[0]?.company ?? inRange[0]?.company
}

/** One proof. A company name points it. It does not raise the band. */
export function practiceLine(lock: Lock, company?: string) {
  const practice = proofFor(lock).practice

  if (!company) {
    return practice
  }

  return `${practice} ${page.aim} ${company}. ${page.thisWeek}`
}

function subject(lock: Lock) {
  const seat =
    lock.seat === "team"
      ? "a team that already has engineers"
      : "the only person on the UI"

  return `${bandLabel[lock.band]}, ${craftPhrase(lock.prong)}, and ${seat}`
}

export function countSentence(lock: Lock, inRange: number, stretch: number) {
  const match =
    inRange === 0
      ? `No role here is written for ${subject(lock)}.`
      : inRange === 1
        ? `One role is written for ${subject(lock)}.`
        : `${inRange} roles are written for ${subject(lock)}.`

  const above =
    inRange === 0 && stretch > 0
      ? stretch === 1
        ? " One assumes a higher band."
        : ` ${stretch} assume a higher band.`
      : ""

  return `${match}${above} ${proofFor(lock).closer}`
}

/**
 * Darker is closer to the lock.
 * ▓ is in range. ▒ is the next band. ░ does not match this craft or this seat.
 */
export const shadeForFit: Record<Fit, string> = {
  in: "▓",
  stretch: "▒",
  out: "░",
}

export function shadeOf(lock: Lock, role: Role) {
  return shadeForFit[fitOf(lock, role)]
}

function byBand(a: Role, b: Role) {
  return (
    bandRank(a.band) - bandRank(b.band) || a.company.localeCompare(b.company)
  )
}

/** "2026-W40" renders as Week 40. Newer weeks sit above older ones. */
export function weekLabel(week: string) {
  const match = /^(\d{4})-W(\d{2})$/.exec(week)
  if (!match) return week
  return `Week ${Number(match[2])}`
}

export function groupByWeek(list: Role[]) {
  const sorted = [...list].sort((a, b) => {
    if (a.week !== b.week) return b.week.localeCompare(a.week)
    return byBand(a, b)
  })
  const groups: { week: string; roles: Role[] }[] = []

  for (const role of sorted) {
    const last = groups.at(-1)

    if (last && last.week === role.week) {
      last.roles.push(role)
    } else {
      groups.push({ week: role.week, roles: [role] })
    }
  }

  return groups
}

/** The list is the live roles for this render. The function does not close over the file. */
export function splitRoles(lock: Lock, list: Role[]) {
  const inRange: Role[] = []
  const stretch: Role[] = []

  for (const role of list) {
    const fit = fitOf(lock, role)

    if (fit === "in") {
      inRange.push(role)
    }

    if (fit === "stretch") {
      stretch.push(role)
    }
  }

  return {
    inRange: inRange.sort(byBand),
    stretch: stretch.sort(byBand),
  }
}

/** Same list contract as splitRoles. Archived roles are already out of the list. */
export function everyRole(list: Role[]) {
  return [...list].sort(byBand)
}

export function metaLine(role: Role) {
  return [role.salary, role.where].filter(Boolean).join(" · ")
}

export { page }
