import { CalendarDays } from "lucide-react"

import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card"
import { format } from "date-fns"
import { utcToZonedTime } from "date-fns-tz"
import { es } from "date-fns/locale"
import { ClipboardEdit } from "lucide-react"
import { DataNote } from "./actions"

interface Props {
    note: DataNote
}

export function HoverNote({ note }: Props) {
    const created = utcToZonedTime(note.createdAt, 'America/Montevideo')
    const formattedCreated= format(created, "MMMM dd, yyyy", { locale: es })

  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <ClipboardEdit size={20} />
      </HoverCardTrigger>
      <HoverCardContent className="w-80">
        <div className="flex justify-between space-x-4">
          <div className="space-y-1">
            <p className="text-lg font-semibold">{note.title}</p>
            <div className="py-4" dangerouslySetInnerHTML={{ __html: note.text || "" }} />
            <div className="flex items-center pt-2">
              <CalendarDays className="w-4 h-4 mr-2 opacity-70" />{" "}
              <span className="text-xs text-muted-foreground">              
                {formattedCreated}
              </span>
            </div>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  )
}
