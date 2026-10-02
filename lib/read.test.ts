import assert from "node:assert/strict"
import test from "node:test"

import { lockFrom, type Answers } from "./place.ts"
import { aimCompany, lockSentence, practiceLine } from "./read.ts"

const roy: Answers = {
  hands: "prototype",
  ships: "prototype",
  show: "prototype",
  seat: "team",
  prong: ["systems"],
  origin: "design",
}

test("the result sentence names the kind, not a job", () => {
  assert.equal(
    lockSentence(lockFrom(roy)),
    "You can prove Prototype, in systems, with engineers beside you. The work started in design."
  )
})

test("a solo engineering origin stays in the same sentence shape", () => {
  assert.equal(
    lockSentence(
      lockFrom({
        ...roy,
        seat: "solo",
        origin: "engineering",
        prong: ["frontend"],
      })
    ),
    "You can prove Prototype, in production frontend, as the only person on the UI. The work started in engineering."
  )
})

test("two crafts stay separate in the sentence", () => {
  assert.equal(
    lockSentence(lockFrom({ ...roy, prong: ["css", "frontend"] })),
    "You can prove Prototype, in HTML and CSS, and production frontend, with engineers beside you. The work started in design."
  )
})

test("the piece aims at the stretch company first", () => {
  assert.equal(
    aimCompany([{ company: "Ramp" }], [{ company: "Ashby" }]),
    "Ramp"
  )
  assert.equal(aimCompany([], [{ company: "Ashby" }]), "Ashby")
  assert.equal(aimCompany([], []), undefined)
})

test("a named company points the practice and does not replace it", () => {
  const plain = practiceLine(lockFrom(roy))
  const aimed = practiceLine(lockFrom(roy), "Ramp")

  assert.equal(aimed.startsWith(plain), true)
  assert.match(aimed, /Aim it at Ramp\. One piece, this week\.$/)
})
