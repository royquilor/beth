/**
 * Placement rules for Beth.
 * Bands are proof someone can open. Not junior, mid, or senior.
 *
 * The first three answers set the band, and the lowest of them wins.
 * Hands and show can name more than one proof. The strongest of those counts.
 * Craft can name more than one kind of work. Every selected craft counts.
 * Spike is the one exception: a system other people use, a merged diff that left
 * their hands, and production components as what they ship most.
 * Seat, craft, and origin never raise the band.
 * Origin only picks the practice.
 */

export const bands = ["taste", "prototype", "ship", "spike"] as const
export type Band = (typeof bands)[number]

export const prongs = ["systems", "motion", "judgment", "css", "frontend"] as const
export type Prong = (typeof prongs)[number]

export const seats = ["team", "solo"] as const
export type Seat = (typeof seats)[number]

export const origins = ["design", "engineering"] as const
export type Origin = (typeof origins)[number]

export const handsValues = ["files", "prototype", "merged"] as const
export type Hands = (typeof handsValues)[number]

export const shipsValues = ["system", "prototype", "production"] as const
export type Ships = (typeof shipsValues)[number]

export const showValues = ["file", "prototype", "merged", "used"] as const
export type Show = (typeof showValues)[number]

export type Answers = {
  hands: Hands
  ships: Ships
  show: Show
  seat: Seat
  prong: Prong[]
  origin: Origin
}

export type Lock = {
  band: Band
  prong: Prong[]
  seat: Seat
  origin: Origin
}

export type Fit = "in" | "stretch" | "out"

type SearchValue = string | string[] | undefined

const handsRank: Record<Hands, number> = {
  files: 0,
  prototype: 1,
  merged: 2,
}

const shipsRank: Record<Ships, number> = {
  system: 0,
  prototype: 1,
  production: 2,
}

// "A system other people use" stays at Ship until the spike exception below.
const showRank: Record<Show, number> = {
  file: 0,
  prototype: 1,
  merged: 2,
  used: 2,
}

export function bandFrom(
  answers: Pick<Answers, "hands" | "ships" | "show">
): Band {
  let rank = Math.min(
    handsRank[answers.hands],
    shipsRank[answers.ships],
    showRank[answers.show]
  )

  const spike =
    answers.show === "used" &&
    answers.hands === "merged" &&
    answers.ships === "production"

  if (spike) {
    rank = 3
  }

  return bands[rank] ?? "taste"
}

export function lockFrom(answers: Answers): Lock {
  return {
    band: bandFrom(answers),
    prong: answers.prong,
    seat: answers.seat,
    origin: answers.origin,
  }
}

export function bandRank(band: Band) {
  return bands.indexOf(band)
}

type Tagged = {
  band: Band
  prong: Prong
  also?: Prong
  seat: Seat
}

/**
 * In range: a selected craft, same seat, assumed band at or below the lock.
 * Stretch: a selected craft and the same seat, posting assumes a higher band.
 * A second craft on the posting counts only when the posting names it.
 * Prototype is enough beside engineers.
 * It is not enough if they would be the only person on the UI.
 */
export function fitOf(lock: Lock, role: Tagged): Fit {
  const prongOk =
    lock.prong.includes(role.prong) ||
    (role.also !== undefined && lock.prong.includes(role.also))

  if (!prongOk || role.seat !== lock.seat) {
    return "out"
  }

  const person = bandRank(lock.band)
  const assumed = bandRank(role.band)
  const soloTooSoon = lock.seat === "solo" && person < bandRank("ship")

  if (soloTooSoon || assumed > person) {
    return "stretch"
  }

  return "in"
}

function list(value: SearchValue) {
  return Array.isArray(value) ? value : value ? [value] : []
}

function first(value: SearchValue) {
  return list(value)[0]
}

/** Strongest selected proof. Ticking a lower one does not pull the band down. A tie prefers `used`. */
export function strongestProof<T extends string>(
  value: SearchValue,
  allowed: readonly T[],
  rank: Record<T, number>,
  prefer?: T
): T | null {
  const picked = list(value).filter((item): item is T =>
    (allowed as readonly string[]).includes(item)
  )

  if (picked.length === 0) return null

  return picked.reduce((best, item) =>
    rank[item] > rank[best] || (item === prefer && rank[item] === rank[best])
      ? item
      : best
  )
}

export function handsProof(value: SearchValue) {
  return strongestProof(value, handsValues, handsRank)
}

export function showProof(value: SearchValue) {
  return strongestProof(value, showValues, showRank, "used")
}

/** Every selected craft, in catalog order. A second tick does not drop the first. */
export function prongProof(value: SearchValue): Prong[] | null {
  const picked = list(value).filter((item): item is Prong =>
    (prongs as readonly string[]).includes(item)
  )
  const crafts = prongs.filter((item) => picked.includes(item))

  return crafts.length > 0 ? crafts : null
}

function oneOf<T extends string>(
  value: SearchValue,
  allowed: readonly T[]
): T | null {
  const raw = first(value)
  return raw && (allowed as readonly string[]).includes(raw) ? (raw as T) : null
}

export function parseAnswers(
  params: Record<string, SearchValue>
): Answers | null {
  const hands = handsProof(params.hands)
  const ships = oneOf(params.ships, shipsValues)
  const show = showProof(params.show)
  const seat = oneOf(params.seat, seats)
  const prong = prongProof(params.prong)
  const origin = oneOf(params.origin, origins)

  if (!hands || !ships || !show || !seat || !prong || !origin) {
    return null
  }

  return { hands, ships, show, seat, prong, origin }
}
