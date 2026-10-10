import assert from "node:assert/strict"
import test from "node:test"

import { companies } from "./companies.ts"
import {
  descriptionOf,
  groupCompanies,
  stageLine,
  withFileFields,
  type Company,
} from "./company.ts"

const sample: Company[] = [
  {
    id: "later",
    name: "Later",
    href: "https://later.example",
    why: "A later company.",
    stage: "later",
  },
  {
    id: "seed",
    name: "Seed",
    href: "https://seed.example",
    why: "A seed company.",
    stage: "seed",
  },
  {
    id: "open",
    name: "Open",
    href: "https://open.example",
    why: "No public round.",
  },
]

test("seed sits above later, and a missing stage stays on the list", () => {
  const groups = groupCompanies(sample)

  assert.deepEqual(
    groups.map((group) => group.stage),
    ["seed", "later", null]
  )
  assert.equal(groups.at(-1)?.companies[0]?.id, "open")
})

test("names sit in alphabetical order inside a stage", () => {
  const groups = groupCompanies([
    {
      id: "tldraw",
      name: "tldraw",
      href: "https://tldraw.example",
      why: "A later company.",
      stage: "later",
    },
    {
      id: "vercel",
      name: "Vercel",
      href: "https://vercel.example",
      why: "A later company.",
      stage: "later",
    },
    {
      id: "screen",
      name: "Screen Studio",
      href: "https://screen.example",
      why: "No public round.",
    },
    {
      id: "marker",
      name: "Marker",
      href: "https://marker.example",
      why: "No public round.",
    },
  ])

  assert.deepEqual(
    groups.map((group) => group.companies.map((company) => company.name)),
    [
      ["tldraw", "Vercel"],
      ["Marker", "Screen Studio"],
    ]
  )
})

test("the stage line is the series, and a missing round stays blank", () => {
  assert.equal(
    stageLine({
      id: "elevenlabs",
      name: "ElevenLabs",
      href: "https://elevenlabs.io",
      why: "A later company.",
      round: "Series C, Jan 2025",
    }),
    "Series C"
  )
  assert.equal(
    stageLine({
      id: "dessn",
      name: "Dessn",
      href: "https://www.dessn.com",
      why: "No public round.",
    }),
    undefined
  )
})

test("the company page is the Europe and London cut", () => {
  assert.deepEqual(
    companies.map((company) => company.id),
    [
      "ashby",
      "elevenlabs",
      "granola",
      "wise",
      "yonder",
      "dessn",
      "tldraw",
      "cal",
      "figma",
      "recraft",
      "conduct",
      "jack-and-jill",
      "oxford-dynamics",
      "stripe",
      "deel",
      "fin",
    ]
  )

  for (const company of companies) {
    assert.equal(company.href.startsWith("https://"), true)
    assert.ok(company.why.length > 0)
    assert.equal(typeof company.hiring, "boolean")
  }

  const closed = companies.filter((company) => company.hiring === false)
  assert.deepEqual(
    closed.map((company) => company.id),
    ["dessn"]
  )
  assert.equal(closed[0]?.careers, undefined)

  const tldraw = companies.find((company) => company.id === "tldraw")
  assert.equal(tldraw?.hiring, true)
  assert.equal(tldraw?.careers, "https://tldraw.dev/careers")

  const cal = companies.find((company) => company.id === "cal")
  assert.equal(cal?.lead?.name, "Matt")
  assert.equal(cal?.lead?.href, "https://x.com/uixmat")
  assert.equal(cal?.lead?.src, "/leads/uixmat.png")
  const named = companies.filter((company) => company.lead)
  assert.deepEqual(
    named.map((company) => company.id),
    ["cal"]
  )

  const cared = companies.filter((company) => company.fit)
  assert.deepEqual(
    cared.map((company) => company.id),
    [
      "ashby",
      "elevenlabs",
      "granola",
      "wise",
      "tldraw",
      "cal",
      "figma",
      "jack-and-jill",
      "stripe",
      "deel",
      "fin",
    ]
  )
  const plain = companies.filter((company) => company.fit === undefined)
  assert.deepEqual(
    plain.map((company) => company.id),
    ["yonder", "dessn", "recraft", "conduct", "oxford-dynamics"]
  )
  assert.equal(descriptionOf(cared[0]!), cared[0]?.fit)
  assert.equal(descriptionOf(plain[0]!), plain[0]?.why)

  const filed = companies.find((company) => company.id === "elevenlabs")
  const fromBeth: Company = {
    id: "elevenlabs",
    name: "ElevenLabs",
    href: "https://elevenlabs.io",
    why: "From Beth.",
  }
  const merged = withFileFields(fromBeth, filed!)
  assert.equal(merged.why, "From Beth.")
  assert.equal(merged.fit, filed?.fit)
  assert.equal(merged.hiring, true)

  for (const company of companies) {
    if (!company.careers) continue
    assert.equal(company.careers.startsWith("https://"), true)
  }
})
