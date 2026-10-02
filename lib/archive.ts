import type { ArchivedRole } from "@/lib/role"

/**
 * Roles that are no longer the posting we listed.
 * They stay here so a later pass does not bring them back as new.
 * Checked 2 Oct 2026.
 */
export const archive: ArchivedRole[] = [
  {
    id: "elevenlabs-creative",
    company: "ElevenLabs",
    title: "Design Engineer, Creative & Studio",
    band: "ship",
    prong: "frontend",
    seat: "team",
    href: "https://jobs.ashbyhq.com/elevenlabs/5494be31-7899-4f7a-b10f-4c49378b44ef",
    why: "Production frontend on Creative and Studio. They will grade the code.",
    where: "Remote",
    week: "2026-W40",
    off: "The same posting is now Frontend Leaning Engineer, Creative & Studio.",
  },
  {
    id: "ashby-junior",
    company: "Ashby",
    title: "Junior Design Engineer, Americas",
    band: "prototype",
    prong: "judgment",
    seat: "team",
    href: "https://jobs.ashbyhq.com/ashby/0f538da6-1e06-43f0-86cb-de8007814284",
    why: "Projects with a few users. They are not asking for a system other people hire.",
    salary: "$101,000–$170,000 plus equity",
    where: "Remote, United States",
    week: "2026-W40",
    off: "The posting is no longer on Ashby's board.",
  },
]
