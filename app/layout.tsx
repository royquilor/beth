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

// Timeless Sans, the Sans cut. Regular is the body. Medium is font-medium.
// Semibold is the auth h2.
const timelessSans = localFont({
  src: [
    {
      path: "../fonts/TimelessSans-SansRegular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/TimelessSans-SansMedium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../fonts/TimelessSans-SansSemibold.woff2",
      weight: "600",
      style: "normal",
    },
  ],
  variable: "--font-sans",
  display: "swap",
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
      className={cn("font-sans", timelessSans.variable)}
    >
      <body className="antialiased">
        <script
          src="https://mcp.figma.com/mcp/html-to-design/capture.js"
          async
        />
        <ThemeProvider>
          <TooltipProvider>{children}</TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
