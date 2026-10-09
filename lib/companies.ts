import type { Company } from "@/lib/company"

/**
 * Companies on the page, 9 Oct 2026.
 * Europe, or a London office, or hiring in London.
 * Each row is the name, the description from that company's site, and the site.
 * Stage stays on a company that already had a public round. It is not shown.
 * Names left off this cut are recorded in roadmap.md.
 * A personal note does not belong on the row.
 */
export const companies: Company[] = [
  {
    id: "ashby",
    name: "Ashby",
    href: "https://www.ashbyhq.com",
    why: "Ashby’s all-in-one recruiting software consolidates your ATS, Analytics, Scheduling, and CRM",
  },
  {
    id: "elevenlabs",
    name: "ElevenLabs",
    href: "https://elevenlabs.io",
    why: "Create lifelike speech with our AI voice generator and voice agents platform. Access 5,000+ voices in 90+ languages with secure APIs and SDKs.",
    stage: "later",
    round: "Series C, Jan 2025",
    work: "remote",
    where: "Remote",
  },
  {
    id: "granola",
    name: "Granola",
    href: "https://www.granola.ai",
    why: "The AI notepad for back-to-back meetings. Notes, actions and memory. Without a meeting bot.",
    stage: "later",
    round: "Series C, Mar 2026",
    work: "room",
    where: "London, onsite",
  },
  {
    id: "wise",
    name: "Wise",
    href: "https://wise.com",
    why: "150+ countries, 40 currencies, one account. Save when you send, spend and manage your money internationally.",
    stage: "later",
    round: "Nasdaq, May 2026",
    where: "London",
  },
  {
    id: "yonder",
    name: "Yonder",
    href: "https://www.yonder.com",
    why: "Earn points on every purchase with Yonder’s debit and credit cards and redeem them for dining, flights, fitness, top brands, plus travel perks and no FX fees.",
  },
  {
    id: "dessn",
    name: "Dessn",
    href: "https://www.dessn.com",
    why: "Turn your production codebase into a collaborative design canvas. Explore ideas visually, prototype with real components, and ship merge-ready code.",
  },
  {
    id: "tldraw",
    name: "tldraw",
    href: "https://tldraw.com",
    why: "A free and instant virtual whiteboarding with online collaboration. No signup required. Works on all devices: mobile, tablets, and desktop.",
    stage: "later",
    round: "Series A, Apr 2025",
    work: "hybrid",
    where: "London, hybrid",
  },
  {
    id: "cal",
    name: "Cal.com",
    href: "https://cal.com",
    why: "A fully customizable scheduling software for individuals, businesses taking calls and developers building scheduling platforms where users meet users.",
  },
  {
    id: "figma",
    name: "Figma",
    href: "https://www.figma.com",
    why: "Figma is the canvas where design, code, and AI come together. From first idea to shipped product — go from concept to production with your whole team, in one place.",
    stage: "later",
  },
  {
    id: "recraft",
    name: "Recraft",
    href: "https://www.recraft.ai",
    why: "Recraft is a top-ranked text-to-image model and design platform for photorealism, vector generation, custom styles, mockups, and more.",
    stage: "later",
    round: "Series B, May 2025",
    where: "London",
  },
  {
    id: "conduct",
    name: "Conduct",
    href: "https://conduct.ai",
    why: "Conduct lets IT teams understand, modernise, and run their enterprise systems with AI - fast and with confidence. Starting with SAP. Extending to the entire enterprise stack.",
  },
  {
    id: "jack-and-jill",
    name: "Jack & Jill",
    href: "https://www.jackandjill.ai",
    why: "Jack is the AI agent for careers. Jill is the AI agent for hiring. Together they introduce remarkable people to ambitious companies.",
  },
  {
    id: "oxford-dynamics",
    name: "Oxford Dynamics",
    href: "https://oxdynamics.com",
    why: "Oxford Dynamics develops mission-ready, Sovereign AI Defence Systems that deliver intelligence and decision advantage across defence operations.",
    where: "Harwell",
  },
]
