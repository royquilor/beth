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

test("every filed company has a site and a reason", () => {
  assert.ok(companies.length > 0)

  for (const company of companies) {
    assert.equal(company.href.startsWith("https://"), true)
    assert.ok(company.why.length > 0)
  }
})
