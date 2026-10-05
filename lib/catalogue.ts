import { bethEnv } from "@/lib/beth-env"
import { companies as filedCompanies } from "@/lib/companies"
import type { Company } from "@/lib/company"
import type { Role } from "@/lib/role"
import { roles as filedRoles } from "@/lib/roles"
import { toCompany, toRole } from "@/lib/rows"
import { createClient } from "@/lib/supabase/server"

/**
 * Companies and live roles for the page.
 * Live roles are the ones whose `off` is null. Archived rows stay in Beth
 * and are not rendered.
 * Env set and a failed query throws. It does not fall back to the files.
 */
export async function loadCatalogue(): Promise<{
  companies: Company[]
  roles: Role[]
}> {
  if (!bethEnv()) {
    return { companies: filedCompanies, roles: filedRoles }
  }

  const supabase = await createClient()
  const companies = await supabase.from("companies").select("*")

  if (companies.error) {
    throw new Error(`Beth companies: ${companies.error.message}`)
  }

  const roles = await supabase.from("roles").select("*").is("off", null)

  if (roles.error) {
    throw new Error(`Beth roles: ${roles.error.message}`)
  }

  return {
    companies: (companies.data ?? []).map((row) => toCompany(row)),
    roles: (roles.data ?? []).map((row) => toRole(row)),
  }
}
