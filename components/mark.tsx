import { cn } from "cn"

/**
 * Dithered dot tile, 24px, from the Beth lockup.
 * Five columns and five rows on a 4px grid. The four corners are left out.
 * Each dot is a 4px cell. The border in the file is the page colour
 * eating the fill, so the radius is what remains: 2 minus that border.
 * Heavier dots sit toward the lower left.
 */
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

export function Mark({ className }: { className?: string }) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      className={cn("shrink-0 text-foreground", className)}
      aria-hidden="true"
    >
      {dots.map(([x, y, border]) => (
        <circle
          key={`${x}-${y}`}
          cx={x + 2}
          cy={y + 2}
          r={2 - border}
          fill="currentColor"
        />
      ))}
    </svg>
  )
}
