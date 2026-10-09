import assert from "node:assert/strict"
import test from "node:test"

import { pathAfterSignOut } from "./sign-out-path.ts"

test("a lock query returns to the questions", () => {
  assert.equal(
    pathAfterSignOut(
      "/?hands=merged&ships=prototype&show=merged&seat=team&prong=systems&prong=judgment&prong=css&origin=design"
    ),
    "/?questions=1"
  )
})

test("companies lands on the front page and skip stays put", () => {
  assert.equal(pathAfterSignOut("/?companies=1"), "/")
  assert.equal(pathAfterSignOut("/?skip=1"), "/?skip=1")
  assert.equal(pathAfterSignOut("/?questions=1"), "/?questions=1")
})

test("the app page goes to sign in", () => {
  assert.equal(pathAfterSignOut("/app"), "/login")
  assert.equal(pathAfterSignOut("/"), "/")
  assert.equal(pathAfterSignOut("https://evil.example"), "/")
})
