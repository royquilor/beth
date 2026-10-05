const lockKeys = ["hands", "ships", "show", "seat", "prong", "origin"]

/**
 * Where Sign out lands.
 * A lock in the query is this person's result, so it goes back to the questions.
 * Companies and Skip stay. /app has no public page, so it goes to sign in.
 */
export function pathAfterSignOut(next: string) {
  const path = next.startsWith("/") && !next.startsWith("//") ? next : "/"

  if (path === "/app" || path.startsWith("/app/") || path.startsWith("/app?")) {
    return "/login"
  }

  const queryAt = path.indexOf("?")
  if (queryAt === -1) return path

  const params = new URLSearchParams(path.slice(queryAt + 1))

  if (params.get("companies") === "1") return "/?companies=1"
  if (lockKeys.some((key) => params.has(key))) return "/"
  if (params.get("skip") === "1") return "/?skip=1"

  return path
}
