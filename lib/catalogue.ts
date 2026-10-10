import { bethEnv } from "@/lib/beth-env"
import { companies as filedCompanies } from "@/lib/companies"
import { withFileFields, type Company } from "@/lib/company"
import type { Role } from "@/lib/role"
import { roles as filedRoles } from "@/lib/roles"
import { toCompany, toRole } from "@/lib/rows"
import { createClient } from "@/lib/supabase/server"

/**
 * The file is who appears on the company page.
 * A matching row in Beth fills that company.
 * A company left in the table, and absent from the file, stays off the page.
 * A name in the file and missing from Beth uses the file.
 * Env set and a failed query throws. It does not fall back to the files.
 */
function companiesOnPage(fromBeth: Company[]): Company[] {
  const byId = new Map(fromBeth.map((company) => [company.id, company]))

  return filedCompanies.map((company) => {
    const fromBeth = byId.get(company.id)
    if (!fromBeth) return company

    // Beth fills the published fields. The careers link, the hiring
    // mark, the person to follow, and the design line stay on the file.
    return withFileFields(fromBeth, company)
  })
}

/**
 * Companies and live roles for the page.
 * Live roles are the ones whose `off` is null. Archived rows stay in Beth
 * and are not rendered.
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
    companies: companiesOnPage(
      (companies.data ?? []).map((row) => toCompany(row))
    ),
    roles: (roles.data ?? []).map((row) => toRole(row)),
  }
}
