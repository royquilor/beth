import type { Band, Prong, Seat } from "@/lib/place"

/**
 * Live roles, tagged by hand.
 * Band is read from the requirements, not from the word senior or staff.
 * A second prong is set only when the posting names it.
 * Salary and place are copied only when the company published them.
 * Checked 29 Sep 2026. A closed role comes off.
 *
 * Watchlist with no design-engineer posting that day, so left off:
 * Polar, tldraw, WorkOS, Resend, Railway, Cursor, Notion, Lovable.
 */

export type Role = {
  id: string
  company: string
  title: string
  band: Band
  prong: Prong
  also?: Prong
  seat: Seat
  href: string
  why: string
  salary?: string
  where?: string
}

export const checkedOn = "29 Sep 2026"

export const roles: Role[] = [
  {
    id: "vercel-design-engineer",
    company: "Vercel",
    title: "Design Engineer",
    band: "ship",
    prong: "frontend",
    also: "judgment",
    seat: "team",
    href: "https://vercel.com/careers/design-engineer-us-6129441004",
    why: "Production UI in a product engineers already own. A prototype is not the proof they named.",
    salary: "$208,000–$312,000 in San Francisco",
    where: "Remote, United States",
  },
  {
    id: "linear-web-brand",
    company: "Linear",
    title: "Design Engineer (Web & Brand)",
    band: "ship",
    prong: "motion",
    also: "frontend",
    seat: "team",
    href: "https://linear.app/careers/f04f398b-6320-499d-8a60-290239d62da8",
    why: "Web and brand. They grade taste and shipped interactive pages.",
    where: "Remote, North America",
  },
  {
    id: "stripe-expansion",
    company: "Stripe",
    title: "Design Engineer, Expansion",
    band: "ship",
    prong: "motion",
    also: "systems",
    seat: "team",
    href: "https://stripe.com/jobs/search?gh_jid=8212314",
    why: "Campaign pages and the design system, beside people who already build the site.",
    where: "United States, Canada",
  },
  {
    id: "stripe-presence",
    company: "Stripe",
    title: "Design Engineer, Presence",
    band: "ship",
    prong: "motion",
    also: "systems",
    seat: "team",
    href: "https://stripe.com/jobs/search?gh_jid=7144975",
    why: "Brand surfaces and motion. The posting names the libraries other people consume.",
  },
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
  },
  {
    id: "coderabbit",
    company: "CodeRabbit",
    title: "Design Engineer",
    band: "ship",
    prong: "judgment",
    also: "systems",
    seat: "team",
    href: "https://jobs.ashbyhq.com/coderabbit/bb95e939-0da5-4480-b162-c6ae82db3c12",
    why: "Product UI across the editor, the CLI, and the web. Design systems are named.",
    salary: "$175,000–$225,000 plus equity",
    where: "San Francisco",
  },
  {
    id: "ramp",
    company: "Ramp",
    title: "Design Engineer",
    band: "ship",
    prong: "systems",
    also: "judgment",
    seat: "team",
    href: "https://jobs.ashbyhq.com/ramp/b68aca53-16c0-4ced-ab1d-e8beb2940b4f",
    why: "Shipped product UI, and components other people reuse.",
    salary: "$172,000–$440,000 plus equity",
    where: "New York, onsite",
  },
  {
    id: "circleback",
    company: "Circleback",
    title: "Founding Design Engineer",
    band: "spike",
    prong: "frontend",
    also: "systems",
    seat: "solo",
    href: "https://jobs.ashbyhq.com/circleback/832f884e-b912-41e0-988f-d5de0243ed04",
    why: "You would be the only person on the UI, across web and native.",
    salary: "$170,000–$280,000 plus equity",
    where: "San Francisco",
  },
  {
    id: "idler",
    company: "idler",
    title: "Design Engineer",
    band: "spike",
    prong: "judgment",
    also: "motion",
    seat: "solo",
    href: "https://jobs.ashbyhq.com/idler/199e6e98-c12f-494f-8cd1-eba950d45860",
    why: "You would own the visual system and the implementation.",
    salary: "$125,000–$300,000 plus equity",
    where: "San Francisco, onsite",
  },
  {
    id: "ashby-americas",
    company: "Ashby",
    title: "Design Engineer, Americas",
    band: "ship",
    prong: "judgment",
    also: "frontend",
    seat: "team",
    href: "https://jobs.ashbyhq.com/ashby/fd86edd7-3af0-4977-a61a-215212c296fa",
    why: "Design and code, shipped to users. Engineers are already on the team.",
    salary: "$126,000–$250,000 plus equity",
    where: "Remote, United States",
  },
  {
    id: "ashby-uk",
    company: "Ashby",
    title: "Design Engineer, UK",
    band: "ship",
    prong: "judgment",
    also: "frontend",
    seat: "team",
    href: "https://jobs.ashbyhq.com/Ashby/cb45928e-c7c7-4163-84d0-a962755a3593",
    why: "The same seat as the Americas posting. They expect code in production.",
    salary: "£56,000–£149,000 plus equity",
    where: "Remote, United Kingdom",
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
  },
  {
    id: "ternion",
    company: "Ternion",
    title: "Founding Design Engineer",
    band: "spike",
    prong: "frontend",
    also: "systems",
    seat: "solo",
    href: "https://jobs.ashbyhq.com/ternion-security/71c804a4-b005-4778-8f9e-16f5905781f0",
    why: "No designer on the team. The posting is the whole UI.",
    salary: "$170,000–$220,000 plus equity",
    where: "Greater Seattle, onsite",
  },
]
