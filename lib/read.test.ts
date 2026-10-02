import assert from "node:assert/strict"
import test from "node:test"

import { lockFrom, type Answers } from "./place.ts"
import { archive, roles } from "./roles.ts"
import {
  aimCompany,
  groupByWeek,
  lockSentence,
  practiceLine,
  shadeOf,
  weekLabel,
} from "./read.ts"

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

test("weeks group newest first, and a closed role stays off the list", () => {
  assert.equal(weekLabel("2026-W40"), "Week 40")

  const groups = groupByWeek([
    { ...roles[0], id: "older", week: "2026-W39", company: "Older" },
    { ...roles[0], id: "newer", week: "2026-W40", company: "Newer" },
  ])

  assert.deepEqual(
    groups.map((group) => group.week),
    ["2026-W40", "2026-W39"]
  )

  const live = new Set(roles.map((role) => role.id))
  for (const role of archive) {
    assert.equal(live.has(role.id), false)
  }
  assert.equal(
    roles.every((role) => role.week === "2026-W40"),
    true
  )
})

test("a named company points the practice and does not replace it", () => {
  const plain = practiceLine(lockFrom(roy))
  const aimed = practiceLine(lockFrom(roy), "Ramp")

  assert.equal(aimed.startsWith(plain), true)
  assert.match(aimed, /Aim it at Ramp\. One piece, this week\.$/)
})

test("the shade follows the fit", () => {
  const lock = lockFrom(roy)

  assert.equal(
    shadeOf(lock, {
      id: "in",
      company: "In",
      title: "Product Designer",
      band: "prototype",
      prong: "systems",
      seat: "team",
      href: "https://example.com",
      why: "In range.",
      week: "2026-W40",
    }),
    "▓"
  )
  assert.equal(
    shadeOf(lock, {
      id: "stretch",
      company: "Stretch",
      title: "Design Engineer",
      band: "ship",
      prong: "systems",
      seat: "team",
      href: "https://example.com",
      why: "Above the band.",
      week: "2026-W40",
    }),
    "▒"
  )
  assert.equal(
    shadeOf(lock, {
      id: "out",
      company: "Out",
      title: "Design Engineer",
      band: "prototype",
      prong: "systems",
      seat: "solo",
      href: "https://example.com",
      why: "A different seat.",
      week: "2026-W40",
    }),
    "░"
  )
})
