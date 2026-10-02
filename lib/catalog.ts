import type { Answers, Band, Origin } from "@/lib/place"

/**
 * Voice and the six questions.
 * The questions are closed. They ask what shipped, not the title someone wants.
 * The worked example is Prototype, systems, engineers already on the team.
 * It does not promote that placement to a founding design engineer.
 */

export const page = {
  title: "Beth",
  dek: "Beth names the kind of design engineer you can prove, and the one piece that would change that.",
  questions: "? Questions",
  skipLead:
    "No lock. Every role is listed. The band, the prong, and the seat are on the card.",
  nothingInRange: "Nothing in range",
  nothingAbove: "Nothing above",
  emptyRange:
    "No posting on this list assumes this band, this prong, and this seat.",
  emptyStretch: "Nothing above this band, in this prong and this seat.",
  emptyAll:
    "The list is empty. A dead role comes off, and nothing has replaced it.",
  emptySeat: "No role here grades this prong in this seat.",
  stretchLead:
    "Above the band. Still listed. Hiding them would lie about the title.",
  rangeLead:
    "At or below the band you can prove, in this prong, for this seat.",
  nextProof: "Next proof",
  aim: "Aim it at",
  thisWeek: "One piece, this week.",
  seeRoles: "See the roles",
  workedExample: "Worked example",
  skip: "Skip. See every role.",
  seeAll: "See all roles",
  checkGaps: "Check gaps",
  gaps: "Gaps",
  again: "Answer again",
  every: "See every role",
  place: "Answer the six questions",
  lock: "Lock",
  next: "Next",
  back: "Back",
  inRange: "In range",
  stretch: "Stretch",
  assumes: "Assumes",
  apply: "Apply",
}

/**
 * Sits above the roles. It does not change the lock.
 * Jenny Wen: choose the team, the mission, and the approach,
 * and where you will have fun. The buzziest name resets.
 */
export const team = {
  title: "Choose the team",
  lead: "Pick the team, the mission, and the approach that fit, and where you will have fun. Not the buzziest name. Models move the product every few months, so the leaderboard resets. A seat taken for the hype will feel wrong once that cycle ends.",
  ask: "Ask this of each role.",
  questions: [
    "Does this team, this mission, and this way of working fit you?",
    "Will you have fun there?",
    "Would you still want the seat if they were not the name everyone is hiring?",
  ],
  credit: "Jenny Wen",
  href: "https://x.com/jenny_wen/status/2105304994614251886",
}

export const workedExample: Answers = {
  hands: "prototype",
  ships: "prototype",
  show: "prototype",
  seat: "team",
  prong: "systems",
  origin: "design",
}

type Proof = {
  line: string
  closer: string
  practice: string
}

export const proofs: Record<Band, Record<Origin, Proof>> = {
  taste: {
    design: {
      line: "Into the repo",
      closer: "Taste still has to get into a repo.",
      practice:
        "Put one token, or one component, in a repo a teammate can open.",
    },
    engineering: {
      line: "A decision someone adopts",
      closer: "The gap is judgment you can point at.",
      practice:
        "Write the type and the states for one component, and get someone else to use them.",
    },
  },
  prototype: {
    design: {
      line: "the last 10%",
      closer: "A merged care diff changes the lock.",
      practice:
        "A care diff merged in a real repo. Focus, a label, or a dependency refused.",
    },
    engineering: {
      line: "A decision someone adopts",
      closer: "The gap is a type and state decision someone else can adopt.",
      practice: "A type and state decision someone else can adopt.",
    },
  },
  ship: {
    design: {
      line: "One primitive, refused",
      closer: "The next proof is one primitive at your standard.",
      practice:
        "One primitive at your standard, in the repo, with one dependency you refused.",
    },
    engineering: {
      line: "A critique someone adopts",
      closer: "The gap is a critique someone else ships.",
      practice: "A component you refused, and a critique someone else ships.",
    },
  },
  spike: {
    design: {
      line: "Past the last 10%",
      closer: "This band is past the last 10%.",
      practice: "Keep one piece a stranger can open. The prong is the proof.",
    },
    engineering: {
      line: "Past the last 10%",
      closer: "This band is past the last 10%.",
      practice: "Keep one piece a stranger can open. The prong is the proof.",
    },
  },
}

export const questions = [
  {
    id: "hands",
    prompt: "Of the last five things you made, what left your hands?",
    note: "Pick any that are true.",
    multiple: true,
    options: [
      { value: "files", label: "A design file, such as Figma" },
      { value: "prototype", label: "A prototype" },
      { value: "merged", label: "A merged diff" },
    ],
  },
  {
    id: "ships",
    prompt: "When you build UI, what do you ship most?",
    options: [
      { value: "system", label: "A visual system" },
      { value: "prototype", label: "A prototype in code" },
      { value: "production", label: "Production components" },
    ],
  },
  {
    id: "show",
    prompt: "What can you show a stranger this week?",
    note: "Pick any that are true.",
    multiple: true,
    options: [
      { value: "file", label: "A design file, such as Figma" },
      { value: "prototype", label: "A prototype" },
      { value: "merged", label: "A merged diff" },
      { value: "used", label: "A system other people use" },
    ],
  },
  {
    id: "seat",
    prompt: "Which seat do you want?",
    options: [
      { value: "team", label: "Engineers beside you" },
      { value: "solo", label: "You are the only person on the UI" },
    ],
  },
  {
    id: "prong",
    prompt: "Which prong is the work you can show?",
    options: [
      { value: "systems", label: "Systems" },
      { value: "motion", label: "Motion and brand" },
      { value: "judgment", label: "Product judgment" },
      { value: "frontend", label: "Production frontend" },
    ],
  },
  {
    id: "origin",
    prompt: "Where did the work start?",
    options: [
      { value: "design", label: "Design" },
      { value: "engineering", label: "Engineering" },
    ],
  },
] as const
