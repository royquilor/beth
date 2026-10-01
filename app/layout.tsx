import type { Metadata } from "next"
import localFont from "next/font/local"

import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { TooltipProvider } from "@/components/ui/tooltip"
import { page } from "@/lib/catalog"
import { cn } from "@/lib/utils"

export const metadata: Metadata = {
  title: page.title,
  description: page.dek,
}

// Departure Mono is one weight. Body copy is 16.5px, which is 1.5 times
// the 11px pixel grid the face is drawn on. The license sits beside the file.
const departureMono = localFont({
  src: "../fonts/DepartureMono-Regular.woff2",
  weight: "400",
  style: "normal",
  variable: "--font-sans",
  display: "swap",
  adjustFontFallback: false,
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn("font-sans", departureMono.variable)}
    >
      <body>
        <ThemeProvider forcedTheme="light">
          <TooltipProvider>{children}</TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
