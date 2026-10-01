import { page, proofs } from "@/lib/catalog"
import {
  bandRank,
  fitOf,
  type Band,
  type Lock,
  type Prong,
  type Seat,
} from "@/lib/place"
import { roles, type Role } from "@/lib/roles"

export const bandLabel: Record<Band, string> = {
  taste: "Taste",
  prototype: "Prototype",
  ship: "Ship",
  spike: "Spike",
}

export const prongLabel: Record<Prong, string> = {
  systems: "systems",
  motion: "motion and brand",
  judgment: "product judgment",
  frontend: "production frontend",
}

export const seatLabel: Record<Seat, string> = {
  team: "team present",
  solo: "only person on the UI",
}

export const prongBadge: Record<Prong, string> = {
  systems: "Systems",
  motion: "Motion",
  judgment: "Judgment",
  frontend: "Frontend",
}

export const seatBadge: Record<Seat, string> = {
  team: "Team",
  solo: "Only UI",
}

export function proofFor(lock: Lock) {
  return proofs[lock.band][lock.origin]
}

function subject(lock: Lock) {
  const seat =
    lock.seat === "team"
      ? "a team that already has engineers"
      : "the only person on the UI"

  return `${bandLabel[lock.band]}, ${prongLabel[lock.prong]}, and ${seat}`
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

function byBand(a: Role, b: Role) {
  return bandRank(a.band) - bandRank(b.band) || a.company.localeCompare(b.company)
}

export function splitRoles(lock: Lock) {
  const inRange: Role[] = []
  const stretch: Role[] = []

  for (const role of roles) {
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

export function everyRole() {
  return [...roles].sort(byBand)
}

export function metaLine(role: Role) {
  return [role.salary, role.where].filter(Boolean).join(" · ")
}

export { page }
