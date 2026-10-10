import type { Company } from "@/lib/company"

/**
 * Companies on the page.
 * The first thirteen were filed by 9 Oct 2026.
 * Stripe and Deel were filed on 10 Oct 2026, after their own pages showed a design culture.
 * Europe, or a London office, or hiring in London, was the earlier cut.
 * From 10 Oct a new name has to show that design has a say.
 * Each row is the name, why a designer might care, and the site.
 * fit is that line, and only when the company's own page or posting shows a design culture.
 * A company with no fit keeps why, the short line from its site.
 * Read 10 Oct 2026. A missing fit is not a low score.
 * careers is the board Roy named. hiring was checked on 9 Oct 2026.
 * A closed board stays on the list. Dessn has no public careers page.
 * Stage is the series the company published. A missing round stays off the row.
 * Names left off this cut are recorded in roadmap.md.
 * A personal note does not belong on the row.
 */
export const companies: Company[] = [
  {
    id: "ashby",
    name: "Ashby",
    href: "https://www.ashbyhq.com",
    why: "Ashby’s all-in-one recruiting software consolidates your ATS, Analytics, Scheduling, and CRM",
    // Head of Product Design on the senior product designer posting. Design engineering group on the staff posting.
    fit: "Recruiting software with a head of product design and a design-engineering group the co-founder runs.",
    careers: "https://www.ashbyhq.com/careers",
    hiring: true,
    // Their post, 22 July 2025. Series D, $50 million.
    stage: "later",
    round: "Series D, Jul 2025",
  },
  {
    id: "elevenlabs",
    name: "ElevenLabs",
    href: "https://elevenlabs.io",
    why: "Create lifelike speech with our AI voice generator and voice agents platform. Access 5,000+ voices in 90+ languages with secure APIs and SDKs.",
    // Product designer posting names the design team, Nev Flynn, and frontend engineers.
    fit: "Voice AI company with a design team. Designers work with the design lead and frontend engineers.",
    careers: "https://elevenlabs.io/careers/positions",
    hiring: true,
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
    // Product designer posting: Sam, co-founder, is a designer, and the seat shapes the design culture.
    fit: "AI notepad with a designer as co-founder. The product design seat is there to shape the design culture.",
    careers: "https://www.granola.ai/jobs",
    hiring: true,
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
    // wise.design is their design site. It names product, content, visual, research, and design ops.
    fit: "Payments company with a public design site covering product, content, research, and visual design.",
    careers: "https://wise.jobs/",
    hiring: true,
    stage: "later",
    round: "Nasdaq, May 2026",
    where: "London",
  },
  {
    id: "yonder",
    name: "Yonder",
    href: "https://www.yonder.com",
    why: "Earn points on every purchase with Yonder’s debit and credit cards and redeem them for dining, flights, fitness, top brands, plus travel perks and no FX fees.",
    careers: "https://www.yonder.com/careers",
    hiring: true,
    // Their post names a £62.5M Series A and does not name a month.
    stage: "later",
    round: "Series A",
  },
  {
    id: "dessn",
    name: "Dessn",
    href: "https://www.dessn.com",
    why: "Turn your production codebase into a collaborative design canvas. Explore ideas visually, prototype with real components, and ship merge-ready code.",
    hiring: false,
  },
  {
    id: "tldraw",
    name: "tldraw",
    href: "https://tldraw.com",
    why: "A free and instant virtual whiteboarding with online collaboration. No signup required. Works on all devices: mobile, tablets, and desktop.",
    // Design engineer posting asks for a product designer who builds. It does not name a design lead.
    fit: "Infinite canvas hiring a design engineer, a product designer who builds.",
    careers: "https://tldraw.dev/careers",
    // Design Engineer is open on that page. London, onsite. Checked 9 Oct 2026.
    hiring: true,
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
    // Senior product design engineer posting: work with the head of product and a design engineer.
    fit: "Scheduling product. A design engineer works with the head of product, who also designs.",
    careers: "https://cal.com/jobs",
    hiring: true,
    // Their post, 9 September 2022. $25 million Series A.
    stage: "later",
    round: "Series A, Sep 2022",
    // Matt, Head of Product. Named 9 Oct 2026.
    lead: {
      name: "Matt",
      href: "https://x.com/uixmat",
      src: "/leads/uixmat.png",
    },
  },
  {
    id: "figma",
    name: "Figma",
    href: "https://www.figma.com",
    why: "Figma is the canvas where design, code, and AI come together. From first idea to shipped product — go from concept to production with your whole team, in one place.",
    // Their blog, 23 March 2023, names the design team and Noah Levin, head of design.
    fit: "The design tool. The company writes about its design team, and it has named a head of design.",
    careers: "https://www.figma.com/careers/#job-openings",
    hiring: true,
    stage: "later",
    // Their post of 13 August 2025. The NYSE listing was 31 July 2025.
    round: "NYSE, Jul 2025",
  },
  {
    id: "recraft",
    name: "Recraft",
    href: "https://www.recraft.ai",
    why: "Recraft is a top-ranked text-to-image model and design platform for photorealism, vector generation, custom styles, mockups, and more.",
    careers: "https://jobs.ashbyhq.com/recraft",
    hiring: true,
    stage: "later",
    round: "Series B, May 2025",
    where: "London",
  },
  {
    id: "conduct",
    name: "Conduct",
    href: "https://conduct.ai",
    why: "Conduct lets IT teams understand, modernise, and run their enterprise systems with AI - fast and with confidence. Starting with SAP. Extending to the entire enterprise stack.",
    careers: "https://conduct.ai/about#careers",
    hiring: true,
    // Their post, 17 June 2026. $60 million Series A.
    stage: "later",
    round: "Series A, Jun 2026",
  },
  {
    id: "jack-and-jill",
    name: "Jack & Jill",
    href: "https://www.jackandjill.ai",
    why: "Jack is the AI agent for careers. Jill is the AI agent for hiring. Together they introduce remarkable people to ambitious companies.",
    // About page names Max Murdoch and Tom Cavill as founding designers. No head of design on that page.
    fit: "Hiring product with two founding designers. No head of design is named.",
    careers: "https://www.jackandjill.ai/about-us#open-roles",
    hiring: true,
    // Their post, 15 September 2026. $40 million Series A.
    stage: "later",
    round: "Series A, Sep 2026",
  },
  {
    id: "oxford-dynamics",
    name: "Oxford Dynamics",
    href: "https://oxdynamics.com",
    why: "Oxford Dynamics develops mission-ready, Sovereign AI Defence Systems that deliver intelligence and decision advantage across defence operations.",
    careers: "https://oxdynamics.com/careers/",
    hiring: true,
    where: "Harwell",
  },
  {
    id: "stripe",
    name: "Stripe",
    href: "https://stripe.com",
    why: "Stripe is a financial services platform that helps all types of businesses accept payments, build flexible billing models and manage money movement.",
    // Sessions 2024 names Katie Dill, head of design. The 2026 design program manager posting names the design organisation. Design engineer posting asks them to prototype and build.
    fit: "Payments company with a named head of design, a design organisation, and design engineers.",
    careers: "https://stripe.com/careers/search?query=design",
    hiring: true,
    // Their post, 15 March 2023. Series I. The 2026 tender does not name a letter.
    stage: "later",
    round: "Series I, Mar 2023",
  },
  {
    id: "deel",
    name: "Deel",
    href: "https://www.deel.com",
    why: "Hire, pay, and manage teams in 150+ countries with Deel. Run global payroll, ensure compliance, and streamline HR operations—all on one powerful platform.",
    // Their blog names Muhammed Salim, director of product design. The design engineer posting says the seat ships in Figma and in code.
    fit: "Payroll company with a director of product design and a design engineer who ships in code.",
    careers: "https://www.deel.com/careers/",
    hiring: true,
    // Their post, 20 October 2025. $300 million Series E.
    stage: "later",
    round: "Series E, Oct 2025",
    // Careers page: work from anywhere.
    work: "remote",
  },
]
