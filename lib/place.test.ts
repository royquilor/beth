import assert from "node:assert/strict"
import test from "node:test"

import { bandFrom, fitOf, lockFrom, type Answers } from "./place.ts"

const roy: Answers = {
  hands: "prototype",
  ships: "prototype",
  show: "prototype",
  seat: "team",
  prong: "systems",
  origin: "design",
}

test("worked example stays at Prototype", () => {
  const lock = lockFrom(roy)
  assert.equal(lock.band, "prototype")
  assert.equal(lock.prong, "systems")
  assert.equal(lock.seat, "team")
  assert.equal(lock.origin, "design")
})

test("origin does not change the band", () => {
  assert.equal(bandFrom(roy), bandFrom({ ...roy, origin: "engineering" }))
})

test("lowest proof wins", () => {
  assert.equal(
    bandFrom({ hands: "files", ships: "production", show: "merged" }),
    "taste"
  )
  assert.equal(
    bandFrom({ hands: "merged", ships: "prototype", show: "merged" }),
    "prototype"
  )
  assert.equal(
    bandFrom({ hands: "merged", ships: "production", show: "merged" }),
    "ship"
  )
})

test("spike needs a merged diff and production components", () => {
  assert.equal(
    bandFrom({ hands: "merged", ships: "production", show: "used" }),
    "spike"
  )
  assert.equal(
    bandFrom({ hands: "prototype", ships: "production", show: "used" }),
    "prototype"
  )
  assert.equal(
    bandFrom({ hands: "merged", ships: "system", show: "used" }),
    "taste"
  )
})

test("prototype is not enough to be the only person on the UI", () => {
  const lock = lockFrom({ ...roy, seat: "solo", prong: "frontend" })
  assert.equal(
    fitOf(lock, {
      band: "prototype",
      prong: "frontend",
      seat: "solo",
    }),
    "stretch"
  )
  assert.equal(
    fitOf(lockFrom({ ...roy, prong: "frontend" }), {
      band: "ship",
      prong: "frontend",
      seat: "team",
    }),
    "stretch"
  )
  assert.equal(
    fitOf(lockFrom({ ...roy, hands: "merged", ships: "production", show: "merged", prong: "frontend" }), {
      band: "ship",
      prong: "frontend",
      seat: "team",
    }),
    "in"
  )
})

test("a named second prong counts, a different seat does not", () => {
  const lock = lockFrom(roy)
  assert.equal(
    fitOf(lock, {
      band: "ship",
      prong: "motion",
      also: "systems",
      seat: "team",
    }),
    "stretch"
  )
  assert.equal(
    fitOf(lock, {
      band: "prototype",
      prong: "systems",
      seat: "solo",
    }),
    "out"
  )
})
