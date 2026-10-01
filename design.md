# design.md

House taste for Last. Read this before changing UI. Same lock as Holt: shadcn primitives only.

## Type

- Face: Departure Mono (`--font-sans`), one weight. Body is `text-base` (16.5px / 24px), which is 1.5 times the 11px pixel grid. Do not turn antialiasing back on.
- The mark is the dithered 24px dot tile. The name is not set beside it.
- Step count is `text-sm`. Badges are `text-xs` uppercase, square, `bg-muted`.
- Section titles are uppercase. Rules are the characters `***` and `---`.

## Colour

- The default theme. Primary stays near-black. No second accent.
- Grays are stone, the warm default. Not neutral, not zinc.
- Surfaces: `background`, `card`, `sidebar`, `muted`.
- Text: `foreground`, `muted-foreground`.
- Accent is `primary` only.
- No raw palette classes, no gradient text.

## Space

- Prefer `gap-*` on flex and grid.
- Article column: `max-w-sm`, `px-6`, `py-10`. The frames are a 390px phone column.
- No arbitrary values.

## Components

- Navigation: `Sidebar`.
- Steps: `Card`, `Badge`, `Breadcrumb`.
- Missing routes: `Empty`.
- Actions: `Button` variants. Do not restyle Button with custom colours.

## Voice

- Short and specific.
- Copy lives in `lib/catalog.ts`.
