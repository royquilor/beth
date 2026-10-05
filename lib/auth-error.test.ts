import assert from "node:assert/strict"
import test from "node:test"

import { page } from "./catalog.ts"
import { mapAuthCode, safeAuthCode, sentenceForProvider } from "./auth-error.ts"

test("a known failure becomes a catalogue sentence", () => {
  assert.equal(mapAuthCode("invalid_credentials"), page.credentials)
  assert.equal(mapAuthCode("email_not_confirmed"), page.confirmSent)
  assert.equal(mapAuthCode("weak_password"), page.weak)
  assert.equal(mapAuthCode(null), null)
})

test("an existing email does not show the raw error", () => {
  assert.equal(mapAuthCode("email_exists"), page.alreadyAccount)
  assert.equal(mapAuthCode("identity_already_exists"), page.alreadyAccount)
  assert.equal(mapAuthCode("some-provider-stack-trace"), page.authFailed)
})

test("the provider is named only when the code is that provider", () => {
  assert.equal(sentenceForProvider("github"), page.alreadyGitHub)
  assert.equal(sentenceForProvider("google"), page.alreadyGoogle)
  assert.equal(sentenceForProvider("email"), page.alreadyEmail)
  assert.equal(sentenceForProvider("Email already registered with GitHub"), page.alreadyAccount)
})

test("the callback only keeps a known code", () => {
  assert.equal(safeAuthCode("email_not_confirmed"), "email_not_confirmed")
  assert.equal(safeAuthCode("<script>"), "failed")
})
