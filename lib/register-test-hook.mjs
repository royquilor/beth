import { register } from "node:module"

// Node's test runner cannot resolve the @/ alias Next uses.
// This hook is only for `node --test`. The app does not load it.
const root = new URL("..", import.meta.url).href

const hook = `
export async function resolve(specifier, context, nextResolve) {
  if (specifier.startsWith("@/")) {
    const file = new URL(${JSON.stringify(root)} + specifier.slice(2) + ".ts")
    return nextResolve(file.href, context)
  }
  return nextResolve(specifier, context)
}
`

register("data:text/javascript," + encodeURIComponent(hook))
