"use client"

import { createContext, useContext, useState } from "react"
import { cn } from "cn"

/**
 * Dithered dot tile, 24px, from the Beth lockup.
 * Five columns and five rows on a 4px grid. The four corners are left out.
 * Each dot is a 4px cell. The border in the file is the page colour
 * eating the fill, so the radius is what remains: 2 minus that border.
 * Heavier dots sit toward the lower left.
 * At rest the tile is still. Hover runs one path, clockwise, inward.
 * Beth locks several proofs into one place. The spiral is that move.
 * Next holds the question and runs a different path: a diagonal sweep.
 */

const GRID = 5

// Long enough for the sweep to cross the tile once.
export const markStepMs = 700

type MarkPhase = "rest" | "step"

const MarkPhaseContext = createContext<{
  phase: MarkPhase
  setPhase: (phase: MarkPhase) => void
}>({
  phase: "rest",
  setPhase: () => {},
})

export function MarkPhaseProvider({ children }: { children: React.ReactNode }) {
  const [phase, setPhase] = useState<MarkPhase>("rest")

  return (
    <MarkPhaseContext.Provider value={{ phase, setPhase }}>
      {children}
    </MarkPhaseContext.Provider>
  )
}

export function useMarkPhase() {
  return useContext(MarkPhaseContext)
}

const dots: readonly (readonly [number, number, number])[] = [
  [6, 2, 0.6],
  [10, 2, 0.4],
  [14, 2, 0.2],
  [2, 6, 0.8],
  [6, 6, 0.6],
  [10, 6, 0.4],
  [14, 6, 0.2],
  [18, 6, 0.2],
  [2, 10, 1],
  [6, 10, 0.8],
  [10, 10, 0.6],
  [14, 10, 0.4],
  [18, 10, 0.4],
  [2, 14, 1],
  [6, 14, 1],
  [10, 14, 0.8],
  [14, 14, 0.6],
  [18, 14, 0.6],
  [6, 18, 1],
  [10, 18, 1],
  [14, 18, 0.8],
]

const spiral = buildSpiral()
const sweep = buildSweep()

function buildSpiral() {
  const order = new Map<string, number>()
  let top = 0
  let bottom = GRID - 1
  let left = 0
  let right = GRID - 1
  let step = 0

  while (top <= bottom && left <= right) {
    for (let col = left; col <= right; col += 1) {
      order.set(`${top},${col}`, step)
      step += 1
    }

    for (let row = top + 1; row <= bottom; row += 1) {
      order.set(`${row},${right}`, step)
      step += 1
    }

    if (top < bottom) {
      for (let col = right - 1; col >= left; col -= 1) {
        order.set(`${bottom},${col}`, step)
        step += 1
      }
    }

    if (left < right) {
      for (let row = bottom - 1; row > top; row -= 1) {
        order.set(`${row},${left}`, step)
        step += 1
      }
    }

    top += 1
    bottom -= 1
    left += 1
    right -= 1
  }

  return order
}

function buildSweep() {
  const order = new Map<string, number>()
  let step = 0

  for (let diagonal = 0; diagonal <= (GRID - 1) * 2; diagonal += 1) {
    const rowStart = Math.max(0, diagonal - (GRID - 1))
    const rowEnd = Math.min(GRID - 1, diagonal)

    if (diagonal % 2 === 0) {
      for (let row = rowEnd; row >= rowStart; row -= 1) {
        order.set(`${row},${diagonal - row}`, step)
        step += 1
      }
    } else {
      for (let row = rowStart; row <= rowEnd; row += 1) {
        order.set(`${row},${diagonal - row}`, step)
        step += 1
      }
    }
  }

  return order
}

export function Mark({ className }: { className?: string }) {
  const { phase } = useMarkPhase()

  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      data-phase={phase}
      className={cn("mark-live shrink-0 text-foreground", className)}
      aria-hidden="true"
      style={{ ["--mark-step" as string]: `${markStepMs}ms` }}
    >
      {dots.map(([x, y, border]) => {
        // The tile is inset by 2px, so the first cell is not the origin.
        const col = (x - 2) / 4
        const row = (y - 2) / 4
        const cell = `${row},${col}`

        return (
          <circle
            key={`${x}-${y}`}
            cx={x + 2}
            cy={y + 2}
            r={2 - border}
            fill="currentColor"
            style={{
              ["--mark-spiral" as string]: spiral.get(cell) ?? 0,
              ["--mark-sweep" as string]: sweep.get(cell) ?? 0,
            }}
          />
        )
      })}
    </svg>
  )
}
