# Beth roadmap

Handoff for the next session. Product lives in this repo (`last/`). One public page. The catalogue and the answer row live in Supabase. The page reads companies and live roles from Beth when `.env.local` is set. A stranger still locks into the URL. Sign-in is written and not finished. The next task is to finish the browser check, fix only what that check finds, then mark this task done.

## Where we are

On `main`, after the theme pass of 4 Oct 2026. Dev server: `npm run dev` → http://localhost:3000.

The [Beth](https://www.figma.com/design/qyO4FMguMfbsb5Bb8iU2Ut/Beth) frames are the layout reference. Type and the column have moved on purpose since those frames: face is Open Runde (regular and medium) through `--font-sans`, body is `text-base` at 1rem, column is `max-w-lg`. Section titles are uppercase, regular, tracked, at a 1.1 line-height, and the lines balance. A week under a section is `text-sm`. On skip the week is the section, so it stays `text-base`. Descriptions wrap pretty. Rows that wrap use a 1.5 line-height. The step count is `text-sm` with tabular figures. The A/B/C caps stay `text-xs` on the same face. Do not put Departure Mono, a second face, or the 16.5px size back. The mark is the 24px dithered dot tile in `components/mark.tsx`. It sits still. Hover runs an inward spiral. Next holds the step and runs a diagonal sweep on that same tile. The name is not set beside it. Light is stone 50, and cards stay white. Dark uses the stone dark tokens. System follows the machine. The control is a ghost button in the header, beside Questions and Companies. It opens Light, Dark, and System.

Taste: `design.md`. Voice: `lib/catalog.ts`. Placement: `lib/place.ts`. Roles: `lib/roles.ts`.

### Screens

| State | URL | What shows |
| --- | --- | --- |
| Ask | `/` | Mark, dek, `***`, six questions, `***`, footer |
| Result | `/?hands=…` | Lock sentence, then the one next proof, then the matching table. In range when any role fits. Stretch when none do. The dek is hidden here. |
| Skip | `/?skip=1` | Every role, no lock. The lead is the skip line. Questions returns to `/` |

Skip is a mode, not “skip this question.” It lists every role with no band lock.

The role list is two columns: company and title. The company name is underlined from the font, so the row reads as the control that opens the sheet. The line clears the descenders. A row opens a sheet with the band, the posting sentence, the craft, the seat, and salary and place when the company published them. Shade marks follow the lock. `▓` is in range, `▒` is stretch, `░` is a role that does not match. Skip has no lock, so the mark is not shown. Rows are grouped by the week they entered. Week 40 is the first list.

The worked-example card (`components/lock-card.tsx`) matches the all-screens frame and is not mounted. The ask frame does not include it.

## Questions today

The ask screen uses the shadcn Questionnaire (`components/ui/questionnaire.tsx`). `components/questions.tsx` only wires the six questions, the URL, and Beth’s Skip mode. It does not restyle the component.

- Six closed questions in `lib/catalog.ts` (`questions`). Every item is `required`. Hands and show accept more than one proof. The strongest counts. The other four stay one choice.
- The component owns the step, the answers, progress, previous, and next. Next and Lock stay pressable. An empty Next shows “Choose an answer to continue.” and does not advance. `useHoldNext` stops an answered Next for one sweep of the mark (`markStepMs`, 700), then advances. A second click during that beat does not skip. Reduced motion does not hold. Lock does not hold. Arrow keys still advance on their own.
- Back appears after the first step. The last step label is `Lock`.
- Letter shortcuts are on: A, B, C, in choice order, on the current question. A letter selects. It does not advance. Numbers stay off.
- Submit writes each answer into the query string and routes to `/?hands=…`.
- `parseAnswers` in `lib/place.ts` reads that string. A partial or invalid query is treated as no answers.
- The face is Open Runde through `--font-sans`. The title uses `font-heading`, which points at the same token. Do not set a second face on the questionnaire.
- Beth’s Skip is a plain text link to `/?skip=1`. It is not a button, and it is not `QuestionnaireSkip`. That control is for an optional item left blank, and every question here is required. Back, Next, and Lock are the questionnaire actions at `size="lg"`.
- Hands, show, and craft use `multiple`. Seat, origin, and what you ship most stay one choice. Craft is the question. The five crafts are systems, motion, what to build and the flow, HTML and CSS in a reviewed pull request, and production frontend. Every selected craft counts. None of them raise the band.

## Done this session

Catalogue read, 5 Oct 2026. The server page reads companies and live roles from Beth when both public env vars are set. Live roles are `off` null. A blank column becomes a field left off. `created_at`, `updated_at`, and `off` never reach a component. The quoted `where` column is `where` on the row. Missing env uses the TypeScript files. Env set and a failed query throws, and does not fall back to the files. `splitRoles` and `everyRole` take the list. `CompanyTable` takes the companies. The tests still use the TypeScript arrays. Packages are pinned: `@supabase/supabase-js` 2.117.2 and `@supabase/ssr` 0.12.7. The lockfile is committed with this read. `.env.local` holds the URL and the `sb_publishable_` key. The server client is `lib/supabase/server.ts`. It follows the current `@supabase/ssr` guide. Cookie writes from a Server Component are ignored. There is no browser client, no `proxy.ts`, and no sign-in. Checked in the browser on `http://localhost:3000`: companies (Seed, Later, No public round), skip (40 live roles, Week 40, the archived seat stays off), and a stranger lock in the URL. The Wise sheet still shows salary and London. Marker, with no public round, opens on London. `npm test` and `npm run typecheck` passed. The dev server on port 3000 was restarted so it would load `.env.local`.

Supabase, 5 Oct 2026. Beth is a live project, ref `opuoavkqfwrcknmhskma`, URL `https://opuoavkqfwrcknmhskma.supabase.co`. Region was chosen in the dashboard. Status was Healthy before the tables were created. The MCP server in `~/.cursor/mcp.json` points at `https://mcp.supabase.com/mcp?project_ref=opuoavkqfwrcknmhskma&features=docs%2Caccount%2Cdatabase%2Cdebugging%2Cdevelopment%2Cfunctions%2Cbranching`. Sign-in for that server is already done in Cursor. Automatic RLS was ticked at project creation. That installs `public.rls_auto_enable()`, an event trigger. Execute on that function was revoked from `public`, `anon`, and `authenticated` so the Data API cannot call it. The trigger itself stays.

Two remote migrations: `beth_catalogue`, then `revoke_rls_auto_enable_execute`. There is no `supabase/` folder in this repo. The TypeScript files stayed the seed. They were copied once into the database. Counts checked after the copy: 26 companies, 40 live roles (`off` is null), 2 archived roles, 0 answers. Marker and Screen Studio are the two companies with no stage. Wise is in London. `elevenlabs-creative` carries the archive sentence. A request with the publishable key returned Wise and the 40 live roles. The same key was refused on `answers` (`42501`, no select grant for `anon`). Security advisors were clean after the revoke. Performance advisors were clean. That session changed no app file and wrote no `.env.local`. The catalogue read above is the later state.

Theme, 4 Oct 2026. Light, dark, and system. `next-themes` was already installed, and the provider was forced to light, so the class never changed. That force is gone. The default is system. The header control is `components/mode-toggle.tsx`: a ghost icon button, then a menu with Light, Dark, and System. The check marks the choice. The sun and moon follow the colour on the page, so system still looks like light or dark. D still cycles the three, and it stays off the menu so Dark can take that letter there. Words live in `lib/catalog.ts`. In the dark theme, `--border` and `--input` are `oklch(0.53 0.003 48.717)`. Same stone hue as the light edge. The 10% white line measured 1.48:1 on the page. 0.53 clears 3:1 on the page and on the choice fill. Do not put the translucent white back.

Type pass, 4 Oct 2026. Section titles stay uppercase at `text-base`, regular weight, with tracking, a 1.1 line-height, and balanced lines. A week under In range or Stretch is `text-sm`, so it does not match the heading above it. On skip the week is that heading, so it stays `text-base`. Descriptions use pretty wrapping. Rows that wrap use a 1.5 line-height. A name that opens a sheet takes its underline from the font. The step count is `text-sm` with tabular figures. The A/B/C caps stay `text-xs` on Open Runde. No second face.

Company descriptions, 4 Oct 2026. The row had been a personal reason. A stranger cannot use that. Each description is copied from the company site, from the meta description. Granola publishes none, so the line is the homepage. Semiotic’s homepage publishes none, so the line is the Lighthouse page. xAI’s site now describes SpaceXAI.

Wise, 4 Oct 2026. Filed because Roy uses the account and the company is in London. The stage is later. Their own post says the [Nasdaq listing](https://owners.wise.com/news-releases/news-release-details/wise-debuts-us-listing-nasdaq) opened on 11 May 2026, and the London listing stays. How they work stays off. The design postings do not say remote, hybrid, or in the room. The [London design board](https://wise.jobs/jobs?options=419&page=1) had 14 open seats. Six product designer seats are on the week 40 role list: Money Movement, Wise Business, Wise Assistant, FinCrime, Verification, and Credit. Verification grades design craft on the journeys, and engineering partners deliver. Credit wants those journeys, not a visual file alone. The Group Design Lead is a leadership seat. Content design and research are not this list.

Company pass, evening of 3 Oct 2026. Recraft, Marker, and Meticulous are on the company list. Marker’s product designer is on the week 40 role list. Names inside each company tab are alphabetical. The file in `lib/companies.ts` still keeps the order they were filed. `groupCompanies` sorts.

Roy’s chance cut for the next names is London, at pre-seed, seed, or Series A. Series A still sits under Later. Beauhurst’s [top 100 UK AI startups](https://www.beauhurst.com/blog/ai-startup-companies/) was opened. Their Seed label is not a seed round, the public table is ranks 1–50 by money raised, and ranks 51–100 are behind a form. That visible half was left off, apart from Marker, which was already in it. A second notes table the same evening was sorted the same way. Marker and Meticulous were the two that passed. Orchestra was a real London seed and a weaker design fit, so it stayed off.

Interface pass, 3 Oct 2026. A review of the ask, the lock, skip, companies, and both sheets. The findings from that review are in.

- Keyboard focus uses the browser outline. A custom ring at 50% of `--ring` was 1.53:1 on the page. That override is gone from the base rule, and from Button, choices, and tabs. The choice input is invisible, so the card draws the outline when that input is focused. The rule is in `app/globals.css`.
- The sheet fades when motion is reduced. It does not slide. Translate and transform stay off under `prefers-reduced-motion: reduce`.
- Role rows and company rows underline the name. The title and the reason stay plain. That underline is the cue the row opens the sheet.
- Next and Lock stay pressable. An empty Next shows “Choose an answer to continue.” and stays on the question. An answer still holds for one sweep, then moves. Checked through to question 2 of 6.
- `--border` and `--input` are `oklch(0.65 0.003 48.717)`. Same stone hue, darker than the old 0.923. Measured 3.09:1 on the page, 3.22:1 on white. The empty checkbox and the choice edge use that pair. Do not put 0.923 back.
- The header has a visually hidden `h1`, “Beth”. The name is still not set beside the mark. On a lock the outline is h1, Next proof, In range, Week 40.
- Sheet links name the place. “Onlook site” and “Apply to Edra”. The strings are `siteFor` and `applyTo` in `lib/catalog.ts`.
- The A/B/C caps are `text-xs` (12px). `body` is `antialiased`. Button and choice labels can be selected. Buttons transition color, background, border, shadow, and the press shift.
- On skip, Week 40 is an `h2`. The page heading is the only level above it. Under In range or Stretch the week stays an `h3`. Lock reads h1, Next proof, In range, Week 40. Companies is the h1 only.
- Tabs transition color, background, border, and shadow. The underline still fades on its own. `transition-all` is gone.
- Tab through an open sheet stays on the link and Close, both ways. Escape and the close button return focus to that row. Checked on ElevenLabs and on Onlook. The page is `aria-hidden` while the sheet is open. It is not `inert`. The focus guards hold Tab inside, so inert was left off.

Left from that review, and not this task:

- The button loader, and Lock holding the mark, stay under After this. They are not the sign-in task.

Mark, 3 Oct 2026. The tile stays the 24px dither, 21 dots, four corners empty. The paths are recreated from [Dot Matrix](https://dotmatrix.zzzzshawn.cloud/). The registry was not installed. The library’s rest opacity is about 8%, and at 24px that erases the tile, so the floor stays high. Hover is Core Spiral: one path, clockwise, inward. That is the lock, several proofs into one place. Flux Columns and a scan were the other trials. They read as a meter and a search, so they are not the mark. Next runs Prism Sweep, a diagonal pass with no scale, so it does not read as the hover. The question stays until that pass ends. `MarkPhaseProvider` in `app/(last)/page.tsx` carries the beat from the questions to the tile. The hold is `components/use-hold-next.ts`. A pointer that cannot hover, and reduced motion, leave the tile still.

Fund pass, 2 Oct 2026. Each hit was checked on the company careers page. The band is the proof the posting names. A role stayed off when that sort was unsure. `shadeOf` in `lib/read.ts` sets the mark from `fitOf`. `grok-roles-prompt.md` lists the new roles so the next X pass does not bring them back.

Five sources, in this order:

1. Designer Fund, `jobs.designerfund.com`. The company page wins when the board is stale. Chromatic’s Designer Fund row said closed. Ashby was open.
2. Y Combinator, Work at a Startup.
3. Festina, `festina.vc`. No jobs board. The logo wall links to the company site. Open that site’s careers page. Polar is not on the wall. Jorn van Dijk and Koen Bok are named on `polar.sh/careers`.
4. The a16z jobs letter, filtered to product designer or design engineer, and to London, Europe, or remote that includes Europe.
5. Seedcamp, `talent.seedcamp.com`, then the company careers page.

Filed on week 40: Sequence, Linear’s principal product designer, Chromatic, Edra, tldraw, Cal.com, Circle’s lead product designer and the marketplace seat, Lemni, Paper, Lovable’s product designer, voize, Hera, telli, Mercura, Mirelo.

Left off. Cogram, because the title is three jobs. Lovable’s Design Engineer, Brand, because a brand designer owns the taste and the posting says you do not need to be a designer. Polar, Bounti, and Monumental, because the seat is product engineer. Cursor, Visual Electric, and Superpower, because the place is the United States. Seedcamp had no open product designer or design engineer. Orbital Witness has a Head of Design, and that is a leadership seat.

## Next

One task: finish the sign-in check from 5 Oct 2026. The code is already in the working tree. Do not rebuild `/login`, `proxy.ts`, or the saved lock. Do not commit unless Roy asks. The button loader, the 100 companies, and the Friday pass stay under After this.

GitHub and Google are on. Email and password is on. Email confirmation is still required (`mailer_autoconfirm` is false). A publishable-key request with no session was refused on `answers` (`42501`, permission denied for table answers). `npm test` (37) and `npm run typecheck` passed after the browser-client fix below. Nothing is committed.

### Already checked in the browser

Dev server was already on http://localhost:3000 and was compiling `proxy.ts`. These returned 200: `/`, `/?skip=1` (Week 40, Sign in in the header), `/?companies=1` (Seed first), and a stranger lock `/?hands=prototype&ships=prototype&show=prototype&seat=team&prong=systems&origin=design`. `/app` returned 307 to `/login`. `/signup` returned 307 to `/login?account=1`. `/login` showed Continue with GitHub, Continue with Google, then email and password, then Sign in, then Create an account.

### Stopped here

The first Sign in click threw. `bethEnv()` reads `process.env` as one object. Next.js does not inline `NEXT_PUBLIC_` values that way in the browser, so both were empty and `lib/supabase/client.ts` threw. The fix passes each name in directly. Do not put `bethEnv()` with no argument back in that file. The server client can keep calling `bethEnv()` as it does.

A second Sign in, with `not-a-person@example.com` and a wrong password, left the fields `invalid` and re-enabled the buttons. The mapped sentence was not read off the page before the session stopped. Confirm it says “That email and password do not match.” and that the URL stays `/login`. Then finish the rest of Done when.

### Still to check

- Create an account uses the same two fields. No name, no second password, no strength meter. An unconfirmed email stays on `/login`, shows `page.confirmSent`, and can send the letter again. It does not enter `/app`.
- A real GitHub sign-in and a real Google sign-in land on `/app`. If the Google client or the GitHub app fails, stop and name the dashboard field. Do not invent a client id or a secret.
- Authentication → URL configuration still needs a look: site URL `http://localhost:3000`, redirect allow list includes `http://localhost:3000/auth/callback`. Email confirmation, password reset, Google, and GitHub all return to `app/auth/callback/route.ts`. Forgot password sends the reset with `?type=recovery` so the callback can open the new-password field. That query was not tried.
- An email that already exists does not create a second user. Auth hides the provider when `identities` is empty, so the sentence is `page.alreadyAccount`. Name GitHub, Google, or email and password only when the response actually names that provider.
- A signed-in Lock upserts `answers` for `auth.uid()`, then routes to `/?hands=…`. A failed upsert stays on the questions and shows `page.saveFailed`. `/app` with a saved row shows that lock. `/app` with no row is the six questions. The band is still `lockFrom`.
- `/?skip=1` and `/?companies=1` still win while signed in. Sign out stays on the current public URL. Sign out from `/app` goes to `/login`.
- No env file means no Sign in control. Do not reinstall `@supabase/supabase-js` or `@supabase/ssr`. Do not overwrite `components/ui/button.tsx`. The login block’s overwrite would put the focus ring and the `text-sm` size back. The local button stays.
- `shadcn` blocks `login-01` and `signup-01` are the cards. `field` and `label` were added. Signup is not its own screen. `app/signup/page.tsx` redirects to `/login?account=1`.

Files already touched: `proxy.ts`, `lib/supabase/proxy.ts`, `lib/supabase/client.ts`, `app/auth/callback/route.ts`, `app/login/page.tsx`, `app/signup/page.tsx`, `app/app/page.tsx`, `app/(last)/page.tsx`, `components/login-form.tsx`, `components/signup-form.tsx`, `components/frame.tsx`, `components/locked.tsx`, `components/lockup.tsx`, `components/questions.tsx`, `lib/catalog.ts`, `lib/auth-client.ts`, `lib/auth-error.ts`, `lib/answers.ts`, `lib/load-lock.ts`, `lib/save-lock.ts`, `lib/session.ts`, `lib/sign-out.ts`, plus `lib/auth-error.test.ts` and `lib/answers.test.ts` on the test script. `components/ui/field.tsx` and `components/ui/label.tsx` are new. `lib/supabase/server.ts` was left as it was.

When the checks pass, write that here, move this task under Done this session, and stop.

Roy replaced the magic link on 5 Oct 2026. Supabase Auth stores the password. Do not add a `passwords` table. Do not send a magic link.

### Spec

- Providers, in this order: GitHub, then Google, then email and password. No magic link.
- After success, go to `/app`. After failure, stay on `/login` and show the mapped error. Map the provider error to a sentence in `lib/catalog.ts`. Do not show the raw error.
- An unconfirmed email cannot enter `/app`. `/login` offers to send the email again.
- Unauthenticated people are sent away from `/app` to `/login`. On this Next.js that check is `proxy.ts`. `middleware.ts` is not called. Do not send a stranger away from `/`, skip, or companies.
- Do not create a second user when the email already exists. Name the provider they already used, and leave the account as it is.

Do not create the tables again. Do not add companies. Do not install the packages again. Do not commit unless Roy asks. Read this section, then `AGENTS.md`, then `node_modules/next/dist/docs/` before writing a route or `proxy.ts`. Look up the current Next.js App Router client with the Supabase skill and the Supabase MCP `search_docs`. Do not trust a remembered snippet. This Next.js is 16.3.4. The session file is `proxy.ts` at the root of `last/`, and the export is `proxy`. It is not `middleware.ts`.

### Done when

- A stranger on `/` still sees the six questions, locks through the URL, and never has to make an account. Skip and Companies still work.
- Sign in is `/login`. GitHub, then Google, then email and password. No magic link. The header word links there.
- A successful sign-in lands on `/app`. A failed one stays on `/login` and shows the mapped error. An unconfirmed email stays out of `/app` and can resend the letter.
- A visit to `/app` with no answers in the query shows that person’s lock. The band is still `lockFrom`. The database does not grade it. `/` stays public.
- `/?skip=1` and `/?companies=1` still win while signed in. The saved row does not take over those screens.
- A request with the publishable key and no session is refused on `answers` (`42501`). A signed-in person reads only their own row.
- `npm test` and `npm run typecheck` pass. Check the four screens in the browser at http://localhost:3000.

### What the page shows

`app/(last)/page.tsx` is still the server page. It already calls `loadCatalogue`. Decide the screen in this order:

1. `/?companies=1` is the company list, signed in or not.
2. A query that `parseAnswers` accepts is that lock. A signed-in submit just wrote this query, so the URL wins over an older row.
3. `/?skip=1`, when the query is not a lock, is every role.
4. `/app` with a session and a saved row is that lock. `/app` with a session and no row is the six questions.
5. `/` is the six questions for a stranger, and for a missing env file. It does not require a session.

### Sign-in

GitHub is first, Google is second, and email and password sit below. The first visit on GitHub or Google creates the account only when that email is new. Look up the current Supabase Auth guide for email password, Google, and GitHub before writing the calls. Do not trust a remembered snippet.

In the dashboard, Authentication → URL configuration: site URL `http://localhost:3000`, and the redirect allow list includes `http://localhost:3000/auth/callback`. Email confirmation and the password reset both return to that callback. Google and GitHub use the same callback. Enable both providers. If the Google client or the GitHub app is missing, stop and name the values Roy pastes into the provider settings. Do not invent a client id or a secret. Do not ship a button that cannot complete.

`app/auth/callback/route.ts` exchanges the code for a session, then redirects to `/app`. A failure, or an email that is not confirmed yet, returns to `/login` with the mapped error. Cookie writes work in a route handler. They do not work in a Server Component. `lib/supabase/server.ts` already ignores that Server Component error.

`proxy.ts` refreshes a session that already exists. Use `getClaims()`. Do not trust `getSession()` in server code. Return the response that carries the refreshed cookies. An unauthenticated request to `/app` redirects to `/login`. Leave `/`, skip, and companies open.

`lib/supabase/client.ts` is `createBrowserClient`. It is not written yet. The sheet and the signed-in submit use it. The lists stay on the server client.

The header is `components/lockup.tsx`. It is a server component and it only renders anchors for Questions and Companies. Do not turn it into a client component. Sign in is an anchor to `/login`, in the nav, after those links and before `ModeToggle`. Same size and colour as those links: `text-sm text-muted-foreground`. The word is `page.signIn` until there is a session, then `page.signOut`. Sign out ends the session and stays on the current URL.

`/login` is the sign-in page. Build it from `components/ui/input.tsx` and Button. Do not restyle them. Do not put the form on the questionnaire. Do not add another icon set. Order on the page: Continue with GitHub, Continue with Google, then email and password. A text control switches between Sign in and Create account: `page.needAccount` and `page.haveAccount`. Create account uses the same two fields. Forgot password sits on Sign in only. It asks for the email and Supabase sends the reset. Use the password rules already set in the project. Do not add a strength meter.

An unconfirmed email does not enter `/app`. `/login` shows `page.confirmSent` and a control to send the letter again. That letter finishes the account. It is not a magic-link sign-in. If the email already belongs to GitHub or Google, say so and do not create a second user.

Words, added to `page` in `lib/catalog.ts`:

- `signIn`: "Sign in"
- `signOut`: "Sign out"
- `email`: "Email"
- `password`: "Password"
- `createAccount`: "Create account"
- `needAccount`: "Create an account"
- `haveAccount`: "Already have an account"
- `forgot`: "Forgot password"
- `resetSent`: "Check your email. The link sets a new password."
- `confirmSent`: "Check your email to finish creating the account."
- `resend`: "Send the email again."
- `continueGitHub`: "Continue with GitHub"
- `continueGoogle`: "Continue with Google"
- `saveFailed`: "The lock did not save. The questions are still here."

No env file means no Sign in control. The TypeScript lists still render. Dev server: `npm run dev` → http://localhost:3000. Restart it after adding `proxy.ts` if the session cookie does not stick.

### Saving the lock

`components/questions.tsx` already writes the six answers into the query and routes to `/?hands=…`. Keep that for a stranger.

A signed-in Lock upserts `answers` for `auth.uid()`, then routes to the same query. The primary key is `user_id`. Set `user_id` from the signed-in id. Row security rejects any other id. If the upsert fails, stay on the questions and show `page.saveFailed`. Do not route to a lock that did not save.

Columns, same names as the query string. `prong` is a text array. `updated_at` has a default. The page does not read it.

| Column | Closed values |
| --- | --- |
| `hands` | `files`, `prototype`, `merged` |
| `ships` | `system`, `prototype`, `production` |
| `show` | `file`, `prototype`, `merged`, `used` |
| `seat` | `team`, `solo` |
| `origin` | `design`, `engineering` |
| `prong` | `systems`, `motion`, `judgment`, `css`, `frontend` |

Load the row only after `getClaims()` says someone is signed in. Select `hands`, `ships`, `show`, `seat`, `origin`, and `prong`. Drop `user_id` and `updated_at` before the page uses the row. Run it through the same closed lists as `parseAnswers`. A value outside those lists throws. `anon` has no grant on `answers`. Querying it with no session returns `42501` and must not take down the ask screen, so do not run that query for a stranger.

### Already in place

- `.env.local` is set and ignored by `.env*`. `NEXT_PUBLIC_SUPABASE_URL` is `https://opuoavkqfwrcknmhskma.supabase.co`. `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` is the `sb_publishable_` key. Do not use the legacy anon JWT. Do not put the database password or the service role key in any file.
- `@supabase/supabase-js` is `2.117.2`. `@supabase/ssr` is `0.12.7`. Both are pinned. The lockfile is committed with the catalogue read.
- `lib/supabase/server.ts` is the server client. `cookies()` is async. `getAll` and `setAll` are the cookie methods.
- `lib/beth-env.ts` chooses the files or Beth. `lib/rows.ts` maps a catalogue row. `lib/catalogue.ts` loads companies and live roles. `splitRoles` and `everyRole` take that list. `CompanyTable` takes the companies.
- `answers` already exists. One row per person. Policies are already on. Do not write a new migration for this task.

### Decisions already made

Supabase, not Convex. One shared catalogue. One private answer row per person. No bookmarks table. The six questions do not filter companies. Row security is on. `anon` and `authenticated` may select companies and roles. Insert, update, and delete on those two require `app_metadata.role = 'owner'`. Do not read `user_metadata` for that. `answers` has select, insert, update, and delete for `authenticated` only, with `auth.uid() = user_id` on both `using` and `with check`. `anon` has no grant on `answers`. The publishable key may ship in the browser. The service role key may not. The TypeScript files stay in git as the Friday seed and the test fixture. A later Friday edits the files, then copies the change into Beth. This pass does not build that copy step.

### Ruled out

Convex. `localStorage`. A magic link. A second user for an email that already exists. A `passwords` table in `public` (Supabase Auth holds the password). A per-user copy of companies or roles. Hiding a company that does not match. Letting the database set the band. Rendering archived roles. Putting the direct connection string or the service role key in the app. Using the legacy anon JWT for the new client. Calling `rls_auto_enable` from the website. A sign-in form on the ask screen. A newsletter field. Requiring an account to see the lists or to lock on `/`. Docker and a local Supabase stack. `middleware.ts` on this Next.js. Redirecting a stranger away from `/`, skip, or companies. An account page. Showing the email address in the header. The old project ref `khuwcrrsdsiouzdnqpcx`, and the mistyped ref `opuouavkqfwrcnmhskma`. The `agent` CLI, which is not installed. `npx skills add supabase/agent-skills`, because the Supabase skill is already in use.

### Files

The TypeScript lists stay in git as the seed and the test fixture: `lib/companies.ts`, `lib/lists/2026-w40.ts`, `lib/archive.ts`, `lib/roles.ts`. The page no longer closes over them when env is set.

This task may touch `components/questions.tsx`, `components/lockup.tsx`, `app/(last)/page.tsx`, `lib/catalog.ts`, and new files `app/login/page.tsx`, `app/app/page.tsx`, `lib/supabase/client.ts`, `lib/supabase/proxy.ts`, `proxy.ts`, and `app/auth/callback/route.ts`. `lib/supabase/server.ts` already exists. Change it only if the current guide disagrees with it. Do not add a `.css` file. Do not add a second component library.

### After this, not this task

The research task after the wire-up is a list of 100 companies Roy would work with. Hiring is not the gate. A closed role can still be tagged later. The cut is the product: a tool he already uses, or a company on a published list such as [Fast Company’s Most Innovative Companies](https://www.fastcompany.com/most-innovative-companies/list), kept when the design or the use case is one he would join. The seed is the tools on the machine: Figma, ChatGPT, Grok, X, Cursor, Vercel, Cosmos, Granola, Opal. Cursor and Vercel stay on this list. They left the week 40 roles because the place was the United States. Place is a column here, not a reason to drop the company.

Companies is a link in the header, beside Questions. It uses the same row and sheet as the roles. The groups are horizontal tabs. Seed opens first. Names inside a tab are alphabetical. tldraw stays with the T names. The row is the company and the description copied from its site. The sheet holds the tags and a link to the official site. The list shows every company until the values questions are answered. Those answers stay in the URL, the same way the six do. A company that does not match stays on the list in the light shade. Hiding it would pretend the company was never one he liked.

Each company is a hand-tagged record, in the same spirit as a role. The fields are the site, the description from that site, the place, how they work, and the stage. How they work is closed: remote, hybrid London, or in the room. Stage is closed: pre-seed, seed, or later. Pre-seed and seed stay on the list even with no posting, because a small team can take freelance. Stage is set only when a round is public. A value that is unsure stays on the full list and drops out of a question that asks for it. The wider values choices are not written yet. Do not add a free-text values field. The six questions still set the band. They do not filter this list. ElevenLabs is on the company list. The product designer seat can still close. The source for the scout is `w40/internet-friends.txt`. The 100 is a reading list of companies. The people list stays at ten to twenty. Do not follow that list in one sitting.

The first list is on `/?companies=1`, filed 3 Oct 2026. A Fast Company 2026 AI pass the same day filed Anthropic, World Labs, Runway, Factory, Hume, and Decart. Left off that list: Google, Abridge, Cerebras, Alibaba, Darktrace, Mithril, Lila Sciences, FieldAI, OpenEvidence, GC AI, Turing, Cohere, Snorkel, and Reflection. Recraft was filed the same day, after that pass. The source is [recraft.ai](https://www.recraft.ai) and their [Series B post](https://www.recraft.ai/press-releases/series-b-announcement) of May 2025. A July 2025 note adds investors to that same series, so the stage stays later. The [AI designer](https://jobs.ashbyhq.com/recraft/64655615-7a15-4e41-bd92-d2c91201b7a8) posting is open on the [careers page](https://www.recraft.ai/careers). It stayed off the role list. That seat grades taste on the image model. The place is remote in Armenia, Georgia, Kazakhstan, and Serbia. Marker and Meticulous were filed the same evening. Marker is [marker.page](https://marker.page). The writing product is on their about page. The $13m seed is in the press, not on that page, so the stage stays off. The [product designer](https://marker.page/jobs/product-designer) posting is on the week 40 role list. They grade a portfolio and the design system, and they say you are not the engineer, so the band is taste, the craft is systems, and the seat is a team. Meticulous is their [Series A post](https://www.meticulous.ai/blog/series-a) of 14 July 2026. The product is a pixel-level preview before merge. Onlook and Semiotic are the recent seeds. Glue is a YC Winter 2026 seed, two people, and the site was down, so it stayed off. Amie stays under seed. The last round the company named is the 2022 seed. Opal stays under seed too. In May 2026 the company said it raised $10M and did not name a letter, so the amount is on the sheet and the stage did not move. tldraw sits under later. The company announced a $10M Series A on 9 April 2025, led by Lux Capital and Definition. The design engineer posting says the same. Screen Studio has no public round. A database row that calls it a seed was left off. The same pass copied rounds from company posts: Cursor Series D, Nov 2025; Vercel Series F, Sep 2025; ElevenLabs Series C, Jan 2025; Paper Series A, Jul 2026; Hume Series B, Mar 2024. Factory’s post names $200M in Sep 2026 and no letter. Figma, OpenAI, xAI, X, and Anthropic stay later with no round until their own post is the source. Pre-seed is empty until a public pre-seed round is in hand. The check for the next pass is `stage-check.md`. Values questions are still not written, so the list does not filter yet.

The mark half of the wait is in. Next and Lock are pressable, and an empty Next names the fix, but the button still has no loader. Lock does not hold the mark. Do not add a server to slow the list. Do not install the Dot Matrix registry. The paths already live on the tile.

Each Friday, run the five sources above, then `grok-roles-prompt.md`, then `stage-check.md` for every company still on pre-seed or seed and for any later company whose round is missing. Check every hit on the company careers page. A closed role moves to `lib/archive.ts`. A new open role goes in `lib/lists/YYYY-Www.ts` and shows on the table under that week. The list is still tagged by hand. A model does not write the band. The same rule as the parked Jev box: sort the posting into the closed values, and if the sort is unsure, leave it off.

Week 40 is filed. Checked 2 Oct 2026, including the fund pass the same day. Wise’s six product designer seats were added on 4 Oct, still inside this week.

The place cut for Roy is London in the room, or remote that includes Europe. Sequence, Edra, tldraw, and Granola want London. Cal.com, Circle, Chromatic, and Linear’s principal product designer are remote and include Europe. voize is Berlin or remote inside Germany. Mercura is Munich, five days, and German is required. These posts are employment. A freelance start was not what they listed.

Product designer belongs when the posting is that seat: design origin, the proof is a file or a prototype, an engineer still holds backend and data. Do not file it as the ship-plus-frontend grade. ElevenLabs Creative & Studio already left: that posting is now a frontend engineer.

A pass on X, with Grok, on a week or a month. It finds postings and people hiring. Roy still tags the band, the craft, and the seat, and copies salary and place only when the company published them. The pass does not scrape this page, and it does not add a server. Cal.com came from an X post Roy found. The posting is on `cal.com/jobs/senior-product-designer`. The heading says Senior Product Design Engineer.

A newsletter is how someone comes back for that pass. It can ask for an address. Do not put a signup form on the ask screen. The letter is the list, not a second product. An address is not part of the Supabase wire-up.

The quadrant component is `components/quadrant.tsx`. It is not mounted. The result is the lock sentence, then the one proof, then the matching table. Bring the grid back by rendering `Quadrant` in `components/placement.tsx`. It is a grid. No chart library. shadcn charts are Recharts, and this picture is four named cells.

Axes come from the lock. Left to right is origin: design, then engineering. Top to bottom is the proof: a file, then a diff. Taste and Prototype are a file. Ship and Spike are a diff. `cellKey` in `lib/quadrant.ts` places the person. Seat and prong stay on the sentence. They do not move the cell. `lockFrom` still sets the band.

- Design and a file: Product designer, UI designer. Jenny Wen. The worked example lands here.
- Design and a diff: Design engineer. Rauno Freiberg, Emil Kowalski, Paco Coursey.
- Engineering and a file: no title people hire under. You can still land here.
- Engineering and a diff: Frontend engineer. Lee Robinson.

No free text, no server, no model. The six questions stay closed.

## Parked

Question 3, one sentence, for the NDA case. Parked 2 Oct 2026. The text field and Jev are parked with it.

Roy can show a design file, a prototype, or a merged diff. He also has a system other people use, and an NDA means he cannot show it to a stranger this week. Option D stays unchecked. The question is what he can show.

Two jobs got mixed in that box. One job sorts a sentence into the closed show values: a design file, a prototype, or a merged diff. If the sort is unsure, show those choices. The sentence does not become D, and it does not become Spike. The other job takes the person’s own answer, and that answer may be a kind of work the list does not have. That second job needs the missing answers named before any model. A chat that writes a band will disagree with `lockFrom`. Jev only does the first job. Until the box is one of those two, do not wire it.

A public URL is the same park. Portfolio, LinkedIn, or an X profile can confirm a closed answer. It cannot invent a band. Reading a bio, pinned posts, or a case study needs a server, and this page has none. When it is unparked, the same rule holds: sort the page into the closed values, and if the sort is unsure, show the choices.

## Direction (2 Oct 2026)

The result now leads with the lock and the one proof. A company name on that proof is the first stretch role, or the first in-range role if nothing sits above. The rest of this section is still not built. The page does not read a URL, and it does not speak to a founder who is hiring.

The board is the weakest first product if it is two-sided. Candidates and paying employers have to exist before a listing matters, and sponsors do not show up for a new jobs site. The useful bit is the fit. Sell that. The roles in `lib/lists/2026-w40.ts` are the shortlist and the proof the bands are real. They are not a jobs site someone pays to post on.

Roy wants that shortlist for himself, and it can be useful to someone else, if the cut stays funded companies and a place he can take. The five sources in Done this session are that cut. Quality is the company page, not a longer feed.

What people misunderstand is the job, not the application form. Beth’s first job is to say what a design engineer is, name the kinds, and say which kind this person is. The kinds are already the model: five crafts (systems, motion, what to build and the flow, HTML and CSS, production frontend), two seats (engineers beside you, or you are the only person on the UI), two origins (the work started in design, or in engineering), and four bands of proof (taste, prototype, ship, spike). Founders and early teams collapse that into one hire.

Two people use the same lock.

- A designer wants to know if they qualify, which kind they are, the gaps, and the one practice that levels them up.
- A founder wants to hire “a design engineer” and may need something narrower: a person who can own spacing, hierarchy, layout, and colour, open a PR, and still sit next to an engineer when the feature includes backend and data.

Roy is the second case, from the inside. Look and feel, plus a PR, is design origin, team seat, and a band of taste or prototype. It is not the ship-plus-frontend posting Vercel grades. Saying that plainly is the product. A board that lists the Vercel role without that sentence sends the wrong person to apply.

The next proof should be small enough to finish. Standing out is one small project aimed at one company, not a portfolio site. A page of experiments is the artifact people delay. The practice line in `lib/catalog.ts` stays one proof. Point it at a named company and a piece that can ship this week. Do not ask for a portfolio.

The personal agent is the last product, not this one. Later, one agent is how you get the next product or service, first digital, then physical. Beth is the first skill that agent would run: place the person, name the kind, name the one gap. Do not build the agent in this repo.

## Open

Unranked, and not next. The quadrant cells are named. The grid is not on the result. Do not treat the order below as priority.

- Look at the ask screen in the browser against the [Beth](https://www.figma.com/design/qyO4FMguMfbsb5Bb8iU2Ut/Beth) frames and note only what the questionnaire’s own layout still misses. Do not rebuild a custom form to close that gap. Placement does not move. The band is still `lockFrom` in `lib/place.ts`.
- A row already opens the posting sentence, the craft, the seat, salary, and place. Richer detail, the design team, their X profile, the head, and leadership, waits until someone is paying for the fit. It makes the board better, and the board is not the first product.
- More product-designer seats, for a person who owns the look while an engineer still holds backend and data. The 2 Oct fund pass filed Sequence, Edra, Circle, Lovable, voize, Hera, telli, and Mirelo beside Granola and ElevenLabs. The next pass uses the same five sources.
