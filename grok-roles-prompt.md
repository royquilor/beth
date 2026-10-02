# Grok pass: product designer to design engineer

Paste the prompt below into Grok. Change `30 days` to `7 days` for the shorter pass.

It finds postings and the lines to tag by hand. It leaves the band, the craft, and the seat blank. Roy still tags those. Salary and place are copied only when the company published them.

When `lib/roles.ts` changes, update the “Already on my list” paragraph so the pass does not bring back roles that are already there.

## Prompt

Search X for hiring posts from the last 30 days. Find open roles from product designer through design engineer.

Include a posting when the title or the body is one of these:

- Product designer or UI designer, and the work is the interface: spacing, type, colour, layout. An engineer still holds backend and data. The proof they ask for is a file or a prototype.
- Design engineer, founding design engineer, or a close title where the person designs and ships UI.

Skip mechanical, hardware, and CAD “design engineer” roles. Skip brand-only and illustration-only roles. Skip backend, data, and full-stack roles that do not own the interface.

Already on my list, so only include them if the posting is a different role: Vercel Design Engineer, Linear Design Engineer (Web & Brand), Stripe Design Engineer Expansion, Stripe Design Engineer Presence, CodeRabbit Design Engineer, Ramp Design Engineer, Circleback Design Engineer, idler Design Engineer, Ashby Design Engineer Americas, Ashby Design Engineer UK, Ternion Founding Design Engineer (AI-Native), Granola Product Designer, Granola Design Engineer, ElevenLabs Product Designer, RevenueCat Senior Design Engineer, Figma Product Designer Roundtripping, Boski Founding Design Engineer.

Left the list, so do not bring them back unless the company posts them again: ElevenLabs Design Engineer Creative & Studio (the posting is now Frontend Leaning Engineer), Ashby Junior Design Engineer Americas.

Also check whether these companies posted a design-engineer or product-designer role: Polar, tldraw, WorkOS, Resend, Railway, Cursor, Notion, Lovable.

For each role, return only what the post or the linked job page states:

- Company
- Exact title
- Link to the X post, and the job URL if the post includes one
- Who posted, and the date
- Quoted lines that say what they will grade: a design file, a prototype, a merged diff, production UI, or a system other people use
- Quoted lines that say who else is on the team: an engineer beside them, or this person is the only one on the UI
- Quoted lines that name the craft, if any: systems, motion and brand, what to build and the flow, HTML and CSS in a reviewed pull request, production frontend
- Salary and place, copied only when the company published them. If they did not, write “not published”
- One sentence on why it might be product designer rather than design engineer, using their words

Do not assign a band. Do not assign a craft. Do not assign a seat. If the posting is vague, mark it “unsure” and still include the quotes. Do not invent a salary, a location, or a requirement that is not in the post.
