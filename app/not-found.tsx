import Link from "next/link"

import { buttonVariants } from "@/components/ui/button"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from "@/components/ui/empty"

export default function NotFound() {
  return (
    <Empty className="min-h-svh">
      <EmptyHeader>
        <EmptyTitle>This page is not on the list</EmptyTitle>
        <EmptyDescription>
          The company list is on the front page. Where do I fit opens the
          questions.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Link href="/" className={buttonVariants()}>
          Back to Beth
        </Link>
      </EmptyContent>
    </Empty>
  )
}
