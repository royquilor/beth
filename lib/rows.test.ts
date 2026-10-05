import assert from "node:assert/strict"
import test from "node:test"

import { toCompany, toRole } from "./rows.ts"

const stamps = {
  created_at: "2026-10-05T00:00:00Z",
  updated_at: "2026-10-05T00:00:00Z",
}

test("a blank stage stays off the company, and the timestamps stay off the row", () => {
  const company = toCompany({
    id: "marker",
    name: "Marker",
    href: "https://marker.page",
    why: "Writing.",
    stage: null,
    round: null,
    work: null,
    where: null,
    ...stamps,
  })

  assert.equal(company.stage, undefined)
  assert.equal(company.where, undefined)
  assert.equal("created_at" in company, false)
  assert.equal("updated_at" in company, false)
})

test("a live role keeps place and drops the archive sentence", () => {
  const role = toRole({
    id: "wise-credit",
    company: "Wise",
    title: "Product Designer",
    band: "taste",
    prong: "systems",
    also: null,
    seat: "team",
    href: "https://wise.jobs",
    why: "Journeys.",
    salary: null,
    where: "London",
    week: "2026-W40",
    off: null,
    ...stamps,
  })

  assert.equal(role.where, "London")
  assert.equal(role.also, undefined)
  assert.equal(role.salary, undefined)
  assert.equal("off" in role, false)
  assert.equal("created_at" in role, false)
})

test("a band outside the closed list is refused", () => {
  assert.throws(() =>
    toRole({
      id: "bad",
      company: "Wise",
      title: "Product Designer",
      band: "senior",
      prong: "systems",
      also: null,
      seat: "team",
      href: "https://wise.jobs",
      why: "Journeys.",
      salary: null,
      where: "London",
      week: "2026-W40",
      off: null,
    })
  )
})
