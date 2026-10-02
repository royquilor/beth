import { archive } from "@/lib/archive"
import { week40 } from "@/lib/lists/2026-w40"

/**
 * Live roles. Each Friday pass confirms the company page, adds the new
 * week file, and moves a closed posting to the archive.
 * A model does not write the band. Roy tags the band, the craft, and the seat.
 */
export const checkedOn = "2 Oct 2026"

export const roles = [...week40]

export { archive }
export type { ArchivedRole, Role } from "@/lib/role"
