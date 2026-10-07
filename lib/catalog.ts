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
  questions: "Questions",
  companies: "Companies",
  theme: "Theme",
  light: "Light",
  dark: "Dark",
  system: "System",
  companiesLead:
    "Companies worth the work. A posting is optional. Pre-seed and seed stay, because a small team can take freelance.",
  companiesFoot:
    "Stage is the last public round. A company with no round stays on the list.",
  noRound: "No public round",
  site: "Site",
  siteFor(name: string) {
    return `${name} site`
  },
  skipLead:
    "No lock. Every role is listed. The band, the craft, and the seat open with the role.",
  nothingInRange: "Nothing in range",
  nothingAbove: "Nothing above",
  emptyRange:
    "No posting on this list assumes this band, this craft, and this seat.",
  emptyStretch: "Nothing above this band, in this craft and this seat.",
  emptyAll:
    "The list is empty. A dead role comes off, and nothing has replaced it.",
  emptySeat: "No role here grades this craft in this seat.",
  stretchLead:
    "Above the band. Still listed. Hiding them would lie about the title.",
  rangeLead:
    "At or below the band you can prove, in this craft, for this seat.",
  nextProof: "Next proof",
  aim: "Aim it at",
  thisWeek: "One piece, this week.",
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
  applyTo(company: string) {
    return `Apply to ${company}`
  },
  signIn: "Sign in",
  signOut: "Sign out",
  welcome: "Welcome back",
  email: "Email",
  emailAddress: "Email address",
  password: "Password",
  createAccount: "Create account",
  createTitle: "Create your account",
  creating: "Creating account",
  needAccount: "Create an account",
  haveAccount: "Already have an account?",
  logIn: "Log in",
  forgot: "Forgot password",
  forgotShort: "Forgot?",
  or: "or",
  termsLead: "By continuing you agree to our",
  terms: "Terms of Service",
  resetSent: "Check your email. The link sets a new password.",
  confirmSent: "Confirmation link sent to",
  resend: "Send the email again.",
  continueGitHub: "Continue with GitHub",
  continueGoogle: "Continue with Google",
  saveFailed: "The lock did not save. The questions are still here.",
  setPassword: "Set a new password",
  credentials: "That email and password do not match.",
  alreadyGitHub: "This email already signs in with GitHub.",
  alreadyGoogle: "This email already signs in with Google.",
  alreadyEmail: "This email already signs in with email and password.",
  alreadyAccount: "This email already has an account.",
  // This project rejects fewer than 6 characters. No other password rule is on.
  weak: "That password needs at least 6 characters.",
  rate: "Wait a moment, then try again.",
  authFailed: "Sign-in did not finish. Try again.",
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
  prong: ["systems"],
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
      {
        value: "team",
        label:
          "An engineer beside you holds backend and data. You hold spacing, text, colors, and a11y",
      },
      {
        value: "solo",
        label: "You are the only person on the interface",
      },
    ],
  },
  {
    id: "prong",
    prompt: "Which craft can you show?",
    note: "Pick any that are true.",
    multiple: true,
    options: [
      { value: "systems", label: "Systems" },
      { value: "motion", label: "Motion and brand" },
      { value: "judgment", label: "What to build, and the flow" },
      {
        value: "css",
        label: "HTML and CSS, in a pull request a developer reviews",
      },
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

/**
 * The quadrant. Two axes, four cells.
 * Left to right is where the work started. Top to bottom is what you can show.
 * Taste and Prototype are a file. Ship and Spike are a diff.
 * Seat and prong stay on the sentence. They do not move a cell.
 * Design and a file has two names people hire under.
 * Engineering and a file has no title people use.
 */
export const quadrant = {
  file: "A file",
  diff: "A diff",
  design: "Design",
  engineering: "Engineering",
  you: "You",
  cells: {
    "design-file": {
      names: ["Product designer", "UI designer"],
      people: ["Jenny Wen"],
    },
    "engineering-file": {
      names: [],
      people: [],
    },
    "design-diff": {
      names: ["Design engineer"],
      people: ["Rauno Freiberg", "Emil Kowalski", "Paco Coursey"],
    },
    "engineering-diff": {
      names: ["Frontend engineer"],
      people: ["Lee Robinson"],
    },
  },
} as const
