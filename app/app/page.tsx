import { redirect } from "next/navigation"

import { Frame } from "@/components/frame"
import { Locked } from "@/components/locked"
import { Questions } from "@/components/questions"
import { loadCatalogue } from "@/lib/catalogue"
import { page } from "@/lib/catalog"
import { bethEnv } from "@/lib/beth-env"
import { loadSavedLock } from "@/lib/load-lock"

/**
 * A signed-in visit with no query shows that person's lock.
 * No saved row means the six questions. The band is still lockFrom.
 */
export default async function AppPage() {
  if (!bethEnv()) redirect("/")

  const catalogue = await loadCatalogue()
  const answers = await loadSavedLock()

  return (
    <Frame signedIn next="/app" dek={answers ? null : page.dek}>
      {answers ? (
        <Locked answers={answers} roles={catalogue.roles} />
      ) : (
        <Questions signedIn />
      )}
    </Frame>
  )
}
