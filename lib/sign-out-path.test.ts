import assert from "node:assert/strict"
import test from "node:test"

import { pathAfterSignOut } from "./sign-out-path.ts"

test("a lock query returns to the questions", () => {
  assert.equal(
    pathAfterSignOut(
      "/?hands=merged&ships=prototype&show=merged&seat=team&prong=systems&prong=judgment&prong=css&origin=design"
    ),
    "/"
  )
})

test("companies and skip stay put", () => {
  assert.equal(pathAfterSignOut("/?companies=1"), "/?companies=1")
  assert.equal(pathAfterSignOut("/?skip=1"), "/?skip=1")
})

test("the app page goes to sign in", () => {
  assert.equal(pathAfterSignOut("/app"), "/login")
  assert.equal(pathAfterSignOut("/"), "/")
  assert.equal(pathAfterSignOut("https://evil.example"), "/")
})
