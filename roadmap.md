# Beth roadmap

Handoff for the next session. Product lives in this repo (`last/`). One public page. The catalogue and the answer row live in Supabase. The page reads companies and live roles from Beth when `.env.local` is set. The company page shows the names in `lib/companies.ts`. A company that is only in the table stays off that page. A stranger still locks into the URL. Sign-in is checked. Sign out from a lock returns to the questions. The page is fifteen companies. Stripe and Deel were filed on 10 Oct 2026, and their design reading is under Company list so far. The next task is under Next: dig into the design evidence for the companies that were already on the page. The button loader, the Friday role pass, and the quadrant stay under After the company list.

## Where we are

On `main`, after the careers column, 9 Oct 2026. Fifteen companies, after Stripe and Deel on 10 Oct 2026. The company page line is “Product designer and design engineer jobs in the United Kingdom, or remote.” The last column is Hiring, and it opens the careers page. A closed board leaves that cell empty. Do not put Not hiring back. Do not put the Europe and London sentence back. Dev server: `npm run dev` → http://localhost:3000.

The [Beth](https://www.figma.com/design/qyO4FMguMfbsb5Bb8iU2Ut/Beth) frames are the layout reference. Type and the column have moved on purpose since those frames: face is Timeless Sans, the Sans cut, through `--font-sans`. Regular is the body. Medium is `font-medium`. Auth titles are semibold. Do not put Open Runde back. Body is `text-base` at 1rem. The questionnaire is `max-w-lg`. The company list has no max width. Section titles are uppercase, regular, tracked, at a 1.1 line-height, and the lines balance. A week under a section is `text-sm`. On skip the week is the section, so it stays `text-base`. Descriptions wrap pretty. Rows that wrap use a 1.5 line-height. The step count is `text-sm` with tabular figures. The A/B/C caps stay `text-xs` on the same face. Do not put Departure Mono, a second face, or the 16.5px size back. The mark is the 24px dithered dot tile in `components/mark.tsx`. It sits still. Hover runs an inward spiral. Next holds the step and runs a diagonal sweep on that same tile. The name is not set beside it. Light is stone 50, and cards stay white. Dark uses the stone dark tokens. System follows the machine. The control is a ghost button in the header, beside Questions and Companies. It opens Light, Dark, and System.

Taste: `design.md`. Voice: `lib/catalog.ts`. Placement: `lib/place.ts`. Roles: `lib/roles.ts`.

### Screens

| State | URL | What shows |
| --- | --- | --- |
| Companies | `/` | The front page. The line is “Product designer and design engineer jobs in the United Kingdom, or remote.” One list, no max width. The list is the Table component. `text-sm` comes from that component. The columns are Name, Why designers might care, Stage, Follow, and Hiring. The Hiring header is hidden. The name links to the site, with no underline. The description is the design line when one is filed, and the short line from the site when it is not. Stage is the series they published, in an outline badge. A missing round leaves that cell empty. Follow is an avatar that opens their X profile. A company with no named person leaves that cell empty. Cal.com is Matt, [uixmat](https://x.com/uixmat). His picture is `public/leads/uixmat.png`. Do not load it from X. The last column is Hiring, and it opens the careers page. A closed board leaves that cell empty. The row line is `border-input`. Cell padding is `px-4` and `py-5`. No tabs. No sheet. Do not put the custom grid back. `/?companies=1` redirects here. |
| Ask | `/?questions=1` | Mark, dek, `***`, six questions, `***`, footer. The column is `max-w-lg`. The header link is “Where do I fit”. |
| Result | `/?hands=…` | Lock sentence, then the one next proof, then the matching table. In range when any role fits. Stretch when none do. The dek is hidden here. |
| Skip | `/?skip=1` | Every role, no lock. The lead is the skip line. Companies returns to `/` |

Skip is a mode, not “skip this question.” It lists every role with no band lock.

The role list is two columns: company and title. The company name is underlined from the font, so the row reads as the control that opens the sheet. The line clears the descenders. A row opens a sheet with the band, the posting sentence, the craft, the seat, and salary and place when the company published them. Shade marks follow the lock. `▓` is in range, `▒` is stretch, `░` is a role that does not match. Skip has no lock, so the mark is not shown. Rows are grouped by the week they entered. Week 40 is the first list.

The worked-example card (`components/lock-card.tsx`) matches the all-screens frame and is not mounted. The ask frame does not include it.

### Auth

`/login` is its own column. It does not use Frame. No Questions, no Companies, no theme control. The mark is centered. The column is `max-w-sm`. Create account is `/login?account=1`. `/signup` redirects there. Email is focused on sign-in and on create.

The frames are in the [Last](https://www.figma.com/design/VDrdv94a30tTwLcNiUQAaK/Last) file. Sign in says “Welcome back”. Create says “Create your account”. GitHub and Google are icon buttons, then “or”, then the two fields. Create account stays faded until both fields have a value. While that request runs the label is “Creating account” and the spinner shows. The same spinner sits on whichever control was clicked. GitHub and Google keep their names for the reader and swap the mark for the spinner. The marks live in `components/provider-marks.tsx`. They have no size class, so the button draws them at `size-4`. The fill is `currentColor`.

Forgot? sits on the password label. The sign-in frame has no link to create account. The create frame ends with “Already have an account? Log in”. “By continuing you agree to our Terms of Service” is text. There is no terms page. Do not make it a link until there is one.

A sent confirm replaces the form. The line is “Confirmation link sent to”. The address sits under it in the muted foreground. That address is the one typed on the form. A visit from the letter has none, so only the line shows. Do not put “Please check your email for the confirmation link” back. Do not put “Send the email again.” back on that screen. A wrong password still marks the fields. The confirm line does not. A short password says “That password needs at least 6 characters.” That is the only rule on this project. Forgot password and set-a-new-password use this same column. Recovery is `/login?recovery=1`. The title is “Set a new password”. The email field is not shown. Terms of Service and Log in have no underline. Do not put it back.

Chrome paints a saved password with its own fill. `autofill:` on the input covers it with an inset shadow of `--autofill`. Light uses the page color. Dark uses the same mix as `dark:bg-input/30`, kept opaque. The text fill is the foreground.

`--input` in the light theme is `oklch(0.923 0.003 48.717)`. In the dark theme it is that same stone at 15%. Do not put white at 15% back. `--border` stays `oklch(0.65 0.003 48.717)` in light and `oklch(0.53 0.003 48.717)` in dark. Choice cards and the empty checkbox use `border-input`, so those edges followed the field. Do not darken `--input` back to 0.65 or 0.53.

Button text is `text-sm` and medium. The default size is `h-8`, `gap-1.5`, `px-2.5`. Large is `h-10`. Focus stays the browser outline. Do not put the focus ring back. Do not reinstall the button from the registry.

Play is `/login?play=1`, and only while `next dev` is running. Create is `/login?play=1&account=1`. A new password is `/login?play=1&recovery=1`. The flag does nothing in production, and a fake address never creates a session. An outline badge says PLAY MODE. Any address walks to the next step. The word before @ shows the other sentence: wrong, taken, weak, wait, or fail. GitHub and Google stay on the column and name the provider. Do not put the play sentence back. The Grotesk cut is not loaded.

A standout color was named and not applied. Orange, the stone hue with the chroma turned up. Primary stays near-black.

## Questions today

The ask screen uses the shadcn Questionnaire (`components/ui/questionnaire.tsx`). `components/questions.tsx` only wires the six questions, the URL, and Beth’s Skip mode. It does not restyle the component.

- Six closed questions in `lib/catalog.ts` (`questions`). Every item is `required`. Hands and show accept more than one proof. The strongest counts. The other four stay one choice.
- The component owns the step, the answers, progress, previous, and next. Next and Lock stay pressable. An empty Next shows “Choose an answer to continue.” and does not advance. `useHoldNext` stops an answered Next for one sweep of the mark (`markStepMs`, 700), then advances. A second click during that beat does not skip. Reduced motion does not hold. Lock does not hold. Arrow keys still advance on their own.
- Back appears after the first step. The last step label is `Lock`.
- Letter shortcuts are on: A, B, C, in choice order, on the current question. A letter selects. It does not advance. Numbers stay off.
- Submit writes each answer into the query string and routes to `/?hands=…`.
- `parseAnswers` in `lib/place.ts` reads that string. A partial or invalid query is treated as no answers.
- The face is Timeless Sans through `--font-sans`. The title uses `font-heading`, which points at the same token. Do not set a second face on the questionnaire.
- Beth’s Skip is a plain text link to `/?skip=1`. It is not a button, and it is not `QuestionnaireSkip`. That control is for an optional item left blank, and every question here is required. Back, Next, and Lock are the questionnaire actions at `size="lg"`.
- Hands, show, and craft use `multiple`. Seat, origin, and what you ship most stay one choice. Craft is the question. The five crafts are systems, motion, what to build and the flow, HTML and CSS in a reviewed pull request, and production frontend. Every selected craft counts. None of them raise the band.

## Done this session

Stripe and Deel, 10 Oct 2026. Roy named both. The rows are in `lib/companies.ts` and in the Beth `companies` table. The descriptions are the meta descriptions. Design culture is established for both. The reading is under Company list so far. The page is fifteen companies.

Description, 10 Oct 2026. The column is “Why designers might care”. A company with a design line shows that sentence. Yonder, Dessn, Recraft, Conduct, and Oxford Dynamics have no design line, so they keep the short line from the site. Lead is Follow. The design line stays on the file. Beth does not wipe it. The page line is unchanged.



Lead column, 9 Oct 2026. The table has a Lead column. The cell is an avatar, and it opens that person’s X profile. A company with no named person leaves the cell empty. Cal.com is Matt, [uixmat](https://x.com/uixmat), Head of Product. His picture is `public/leads/uixmat.png`. Do not load a lead photo from X. Do not guess the others. The lead stays on the file. Beth does not store it.

Stage column, 9 Oct 2026. The table has a Stage column. It shows the series, not the date. A company with no public round leaves the cell empty. Dessn’s site does not name a round. Oxford Dynamics names a BAE investment and no series, so that cell stays empty. Filed from the company’s own post: Ashby [Series D, 22 July 2025](https://www.ashbyhq.com/blog/culture/series-d); Yonder [£62.5M Series A](https://www.yonder.com/blog/weve-raised-62m-series-a-and-youre-invited), no month on the post; Cal.com [Series A, 9 September 2022](https://cal.com/blog/cal-v-1-5); Figma [NYSE, 31 July 2025](https://www.figma.com/blog/the-anatomy-of-an-activation-figma-commons/); Conduct [Series A, 17 June 2026](https://conduct.ai/blog/series-a); Jack & Jill [Series A, 15 September 2026](https://www.jackandjill.ai/blog/series-a). The earlier rounds stay: ElevenLabs Series C, Granola Series C, Wise Nasdaq, tldraw Series A, Recraft Series B. Series A and anything after it stays `later`. The same rounds were written to the Beth rows that had no round. Do not invent a stage for Dessn or Oxford Dynamics.

Table, 9 Oct 2026. The company list uses the Table component in `components/ui/table.tsx`. The columns are Name, Description, and Hiring. The Hiring header is hidden. The name still opens the site, with no underline. Hiring still opens the careers page. A closed board still leaves that cell empty. The row line is `border-input`, quieter than the table default. Cells are `px-4` and `py-5`. Do not put the custom grid back.

Careers column, 9 Oct 2026. The company row is the name, the description, and Hiring. Hiring opens the careers page Roy named. The mark is the company, not the design seat. Checked that day: Ashby, Cal.com, Conduct, ElevenLabs, Figma, Granola, Jack & Jill, Oxford Dynamics, Recraft, Wise, and Yonder listed open roles. Dessn has no public careers page, so that cell stays empty. tldraw’s Design Engineer is open on [tldraw.dev/careers](https://tldraw.dev/careers), London, onsite, checked the same evening, so Hiring is on. Do not put Not hiring back. A closed board does not drop the row. The file keeps the link and the mark. Beth does not. Do not put the two-column row back.

Company page line, 9 Oct 2026. The dek is “Product designer and design engineer jobs in the United Kingdom, or remote.” It names both seats. United Kingdom covers London and Harwell. Remote covers Cal.com, whose posting says work from anywhere. Figma stays on the list because Roy uses it. The line does not say Europe, and it does not say London. Do not put that sentence back.

Oxford Dynamics, 9 Oct 2026. Roy named [oxdynamics.com](https://oxdynamics.com). The row is in `lib/companies.ts` and in the Beth `companies` table. The description is the meta description. The place is Harwell, from the address on the site. The BAE investment is named and has no series, so the stage stays off. The page is thirteen companies. Checked on `/?companies=1`. `npm test` (44) and `npm run typecheck` passed.

Company list, 7 Oct 2026. The cut is Europe, or a London office, or hiring in London. The three tabs are gone. A row does not open a sheet. The name is the link to the company site, and the description sits beside it. Twelve companies: Ashby, ElevenLabs, Granola, Wise, Yonder, Dessn, tldraw, Cal.com, Figma, Recraft, Conduct, and Jack & Jill. Yonder is the rewards card at yonder.com, the London office in Spitalfields. Dessn is dessn.com. Conduct is conduct.ai. Jack & Jill is jackandjill.ai. The descriptions are the lines on those sites. Ashby stays because the UK design engineer seat is remote in the United Kingdom. The other twenty stay in the Beth `companies` table and stay off this page, including Marker and Meticulous, which are London and were not on this cut. Six new rows were inserted: Ashby, Yonder, Dessn, Cal.com, Conduct, and Jack & Jill. The earlier rows were not rewritten, apart from ElevenLabs, whose site now says 90+ languages. The file is who appears. A matching row in Beth fills that company. The page has no max width. The questionnaire stays `max-w-lg`. A lock and skip use the window. The rows are `text-sm`. The name has no underline. Do not put `.underline-name` back on a company. Each row has `border-b border-input`, the same edge as a choice. Do not use `--border` for that line. Padding is `pt-3` and `pb-5`.

Play and type, 7 Oct 2026. Play mode walks the auth column without sending a letter. The rules are under Auth. The face is Timeless Sans, the Sans cut. Auth titles are semibold. The dark field edge is the stone at 15%. A short password says it needs at least 6 characters. Terms of Service and Log in have no underline. Checked in the browser. The play tests passed.

Auth screens, 6 Oct 2026. The login card left Frame. The column, the sentences, the spinner, the field border, and the saved-password fill are under Auth. Email focuses on sign-in and on create. Checked in the browser on `http://localhost:3000/login` and `http://localhost:3000/login?account=1`.

Account pass, 5 Oct 2026. The confirm link crashed the page. A keydown with no key reached the theme shortcut, and `event.key` was read. That listener now returns when the key is missing. D still cycles Light, Dark, and System. Create account stays on `/login`. The sentence is “Check your email to confirm the address.” The fields stay unmarked. “Send the email again.” stays under the line. A wrong password still marks the fields and says “That email and password do not match.” The reset sentence is the same kind of note. Sign out from a lock query (`/?hands=…`) returns to `/`, the six questions. The answers stay on the account, so the next sign-in shows that lock again. A stranger who opens the lock URL still sees it. Sign out on Companies stays on `/?companies=1`. Sign out on Skip stays on `/?skip=1`. Sign out on `/app` goes to `/login`. `pathAfterSignOut` in `lib/sign-out-path.ts` is the rule. `npm test` (40) and `npm run typecheck` passed.

Sign-in check, 5 Oct 2026. Wrong password stays on `/login` and says “That email and password do not match.” Create account uses the same two fields. No name, no second password, no strength meter. An unconfirmed email stays on `/login`, shows “Check your email to finish creating the account.”, and offers “Send the email again.” It does not enter `/app`. Creating the same email again says “This email already has an account.” and does not add a user. The sentence does not name GitHub, Google, or email, because the response does not. Email sign-in lands on `/app`. With no row, `/app` is the six questions. Lock writes `answers` for that person and routes to `/?hands=…`. `/app` then shows that lock. The band is still `lockFrom`. A different lock in the URL wins over the saved row. `/?skip=1` and `/?companies=1` still win while signed in. Sign out on Companies stays on `/?companies=1`. Sign out on `/app` goes to `/login`. `/` stays the six questions, with Sign in in the header. `/app` with no session is 307 to `/login`. `/signup` is 307 to `/login?account=1`. `/login?recovery=1` opens “Set a new password”. Forgot password posts `redirect_to=http://localhost:3000/auth/callback?type=recovery`. GitHub opens its sign-in for the app named Beth, with `redirect_to` `http://localhost:3000/auth/callback`. Google opens its sign-in to continue to the project host. Neither account password was entered. A publishable-key request with no session is refused on `answers` (`42501`). The built-in mailer returned `over_email_send_rate_limit` on the first letter to an address that is not on the team. The page said “Wait a moment, then try again.” The letter was not delivered. Custom SMTP is Authentication → Emails. No client id or secret was invented. The check user and the answer row were removed. Counts after that: 0 users, 0 answers. `npm test` (37) and `npm run typecheck` passed. Nothing was committed.

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

- The button loader, and Lock holding the mark, stay under After the company list.

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

The company list is the front page. The column is already “Why designers might care”. The next work is to dig into design culture, dated 10 Oct 2026. A sentence on the row is not the reading. Do not add a score, a new column, or a settings panel. Do not start On the row from 9 Oct. Diversity, the Friday letter, and hiding every company past Series A stay off. Do not put the stage tabs or the company sheet back. Further names wait until a name shows design has a say. Do not redo sign-in. Do not commit unless Roy asks. The button loader, the Friday role pass, and the quadrant stay under After the company list.

### Dig into the evidence

Do these in order. One company at a time. Finish the note before the next name.

Open the company’s own job description, then the team page or the design page. A job description says what they ask a designer to do. A team page or a named design lead is the check on that claim. Both are wanted. The company’s own site is the source. LinkedIn and The Org do not confirm a title.

Write which of the five signals that page shows. Copy a signal only when the page shows it. Leave it blank when the page does not say. A model does not fill a blank. Product craft stays his. Do not write it.

Design leadership. A Head, VP, or Director of Design, named on the site or the posting. Design team. More than one product, brand, or design engineer. One designer on their own does not count. Design and engineering. A design engineer, a prototyper, or a designer who ships. Public design. The company or its designers publish process, talks, or work. Product craft. His judgement of the product. This is the only signal that is not a fact on a page.

One posting that asks for a design engineer is not yet a design culture. Two founding designers, with no design lead, are not yet a design culture. When the pages still do not show it, take `fit` off and leave the short line from the site. Say why, under Company list so far.

Do not put the five signals on the row. They sit on the record, under the sentence. `fit` stays the one line a stranger can read. It does not mention salary, his week, or remote. Last reviewed is the month of this pass.

Start with the eight that already have a sentence. Ashby, ElevenLabs, Granola, and Wise were easy to read. Dig those first, and keep the sentence only if the signals still hold. tldraw, Cal.com, and Jack & Jill are thin. tldraw’s posting asks for a product designer who builds and names no design lead. Cal.com’s posting is a design engineer beside Matt, the head of product. Jack & Jill’s about page names two founding designers and no head of design. Dig those three until a page shows a design team or a design lead, or take the sentence off.

Then the five with no sentence. Yonder, Dessn, Recraft, Conduct, and Oxford Dynamics. A senior product designer listing, an AI designer seat, or a product that is a design tool is not enough. Leave them on the short line until a page of theirs shows a design culture.

Figma’s sentence cites their [design team post](https://www.figma.com/blog/figma-design-team-career-levels/) of 23 March 2023, which names Noah Levin, head of design. Dig the same way. Do not add a second sentence from memory.

### Already on the page, 10 Oct 2026

The column header is “Why designers might care”. `fit` is the sentence. `why` is the line from the site, and it shows when `fit` is absent. Yonder, Dessn, Recraft, Conduct, and Oxford Dynamics are on `why`. Stripe and Deel are on `fit`. Their reading is under Company list so far. Follow is the avatar that opens X. Cal.com is Matt. Do not guess the others. `fit` stays on the file. Beth does not wipe it. `descriptionOf` and `withFileFields` in `lib/company.ts` are the rules. The page line is still “Product designer and design engineer jobs in the United Kingdom, or remote.” It changes when the readings are deeper than one sentence. When it changes, it names design culture. It does not name his week.

### The rule, not the task

The list is companies where design has a say. Remote, the length of the week, and hire-from-the-UK are his. They sit on the record. They do not add a company, and they do not remove one. Granola is London, onsite. It stays if the design reading holds. Do not drop it for the office. A company with no open seat stays. The round does not decide. Salary has no number until he names a minimum. Do not invent one.

His arrangement, recorded and not a gate: three or four days a week, remote, for six months or longer, with days left for his own products. An agency is on the list when its work shows a design culture, the same test as a product company. Trueform is the example. It is not filed. A headquarters in the United States is not a reason to drop the name. The six questions stay. They do not pick the company.

The person on the row is someone to follow. Name, the title they published, and a public X profile. Do not infer the title. Do not collect an email. Work mode stays on the record. It is not the column that earns the row.

### Sources for the dig

Ashby: Chris Lee, head of Product Design, on the [Senior Product Designer](https://jobs.ashbyhq.com/ashby/f40ef345-82a8-4956-9150-193b4fdf8183/) posting, and a [design team page](https://www.ashbyhq.com/team/design). Abhik, co-founder, on the [Staff Design Engineer](https://jobs.ashbyhq.com/ashby/306a353b-aab5-49d6-a711-a77aa0f5a660) posting. Granola: the [Product Designer](https://jobs.ashbyhq.com/granola/0897636e-e415-493e-b501-7c610ea72eff) posting, and a [Design Engineer](https://www.granola.ai/jobs/design-engineer) posting. ElevenLabs: the [Product Designer](https://elevenlabs.io/careers/89da00ec-11b0-4359-913b-c3a89c1013bc/product-designer) posting. Wise: [wise.design](https://wise.design/design-at-wise/work-at-wise). Figma: the [design team post](https://www.figma.com/blog/figma-design-team-career-levels/). Jack & Jill: the [about page](https://www.jackandjill.ai/about-us). tldraw: the [Design Engineer](https://jobs.ashbyhq.com/tldraw/c52007ee-bac0-4176-a5f0-48fe6e1fe854) posting. Cal.com: the [Senior Product Design Engineer](https://cal-com.breezy.hr/p/ff94f3182ac2-senior-product-design-engineer) posting. Conduct: the [Product Designer](https://jobs.ashbyhq.com/conduct/4b9179a9-b0f6-46bb-bff1-82d6391d0ecb) posting. Recraft: the [AI Designer](https://jobs.ashbyhq.com/recraft/64655615-7a15-4e41-bd92-d2c91201b7a8) posting. Dessn: the [mission](https://www.dessn.com/mission). Oxford Dynamics: [careers](https://oxdynamics.com/careers/) and the [company page](https://www.oxdynamics.com/company/). Yonder’s Head of Design is on LinkedIn, not on yonder.com. Leave that title off. Stripe: the [Sessions 2024 page](https://stripe.com/en-ca/sessions/2024/craft-and-beauty-the-business-value-of-form-in-function), the [Design Program Manager](https://stripe.com/careers/listing/design-program-manager-research-operations/8155390) posting, the [Design Engineer, Expansion](https://stripe.com/careers/listing/design-engineer-expansion/8212314) posting, [Sail](https://stripe.com/careers/listing/product-designer-design-systems/7983076), and [Product Designer, Risk](https://stripe.com/careers/listing/product-designer-risk/7954118). Deel: the [Series E post](https://www.deel.com/blog/new-investment-valuation/), the [Muhammed Salim interview](https://www.deel.com/blog/meet-deel-muhammed-salim/), the [Senior AI Design Engineer](https://jobs.deel.com/deel/job-details/adaa0161-cd93-47d0-aaf3-bd6eabc61a6c/overview) posting, and the [Director, Product Design](https://www.deel.com/careers/job/dbef3963-6b0e-497d-b081-f3d5a8b5302b/) posting.

### Left from 9 Oct, and not this task

Show stage, place, and work mode on the row. Work mode is his reading of a row that is already earned. It waits until the design readings exist. Splitting Series A out of `later`, and a second list for everything past Series A, are dropped. Figma, Wise, and ElevenLabs are past Series A and they stay, because design culture is the cut. Diversity is dropped. The email field under the list is dropped. That letter asked ten designers if they would pay. This page is not that product. Hold the LinkedIn agent. Still hold it. The next search is the careers pages already checked. Do not build the agent in this repo.

### Where the list lives

`/` is the page. `/?companies=1` redirects there. One list, and the page has no max width. Do not put `max-w-lg` or `max-w-xl` back on it. Names are alphabetical. tldraw stays with the T names. The file in `lib/companies.ts` keeps the order they were filed. The page sorts. The list is the Table component. Columns are Name, Why designers might care, Stage, Follow, and Hiring. The name is the site link, with no underline. The description wraps. A design sentence shows when `fit` is set. The site line shows when it is not. Do not put the custom grid back.

With `.env.local` set, a row in Beth fills a company that is in the file. A company in the table and absent from the file stays off the page. Insert only a new name Roy adds. Do not rebuild the table. Do not rewrite the rows already there. Do not write a general Friday copy command. The TypeScript file stays the seed and the test fixture. Tests use that file. They assert these fifteen ids.

Missing env uses the file. Env set and a failed query throws, and does not fall back to the file. Dev server: `npm run dev` → http://localhost:3000. Node for `npm test` is 22. The `node` on the default path is 20, and that version rejects `--experimental-strip-types`.

### The cut

The chance cut below is who got onto the page through 9 Oct. From 10 Oct, a new name has to show that design has a say. London, pre-seed, Series A, and remote are not enough on their own. A later round is not a reason to leave. An office is not a reason to leave.

Hiring is not the gate. A closed role can be tagged later. Keep a company when the product is a tool Roy already uses, or when it sits on a published list such as [Fast Company’s Most Innovative Companies](https://www.fastcompany.com/most-innovative-companies/list) and the design or the use case is one he would join.

The tools on the machine are already filed: Figma, ChatGPT, Grok, X, Cursor, Vercel, Cosmos, Granola, Opal. Cursor and Vercel stay on this list. They left the week 40 roles because the place was the United States. Place is a column. It is not a reason to drop the company.

A name that is not already a tool he uses still has to show that design has a say. The old chance cut was London, at pre-seed, seed, or Series A. That cut no longer drops a later round, and it no longer files a seed whose pages show no design leadership. Remote does not earn the row. Series A stays under `later` until a later pass splits the scale. That split is not this task.

The people source is `w40/internet-friends.txt`, beside this repo. The 100 is a reading list of companies. The people list stays at ten to twenty. Do not follow that people list in one sitting. File a batch, write who stayed off and why, then stop.

### Fields

Each company is a hand-tagged record, in the same spirit as a role. The type is `Company` in `lib/company.ts`.

- `id`, `name`, `href`, `why`. `why` is copied from the company site, from the meta description. Granola publishes none, so that line is the homepage. A personal note does not belong on the row. A stranger has to be able to read it.
- `stage`, only when a round is public: `pre-seed`, `seed`, or `later`. Series A and anything after it is `later`. A value that is unsure stays off. The company remains on the full list, in the open tab.
- `round`, the series and the date they published. `Series D, Nov 2025`. A dollar amount with no letter stays an amount. It does not become a series. Opal announced $10M in May 2026 and did not name a letter, so the amount is on the sheet and the stage stayed seed.
- `work`, only when they said it: `remote`, `hybrid`, or `room`.
- `where`, only when they published a place.

Run `stage-check.md` for every name you file. Read the company’s own post first, then a press release they issued. A model does not write the stage. A database, a funding tracker, or a post that is not from the company does not move the stage. If two pages disagree, leave the filed round. Pre-seed is empty until a public pre-seed round is in hand.

The six questions still set the band. They do not filter this list. Values questions are not written. Do not add a free-text values field. A company that does not match stays on the list. Hiding it would pretend the company was never one he liked.

The row is the name, `why`, and the stage. The name links to the official site and has no underline. The list is the Table. There is no sheet, and there are no tabs. Stage is the series they published. The date stays on the record. Work and place stay on the record. They are not on the row yet.

### Already in, and left off

Read Company list so far before adding a name. Those paragraphs are the record. Do not re-file a company that is already there. Do not bring back a name that paragraph left off.

### Done when

- The new companies are in `lib/companies.ts` and in the Beth `companies` table.
- Each new `why` is from that company’s site. Stage, round, work, and place are copied only when the company published them.
- `/?companies=1` shows the names in one list. Seed does not open first. There are no tabs.
- Who stayed off, and why, is written under Company list so far.
- `npm test` and `npm run typecheck` pass. Do not commit unless Roy asks.

### Leave alone

Sign-in is checked. Do not rebuild `/login`, `proxy.ts`, or the saved lock. Do not mark the confirm note as a field error. Do not send a lock query back on sign out. `pathAfterSignOut` returns that page to `/`. Companies and Skip stay. `lib/supabase/client.ts` passes each `NEXT_PUBLIC_` name in directly. Do not put `bethEnv()` with no argument back in that file. GitHub, Google, and email and password are on. Email confirmation is still required. The built-in mailer only sends to team addresses until Authentication → Emails has a custom SMTP server. Do not invent a client id or a secret. Do not send a magic link. Do not add a `passwords` table.

No env file means no Sign in control. Do not reinstall `@supabase/supabase-js` or `@supabase/ssr`. Do not reinstall `components/ui/button.tsx` from the registry. That file would put the focus ring back. The local button keeps `text-sm`, medium, and the browser outline. Play stays off unless `next dev` is running. Do not put Open Runde back.

### Company list so far

Read this before adding a name. It is the record of who is already filed and who stayed off.

The first list is on `/?companies=1`, filed 3 Oct 2026. A Fast Company 2026 AI pass the same day filed Anthropic, World Labs, Runway, Factory, Hume, and Decart. Left off that list: Google, Abridge, Cerebras, Alibaba, Darktrace, Mithril, Lila Sciences, FieldAI, OpenEvidence, GC AI, Turing, Cohere, Snorkel, and Reflection. Recraft was filed the same day, after that pass. The source is [recraft.ai](https://www.recraft.ai) and their [Series B post](https://www.recraft.ai/press-releases/series-b-announcement) of May 2025. A July 2025 note adds investors to that same series, so the stage stays later. The [AI designer](https://jobs.ashbyhq.com/recraft/64655615-7a15-4e41-bd92-d2c91201b7a8) posting is open on the [careers page](https://www.recraft.ai/careers). It stayed off the role list. That seat grades taste on the image model. The place is remote in Armenia, Georgia, Kazakhstan, and Serbia. Marker and Meticulous were filed the same evening. Marker is [marker.page](https://marker.page). The writing product is on their about page. The $13m seed is in the press, not on that page, so the stage stays off. The [product designer](https://marker.page/jobs/product-designer) posting is on the week 40 role list. They grade a portfolio and the design system, and they say you are not the engineer, so the band is taste, the craft is systems, and the seat is a team. Meticulous is their [Series A post](https://www.meticulous.ai/blog/series-a) of 14 July 2026. The product is a pixel-level preview before merge. Onlook and Semiotic are the recent seeds. Glue is a YC Winter 2026 seed, two people, and the site was down, so it stayed off. Amie stays under seed. The last round the company named is the 2022 seed. Opal stays under seed too. In May 2026 the company said it raised $10M and did not name a letter, so the amount is on the sheet and the stage did not move. tldraw sits under later. The company announced a $10M Series A on 9 April 2025, led by Lux Capital and Definition. The design engineer posting says the same. Screen Studio has no public round. A database row that calls it a seed was left off. The same pass copied rounds from company posts: Cursor Series D, Nov 2025; Vercel Series F, Sep 2025; ElevenLabs Series C, Jan 2025; Paper Series A, Jul 2026; Hume Series B, Mar 2024. Factory’s post names $200M in Sep 2026 and no letter. Figma, OpenAI, xAI, X, and Anthropic stay later with no round until their own post is the source. Pre-seed is empty until a public pre-seed round is in hand. The check for the next pass is `stage-check.md`. Values questions are still not written, so the list does not filter yet.

The page on 7 Oct 2026 is the twelve Roy named: Ashby, ElevenLabs, Granola, Wise, Yonder, Dessn, tldraw, Cal.com, Figma, Recraft, Conduct, and Jack & Jill. Yonder is [yonder.com](https://www.yonder.com), the rewards card, office-first in Spitalfields. Dessn is [dessn.com](https://www.dessn.com). Conduct is [conduct.ai](https://conduct.ai). Jack & Jill is [jackandjill.ai](https://www.jackandjill.ai). Ashby stays for the UK design engineer seat, remote in the United Kingdom. Cal.com stays because the remote seat includes Europe. Left off this page, and still in the table: Onlook, Semiotic, Amie, Opal, OpenAI, xAI, X, Cursor, Vercel, Cosmos, Paper, Anthropic, World Labs, Runway, Factory, Hume, Decart, Meticulous, Screen Studio, and Marker. Marker and Meticulous are London. They were not on this cut, so they stay off the page.

Oxford Dynamics was added on 9 Oct 2026, from [oxdynamics.com](https://oxdynamics.com). The description is the meta description. The address on the site is Building R71, RAL Science Campus, Harwell. Their [company page](https://www.oxdynamics.com/company/) names a first strategic investment from BAE Systems in 2025, and the [24 September 2025 post](https://oxdynamics.com/first-uk-sme-to-secure-mod-enterprise-ai-contract/) says the same. Neither page names a series or an amount, so the stage stays off. They do not say remote, hybrid, or in the room.

Stripe and Deel were added on 10 Oct 2026. Roy named [stripe.com](https://stripe.com) and [deel.com](https://www.deel.com). The descriptions are the meta descriptions. Both are later. Design culture is established for both. That word is the far end of founder-led, emerging, established. Product craft stays blank. It is his judgement. Last reviewed is October 2026.

Stripe’s [Series I post](https://stripe.com/newsroom/news/stripe-series-i-employee-liquidity) of 15 March 2023 names the round, so the round is Series I, Mar 2023. Their [24 February 2026 letter](https://stripe.com/newsroom/news/stripe-2025-update) announces a tender at $159 billion and does not name a letter, so the round stays Series I. The [Sessions 2024 page](https://stripe.com/en-ca/sessions/2024/craft-and-beauty-the-business-value-of-form-in-function) names Katie Dill, Head of Design, and publishes her talk on craft. The [Design Program Manager](https://stripe.com/careers/listing/design-program-manager-research-operations/8155390) posting names a design organisation of product designers, content designers, design researchers, design systems engineers, motion designers, and design program specialists. That seat reports to the Head of Design Operations. The [Design Engineer, Expansion](https://stripe.com/careers/listing/design-engineer-expansion/8212314) posting asks a design engineer to prototype and build, with other design engineers. That seat is remote in the United States. [Sail](https://stripe.com/careers/listing/product-designer-design-systems/7983076) is the design system, in Barcelona, and the posting says designers work with front-end engineers. [Product Designer, Risk](https://stripe.com/careers/listing/product-designer-risk/7954118) is open in London and at the Dublin headquarters. That posting publishes £93,200 to £139,800. The Sail posting says office-assigned seats spend at least half the month in the office. Other design seats are remote. Stripe did not pick one mode, so work stays off. The signals on the record are design leadership, a design team, design and engineering, and public design. Hiring is on, at the design search Roy named. Checked 10 Oct 2026.

Deel’s [Series E post](https://www.deel.com/blog/new-investment-valuation/) of 20 October 2025 names a $300 million round at a $17.3 billion valuation, so the round is Series E, Oct 2025. The [interview with Muhammed Salim](https://www.deel.com/blog/meet-deel-muhammed-salim/) names him Director of Product Design. It describes five groups led by lead product designers, weekly design reviews, and a design team mostly in the UK. That page describes 23 product designers and a company of 800 people. The [Senior AI Design Engineer](https://jobs.deel.com/deel/job-details/adaa0161-cd93-47d0-aaf3-bd6eabc61a6c/overview) posting, dated 15 September 2026, says the company is 7,000 people, so the 23 is an earlier count. That seat works in Figma and in code, with design leadership, and the United Kingdom is one of the places. The [Director, Product Design](https://www.deel.com/careers/job/dbef3963-6b0e-497d-b081-f3d5a8b5302b/) posting asks the seat to build and run a design organisation, and the United Kingdom is one of the places. The [careers page](https://www.deel.com/careers/) says the company works from anywhere, so work is remote. The signals on the record are design leadership, a design team, design and engineering, and public design. Hiring is on. Product & Design was an open department on that careers page. Checked 10 Oct 2026. No person to follow was named. Do not guess one.

### After the company list

The company list is filed. The button loader, the Friday role pass, and the quadrant are the next work.

The mark half of the wait is in. Next and Lock are pressable, and an empty Next names the fix, but the button still has no loader. Lock does not hold the mark. Do not add a server to slow the list. Do not install the Dot Matrix registry. The paths already live on the tile.

Each Friday, run the five sources in the fund pass under Done this session, then `grok-roles-prompt.md`, then `stage-check.md` for every company still on pre-seed or seed and for any later company whose round is missing. Check every hit on the company careers page. A closed role moves to `lib/archive.ts`. A new open role goes in `lib/lists/YYYY-Www.ts` and shows on the table under that week. The list is still tagged by hand. A model does not write the band. The same rule as the parked Jev box: sort the posting into the closed values, and if the sort is unsure, leave it off.

Week 40 is filed. Checked 2 Oct 2026, including the fund pass the same day. Wise’s six product designer seats were added on 4 Oct, still inside this week.

The place cut for Roy is London in the room, or remote that includes Europe. Sequence, Edra, tldraw, and Granola want London. Cal.com, Circle, Chromatic, and Linear’s principal product designer are remote and include Europe. voize is Berlin or remote inside Germany. Mercura is Munich, five days, and German is required. These posts are employment. A freelance start was not what they listed.

Product designer belongs when the posting is that seat: design origin, the proof is a file or a prototype, an engineer still holds backend and data. Do not file it as the ship-plus-frontend grade. ElevenLabs Creative & Studio already left: that posting is now a frontend engineer.

A pass on X, with Grok, on a week or a month. It finds postings and people hiring. Roy still tags the band, the craft, and the seat, and copies salary and place only when the company published them. The pass does not scrape this page, and it does not add a server. Cal.com came from an X post Roy found. The posting is on `cal.com/jobs/senior-product-designer`. The heading says Senior Product Design Engineer.

A newsletter is how someone comes back for that pass. It can ask for an address. Do not put a signup form on the questions. The letter is the list, not a second product. An address is not part of the Supabase wire-up. The email field under the company list was dropped on 10 Oct. Do not put it back.

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

## Direction (10 Oct 2026)

The list is companies where design has a say, not a board of open seats and not a filter of his week. The notes from 10 Oct are `w41-5-11-Oct/design-culture-1.txt` and `w41-5-11-Oct/Startup Design Culture Advice.txt`. The useful object is the company. A seat is one signal. A company with no opening stays when the design reading holds.

Remote, three or four days, and hire-from-the-UK are his. They are fields. They are not the cut. No design leadership is the reason a name stays off. An on-site company with a strong room stays on. An agency is a second kind of place, not an industry. Hire-from-the-UK is confirmed, indicated, or unknown. A score out of ten is not a field.

The six questions still say what kind of design engineer he is. They are not the next build. A panel that lets someone else weight design culture, salary, and remote is a different product. Do not build it.

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

The personal agent is the last product, not this one. Later, one agent is how you get the next product or service, first digital, then physical. Beth is the first skill that agent would run: place the person, name the kind, name the one gap. Hold the LinkedIn agent is in On the row. Do not build the agent in this repo.

## Open

Unranked, and not next. The quadrant cells are named. The grid is not on the result. Do not treat the order below as priority.

- Look at the ask screen in the browser against the [Beth](https://www.figma.com/design/qyO4FMguMfbsb5Bb8iU2Ut/Beth) frames and note only what the questionnaire’s own layout still misses. Do not rebuild a custom form to close that gap. Placement does not move. The band is still `lockFrom` in `lib/place.ts`.
- A row already opens the posting sentence, the craft, the seat, salary, and place. Richer detail on that sheet waits. The design readings on the company record are the cut under Next. They are for his shortlist. They are not a richer jobs board.
- More product-designer seats, for a person who owns the look while an engineer still holds backend and data. The 2 Oct fund pass filed Sequence, Edra, Circle, Lovable, voize, Hera, telli, and Mirelo beside Granola and ElevenLabs. The next pass uses the same five sources.
