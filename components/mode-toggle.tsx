"use client"

import { MoonIcon, SunIcon } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { page } from "@/lib/catalog"

const modes = ["light", "dark", "system"] as const

type Mode = (typeof modes)[number]

function isMode(value: unknown): value is Mode {
  return typeof value === "string" && modes.some((mode) => mode === value)
}

/**
 * Light, dark, or the system setting.
 * The sun and moon follow the colour on the page.
 * The check follows the choice, so system stays visible
 * when the machine is the one that picked the colour.
 * Reduced motion drops the turn between the two icons.
 */
export function ModeToggle() {
  const { theme, setTheme } = useTheme()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button
            variant="ghost"
            size="icon"
            className="grid"
            aria-label={page.theme}
          />
        }
      >
        <SunIcon className="col-start-1 row-start-1 scale-100 rotate-0 transition-[rotate,scale] motion-reduce:transition-none dark:scale-0 dark:-rotate-90" />
        <MoonIcon className="col-start-1 row-start-1 scale-0 rotate-90 transition-[rotate,scale] motion-reduce:transition-none dark:scale-100 dark:rotate-0" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuGroup>
          <DropdownMenuLabel>{page.theme}</DropdownMenuLabel>
          <DropdownMenuRadioGroup
            value={theme}
            onValueChange={(value) => {
              if (isMode(value)) {
                setTheme(value)
              }
            }}
          >
            <DropdownMenuRadioItem value="light">
              {page.light}
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="dark">
              {page.dark}
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="system">
              {page.system}
            </DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
