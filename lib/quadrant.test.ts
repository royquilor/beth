import assert from "node:assert/strict"
import test from "node:test"

import { lockFrom, type Answers } from "./place.ts"
import { cellKey, proofPole, quadrantLabel } from "./quadrant.ts"

const roy: Answers = {
  hands: "prototype",
  ships: "prototype",
  show: "prototype",
  seat: "team",
  prong: ["systems"],
  origin: "design",
}

test("taste and prototype are a file", () => {
  assert.equal(proofPole("taste"), "file")
  assert.equal(proofPole("prototype"), "file")
})

test("ship and spike are a diff", () => {
  assert.equal(proofPole("ship"), "diff")
  assert.equal(proofPole("spike"), "diff")
})

test("the worked example lands in design and a file", () => {
  assert.equal(cellKey(lockFrom(roy)), "design-file")
  assert.equal(
    quadrantLabel(lockFrom(roy)),
    "You. Product designer. UI designer. Design. A file."
  )
})

test("seat and prong do not move the cell", () => {
  assert.equal(
    cellKey(lockFrom({ ...roy, seat: "solo", prong: ["frontend"] })),
    cellKey(lockFrom(roy))
  )
})

test("engineering origin uses the other column", () => {
  assert.equal(
    cellKey(lockFrom({ ...roy, origin: "engineering" })),
    "engineering-file"
  )
  assert.equal(
    quadrantLabel(lockFrom({ ...roy, origin: "engineering" })),
    "You. Engineering. A file."
  )
})

test("a merged production proof is a diff", () => {
  assert.equal(
    cellKey(
      lockFrom({
        ...roy,
        hands: "merged",
        ships: "production",
        show: "merged",
      })
    ),
    "design-diff"
  )
})
