import {
  stages,
  works,
  type Company,
  type Stage,
  type Work,
} from "@/lib/company"
import {
  bands,
  prongs,
  seats,
  type Band,
  type Prong,
  type Seat,
} from "@/lib/place"
import type { Role } from "@/lib/role"

/**
 * Beth stores a blank as null. The page treats a blank as a field left off.
 * `created_at`, `updated_at`, and `off` never reach a component.
 * A value outside a closed list throws. The page does not guess a band.
 */

function recordOf(row: unknown): Record<string, unknown> {
  if (row && typeof row === "object" && !Array.isArray(row)) {
    return row as Record<string, unknown>
  }

  throw new Error("Beth returned a row that is not a record.")
}

function text(value: unknown, field: string) {
  if (typeof value === "string" && value.length > 0) return value
  throw new Error(`Beth row is missing ${field}.`)
}

function optionalText(value: unknown) {
  if (value == null) return undefined
  if (typeof value === "string") return value
  throw new Error("Beth row has a value that is not text.")
}

function closed<T extends string>(
  value: unknown,
  allowed: readonly T[],
  field: string
): T {
  if (typeof value === "string" && allowed.includes(value as T)) {
    return value as T
  }

  throw new Error(`Beth row has a ${field} outside the closed list.`)
}

function optionalClosed<T extends string>(
  value: unknown,
  allowed: readonly T[],
  field: string
): T | undefined {
  if (value == null) return undefined
  return closed(value, allowed, field)
}

export function toCompany(row: unknown): Company {
  const record = recordOf(row)

  return {
    id: text(record.id, "id"),
    name: text(record.name, "name"),
    href: text(record.href, "href"),
    why: text(record.why, "why"),
    stage: optionalClosed<Stage>(record.stage, stages, "stage"),
    round: optionalText(record.round),
    work: optionalClosed<Work>(record.work, works, "work"),
    // The column is quoted in Postgres because `where` is reserved.
    where: optionalText(record.where),
  }
}

export function toRole(row: unknown): Role {
  const record = recordOf(row)

  return {
    id: text(record.id, "id"),
    company: text(record.company, "company"),
    title: text(record.title, "title"),
    band: closed<Band>(record.band, bands, "band"),
    prong: closed<Prong>(record.prong, prongs, "prong"),
    also: optionalClosed<Prong>(record.also, prongs, "also"),
    seat: closed<Seat>(record.seat, seats, "seat"),
    href: text(record.href, "href"),
    why: text(record.why, "why"),
    salary: optionalText(record.salary),
    where: optionalText(record.where),
    week: text(record.week, "week"),
  }
}
