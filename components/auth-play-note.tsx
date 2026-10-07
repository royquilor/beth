"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

/**
 * Sits under the auth column while `?play=1` is on.
 * It is not part of the frames. Production never renders it.
 * Log in is only here when the confirmation screen has replaced the form.
 */
export function AuthPlayNote({ onBack }: { onBack?: () => void }) {
  return (
    <div className="flex flex-col items-center gap-4">
      <Badge variant="outline" className="uppercase">
        Play mode
      </Badge>
      {onBack ? (
        <Button
          type="button"
          variant="link"
          className="h-auto px-0 text-xs text-foreground no-underline hover:no-underline"
          onClick={onBack}
        >
          Log in
        </Button>
      ) : null}
    </div>
  )
}
