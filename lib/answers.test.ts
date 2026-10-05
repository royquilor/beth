import assert from "node:assert/strict"
import test from "node:test"

import { answersFromRow } from "./answers.ts"

const row = {
  hands: "prototype",
  ships: "prototype",
  show: "prototype",
  seat: "team",
  origin: "design",
  prong: ["systems", "css"],
}

test("a saved row uses the same closed lists as the URL", () => {
  assert.deepEqual(answersFromRow(row), {
    hands: "prototype",
    ships: "prototype",
    show: "prototype",
    seat: "team",
    origin: "design",
    prong: ["systems", "css"],
  })
})

test("a value outside the lists throws", () => {
  assert.throws(() => answersFromRow({ ...row, hands: "senior" }))
  assert.throws(() => answersFromRow({ ...row, prong: ["systems", "brand"] }))
})
