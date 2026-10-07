import assert from "node:assert/strict"
import test from "node:test"

import { companies } from "./companies.ts"
import { groupCompanies, type Company } from "./company.ts"

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
    ]
  )

  for (const company of companies) {
    assert.equal(company.href.startsWith("https://"), true)
    assert.ok(company.why.length > 0)
  }
})
