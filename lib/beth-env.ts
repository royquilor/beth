/**
 * Both public vars mean the page reads Beth.
 * Neither means the TypeScript files, so dev still runs before `.env.local` exists.
 * One of the two is a broken setup. That does not fall back to the files.
 */
export function bethEnv(
  env: Record<string, string | undefined> = process.env
): { url: string; key: string } | null {
  const url = env.NEXT_PUBLIC_SUPABASE_URL
  const key = env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY

  if (!url && !key) return null

  if (!url || !key) {
    throw new Error(
      "Beth needs both NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY."
    )
  }

  return { url, key }
}
