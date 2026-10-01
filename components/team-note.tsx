import { buttonVariants } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { team } from "@/lib/catalog"

/**
 * One note at the top of the roles.
 * The questions are a lens for the list. They do not score a band.
 */
export function TeamNote() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{team.title}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        <p className="text-sm leading-relaxed text-pretty">{team.lead}</p>
        <p className="text-sm font-medium">{team.ask}</p>
        <div className="flex flex-col gap-2">
          {team.questions.map((question) => (
            <p key={question} className="text-sm leading-relaxed text-pretty">
              {question}
            </p>
          ))}
        </div>
        <a
          href={team.href}
          className={buttonVariants({
            variant: "link",
            className: "h-auto justify-start px-0",
          })}
          target="_blank"
          rel="noopener noreferrer"
        >
          {team.credit}
        </a>
      </CardContent>
    </Card>
  )
}
