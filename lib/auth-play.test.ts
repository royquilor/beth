import assert from "node:assert/strict"
import test from "node:test"

import { page } from "./catalog.ts"
import {
  authPlayEnabled,
  playLocal,
  playProviderStep,
  playStep,
  type PlayStep,
} from "./auth-play.ts"

function messageOf(step: PlayStep) {
  assert.equal(step.kind, "message")
  if (step.kind !== "message") return ""

  return step.message
}

function noteOf(step: PlayStep) {
  assert.equal(step.kind, "note")
  if (step.kind !== "note") return ""

  return step.note
}

test("play is on only for play=1 while developing", () => {
  assert.equal(authPlayEnabled("1", "development"), true)
  assert.equal(authPlayEnabled("1", "production"), false)
  assert.equal(authPlayEnabled("1", "test"), false)
  assert.equal(authPlayEnabled(null, "development"), false)
  assert.equal(authPlayEnabled("true", "development"), false)
})

test("the word before @ is the sentence, in any mode", () => {
  assert.equal(playLocal("Wrong@Example.com"), "wrong")
  assert.equal(messageOf(playStep("create", "wrong@example.com")), page.credentials)
  assert.equal(messageOf(playStep("sign-in", "taken@example.com")), page.alreadyAccount)
  assert.equal(messageOf(playStep("forgot", "weak@example.com")), page.weak)
  assert.equal(messageOf(playStep("recovery", "wait@example.com")), page.rate)
  assert.equal(messageOf(playStep("create", "fail@example.com")), page.authFailed)
})

test("any other address walks to the next step", () => {
  assert.equal(messageOf(playStep("create", "ada@example.com")), page.confirmSent)
  assert.equal(messageOf(playStep("forgot", "ada@example.com")), page.resetSent)
  assert.equal(noteOf(playStep("sign-in", "ada@example.com")), "This would open the questions.")
  assert.equal(noteOf(playStep("recovery", "")), "This would open the questions.")
})

test("a provider click names the provider and does not leave", () => {
  assert.equal(noteOf(playProviderStep("github", "ada@example.com")), "This would open GitHub.")
  assert.equal(noteOf(playProviderStep("google", "ada@example.com")), "This would open Google.")
  assert.equal(messageOf(playProviderStep("github", "fail@example.com")), page.authFailed)
})
