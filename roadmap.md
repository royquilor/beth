# Beth roadmap

Handoff for the next session. Product lives in this repo (`last/`). One public page. No auth, no database. Answers stay in the URL.

## Where we are

Commit `aec6a7f` on `main`. Dev server: `npm run dev` → http://localhost:3000.

The [Beth](https://www.figma.com/design/qyO4FMguMfbsb5Bb8iU2Ut/Beth) frames are the layout reference. Type and the column have moved on purpose since those frames: face is Open Runde (regular and medium) through `--font-sans`, body is `text-base` at 1rem, column is `max-w-md`. Do not put Departure Mono or the 16.5px size back. The mark is the 24px dithered dot tile in `components/mark.tsx`. The name is not set beside it. Page background is stone 50. Cards stay white.

Taste: `design.md`. Voice: `lib/catalog.ts`. Placement: `lib/place.ts`. Roles: `lib/roles.ts`.

### Screens

| State | URL | What shows |
| --- | --- | --- |
| Ask | `/` | Mark, dek, `***`, six questions, `***`, footer |
| Result | `/?hands=…` | Lock sentence, then the one next proof. Roles are a link under that. The dek is hidden here. |
| In range | same URL plus `roles=1` | The sentence and the proof, then the in-range list. Apply only |
| Above | same URL plus `view=all` | The sentence and the proof, then the stretch list. Used when nothing is in range |
| Skip | `/?skip=1` | Every role, no lock. The lead is the skip line. `? QUESTIONS` returns to `/` |

Skip is a mode, not “skip this question.” It lists every role with no band lock.

Shade marks on cards (`░` `▒` `▓`) step down the list. They are not a score.

The worked-example card (`components/lock-card.tsx`) matches the all-screens frame and is not mounted. The ask frame does not include it.

## Questions today

The ask screen uses the shadcn Questionnaire (`components/ui/questionnaire.tsx`). `components/questions.tsx` only wires the six questions, the URL, and Beth’s Skip mode. It does not restyle the component.

- Six closed questions in `lib/catalog.ts` (`questions`). Every item is `required`. Hands and show accept more than one proof. The strongest counts. The other four stay one choice.
- The component owns the step, the answers, progress, previous, and next. Next and Lock stay disabled until the current question is answered.
- Back appears after the first step. The last step label is `Lock`.
- Letter shortcuts are on: A, B, C, in choice order, on the current question. A letter selects. It does not advance. Numbers stay off.
- Submit writes each answer into the query string and routes to `/?hands=…`.
- `parseAnswers` in `lib/place.ts` reads that string. A partial or invalid query is treated as no answers.
- The face is Open Runde through `--font-sans`. The title uses `font-heading`, which points at the same token. Do not set a second face on the questionnaire.
- Beth’s Skip is a plain text link to `/?skip=1`. It is not a button, and it is not `QuestionnaireSkip`. That control is for an optional item left blank, and every question here is required. Back, Next, and Lock are the questionnaire actions at `size="lg"`.
- Hands and show use `multiple`. Seat, prong, origin, and what you ship most stay one choice.

## Done this session

Shipped in `aec6a7f`.

- Replaced the custom ask form with the shadcn Questionnaire. `@shadcn/react` is the dependency. `components/ui/questionnaire.tsx` is the installed component. `components/questions.tsx` only wires the catalog, the URL, and Skip.
- Back, Next, and Lock use the large button size. Skip is a plain text link.
- Column widened from `max-w-sm` to `max-w-md`.
- Face switched from Departure Mono to Open Runde. The 16.5px `text-base` override is gone, so body type is 1rem again. Pixel-font antialiasing overrides are gone.

## Next

Question 3, one sentence, for the NDA case. This is the thing to build next. The Open list waits.

Roy can show a design file, a prototype, or a merged diff. He also has a system other people use, and an NDA means he cannot show it to a stranger this week. Option D stays unchecked. The question is what he can show.

Add one text field on that question. The sentence says the system exists and is closed. A server sorts it into the closed show values: a design file, a prototype, or a merged diff. If the sort is unsure, show those choices. The sentence does not become D, and it does not become Spike. `lockFrom` still sets the band.

Jev is the right shape, because it picks from the list already published. An OpenAI call can do that same job if the output is one of those four values, or unsure. A chat that writes a band will disagree with `lockFrom`. Ten people, one short sentence each, is well under a dollar on a small model. The new cost is the server. This page has none today.

## Parked

A public URL is the same park. Portfolio, LinkedIn, or an X profile can confirm a closed answer. It cannot invent a band. Reading a bio, pinned posts, or a case study needs a server, and this page has none. When it is unparked, the same rule holds: sort the page into the closed values, and if the sort is unsure, show the choices.

## Direction (2 Oct 2026)

The result now leads with the lock and the one proof. A company name on that proof is the first stretch role, or the first in-range role if nothing sits above. The rest of this section is still not built. The page does not read a URL, and it does not speak to a founder who is hiring.

The board is the weakest first product. A design-engineer title is real at Vercel, Linear, and small studios. A board is two-sided. Candidates and paying employers have to exist before a listing matters, and sponsors do not show up for a new jobs site. The useful bit is the fit. Sell that. Add listings only after people are already paying to be assessed. The roles in `lib/roles.ts` can stay as proof the bands are real. They are not the thing someone pays for.

What people misunderstand is the job, not the application form. Beth’s first job is to say what a design engineer is, name the kinds, and say which kind this person is. The kinds are already the model: four prongs (systems, motion, judgment, frontend), two seats (engineers beside you, or you are the only person on the UI), two origins (the work started in design, or in engineering), and four bands of proof (taste, prototype, ship, spike). Founders and early teams collapse that into one hire.

Two people use the same lock.

- A designer wants to know if they qualify, which kind they are, the gaps, and the one practice that levels them up.
- A founder wants to hire “a design engineer” and may need something narrower: a person who can own spacing, hierarchy, layout, and colour, open a PR, and still sit next to an engineer when the feature includes backend and data.

Roy is the second case, from the inside. Look and feel, plus a PR, is design origin, team seat, and a band of taste or prototype. It is not the ship-plus-frontend posting Vercel grades. Saying that plainly is the product. A board that lists the Vercel role without that sentence sends the wrong person to apply.

The next proof should be small enough to finish. Standing out is one small project aimed at one company, not a portfolio site. A page of experiments is the artifact people delay. The practice line in `lib/catalog.ts` stays one proof. Point it at a named company and a piece that can ship this week. Do not ask for a portfolio.

The personal agent is the last product, not this one. Later, one agent is how you get the next product or service, first digital, then physical. Beth is the first skill that agent would run: place the person, name the kind, name the one gap. Do not build the agent in this repo.

## Open

Unranked, and not next. Next is the question 3 sentence. Do not treat the order below as priority.

- Look at the ask screen in the browser against the [Beth](https://www.figma.com/design/qyO4FMguMfbsb5Bb8iU2Ut/Beth) frames and note only what the questionnaire’s own layout still misses. Do not rebuild a custom form to close that gap. Placement does not move. The band is still `lockFrom` in `lib/place.ts`.
- Use [Dot Matrix](https://dotmatrix.zzzzshawn.cloud/) for the loader animations, and try to replicate the logo mark. The mark today is the 24px dithered dot tile in `components/mark.tsx`. The library is React, TypeScript, Tailwind, and shadcn. One install shape is `npx shadcn@latest add @dotmatrix/dotm-square-3`.
- A click on a job card should open more detail: the design team, their X profile, the head, and possibly leadership. This is richer data on each role in `lib/roles.ts`. Leave it until someone is paying for the fit. It makes the board better, and the board is not the first product.
- Explore product design roles for people who cannot take a design-engineer role. This is the founder case in Direction: they may need a person who owns the look and opens a PR, with an engineer still on the feature.
