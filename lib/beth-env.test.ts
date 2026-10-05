import assert from "node:assert/strict"
import test from "node:test"

import { bethEnv } from "./beth-env.ts"

test("missing env keeps the TypeScript files", () => {
  assert.equal(bethEnv({}), null)
})

test("one public var is a broken setup", () => {
  assert.throws(() =>
    bethEnv({ NEXT_PUBLIC_SUPABASE_URL: "https://example.supabase.co" })
  )
  assert.throws(() =>
    bethEnv({ NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY: "sb_publishable_example" })
  )
})

test("both public vars point at Beth", () => {
  assert.deepEqual(
    bethEnv({
      NEXT_PUBLIC_SUPABASE_URL: "https://example.supabase.co",
      NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY: "sb_publishable_example",
    }),
    {
      url: "https://example.supabase.co",
      key: "sb_publishable_example",
    }
  )
})
