# design.md

House taste for Last. Read this before changing UI. Same lock as Holt: shadcn primitives only.

## Type

- Face: Open Runde (`--font-sans`). Regular for body, medium for `font-medium`. Body is `text-base` (1rem). One face. Do not add another.
- The mark is the dithered 24px dot tile. The name is not set beside it.
- Section titles are uppercase, regular, `tracking-wide`, `leading-heading` (1.1), and `text-balance`. A week under a section is `text-sm`. On skip the week is the section, so it stays `text-base`.
- Descriptions use `text-pretty`. Text that wraps to several lines uses `leading-normal` (1.5).
- A name that opens a sheet uses `.underline-name`. The line comes from the font.
- Step count is `text-sm` with tabular figures. Badges are `text-xs` uppercase, `tracking-wide`, square, `bg-muted`. Letter caps stay `text-xs` on the same face.
- Rules are the characters `***` and `---`.

## Colour

- The default theme. Primary stays near-black. No second accent.
- Light, dark, and system. Light is stone 50 with white cards. Dark uses the stone dark tokens. System follows the machine. The control is in the header.
- Grays are stone, the warm default. Not neutral, not zinc.
- Surfaces: `background`, `card`, `sidebar`, `muted`.
- Text: `foreground`, `muted-foreground`.
- Accent is `primary` only.
- No raw palette classes, no gradient text.

## Space

- Prefer `gap-*` on flex and grid.
- Article column: `max-w-lg`, `px-6`, `py-10`.
- No arbitrary values.

## Components

- Navigation: `Sidebar`.
- Steps: `Card`, `Badge`, `Breadcrumb`.
- Missing routes: `Empty`.
- Actions: `Button` variants. Do not restyle Button with custom colours.

## Voice

- Short and specific.
- Copy lives in `lib/catalog.ts`.
