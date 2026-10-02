import { cn } from "@/lib/utils"

import { quadrant } from "@/lib/catalog"
import type { Lock } from "@/lib/place"
import { cellKey, cellOrder, quadrantLabel } from "@/lib/quadrant"

/**
 * Four cells. The lock picks the one that says You.
 * Row one is a file. Row two is a diff.
 * Column one is design. Column two is engineering.
 * The ask screen does not mount this. The questions come first.
 */
export function Quadrant({ lock }: { lock: Lock }) {
  const here = cellKey(lock)

  return (
    <figure className="flex flex-col gap-2" aria-label={quadrantLabel(lock)}>
      <p className="text-center text-sm text-muted-foreground">{quadrant.file}</p>
      <div className="grid grid-cols-2 text-sm text-muted-foreground">
        <p>{quadrant.design}</p>
        <p className="text-right">{quadrant.engineering}</p>
      </div>
      <div className="grid grid-cols-2 border">
        {cellOrder.map((key) => (
          <Cell key={key} id={key} you={key === here} />
        ))}
      </div>
      <p className="text-center text-sm text-muted-foreground">{quadrant.diff}</p>
    </figure>
  )
}

function Cell({ id, you }: { id: (typeof cellOrder)[number]; you: boolean }) {
  const cell = quadrant.cells[id]

  return (
    <div
      className={cn(
        "flex min-h-36 flex-col gap-1 p-3",
        id === "design-file" && "border-r border-b",
        id === "engineering-file" && "border-b",
        id === "design-diff" && "border-r"
      )}
    >
      {cell.names.map((name) => (
        <p key={name} className="text-base font-medium">
          {name}
        </p>
      ))}
      {cell.people.map((person) => (
        <p key={person} className="text-sm text-muted-foreground">
          {person}
        </p>
      ))}
      {you ? <p className="text-sm font-medium">{quadrant.you}</p> : null}
    </div>
  )
}
