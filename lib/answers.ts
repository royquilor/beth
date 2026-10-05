import {
  handsValues,
  origins,
  parseAnswers,
  prongs,
  seats,
  shipsValues,
  showValues,
  type Answers,
} from "@/lib/place"

/**
 * One saved row, after user_id and updated_at are dropped.
 * A value outside the closed lists throws. The page does not guess a band.
 */
export type AnswerRow = {
  hands: string
  ships: string
  show: string
  seat: string
  origin: string
  prong: string[]
}

function closed(value: string, allowed: readonly string[]) {
  return allowed.includes(value)
}

export function answersFromRow(row: AnswerRow): Answers {
  const prong = Array.isArray(row.prong) ? row.prong : []
  const inLists =
    closed(row.hands, handsValues) &&
    closed(row.ships, shipsValues) &&
    closed(row.show, showValues) &&
    closed(row.seat, seats) &&
    closed(row.origin, origins) &&
    prong.length > 0 &&
    prong.every((item) => closed(item, prongs))

  const answers = inLists ? parseAnswers({ ...row, prong }) : null

  if (!answers) {
    throw new Error("The saved lock has a value outside the closed lists.")
  }

  return answers
}
