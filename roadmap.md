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
| No match | `/?hands=…` when nothing is in range | Dashed empty state. See all roles. Check gaps |
| See all roles | same URL plus `view=all` | Stretch list. Each card has Apply and Gaps |
| In range | same URL when roles match | In-range list. Apply only |
| Gaps | `gaps=1` | The one next proof, under the list or the empty state |
| Skip | `/?skip=1` | Every role, no lock. `? QUESTIONS` returns to `/` |

Skip is a mode, not “skip this question.” It lists every role with no band lock.

Shade marks on cards (`░` `▒` `▓`) step down the list. They are not a score.

The worked-example card (`components/lock-card.tsx`) matches the all-screens frame and is not mounted. The ask frame does not include it.

## Questions today

The ask screen uses the shadcn Questionnaire (`components/ui/questionnaire.tsx`). `components/questions.tsx` only wires the six questions, the URL, and Beth’s Skip mode. It does not restyle the component.

- Six closed single-choice questions in `lib/catalog.ts` (`questions`). Every item is `required`.
- The component owns the step, the answers, progress, previous, and next. Next and Lock stay disabled until the current question is answered.
- Back appears after the first step. The last step label is `Lock`.
- No letter or number shortcuts.
- Submit writes each answer into the query string and routes to `/?hands=…`.
- `parseAnswers` in `lib/place.ts` reads that string. A partial or invalid query is treated as no answers.
- The face is Open Runde through `--font-sans`. The title uses `font-heading`, which points at the same token. Do not set a second face on the questionnaire.
- Beth’s Skip is a plain text link to `/?skip=1`. It is not a button, and it is not `QuestionnaireSkip`. That control is for an optional item left blank, and every question here is required. Back, Next, and Lock are the questionnaire actions at `size="lg"`.
- Each question is one choice. Do not turn an item on with `multiple`.

## Done this session

Shipped in `aec6a7f`.

- Replaced the custom ask form with the shadcn Questionnaire. `@shadcn/react` is the dependency. `components/ui/questionnaire.tsx` is the installed component. `components/questions.tsx` only wires the catalog, the URL, and Skip.
- Back, Next, and Lock use the large button size. Skip is a plain text link.
- Column widened from `max-w-sm` to `max-w-md`.
- Face switched from Departure Mono to Open Runde. The 16.5px `text-base` override is gone, so body type is 1rem again. Pixel-font antialiasing overrides are gone.

## Parked

Free text on a question. The shadcn field for “type your own” stays out of the MVP.

A typed sentence is not an answer the rules understand. `parseAnswers` only accepts the closed values. Something would have to sort that sentence into one of those values, then `lockFrom` would still set the band. Jev is the fit for that sort, because it picks from a list you already published. An OpenAI chat that invents a level will disagree with the six questions. Either call needs a server, and this page has none.

Unpark it only after a real person finishes the six questions and the fixed options feel like they do not fit. If the sort is unsure, show the closed choices. Do not guess a band.

## Open

Unranked. Pick one when we sit down. Do not treat the order below as priority.

- Look at the ask screen in the browser against the [Beth](https://www.figma.com/design/qyO4FMguMfbsb5Bb8iU2Ut/Beth) frames and note only what the questionnaire’s own layout still misses. Do not rebuild a custom form to close that gap. Placement does not move. The band is still `lockFrom` in `lib/place.ts`.
- Use [Dot Matrix](https://dotmatrix.zzzzshawn.cloud/) for the loader animations, and try to replicate the logo mark. The mark today is the 24px dithered dot tile in `components/mark.tsx`. The library is React, TypeScript, Tailwind, and shadcn. One install shape is `npx shadcn@latest add @dotmatrix/dotm-square-3`.
- A click on a job card should open more detail: the design team, their X profile, the head, and possibly leadership. This is richer data on each role in `lib/roles.ts`, so someone does not have to go find it.
- Explore product design roles for people who cannot take a design-engineer role.
