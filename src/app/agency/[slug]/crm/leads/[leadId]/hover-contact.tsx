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
import { DataLead } from "../(crud)/actions"
import Contact from "./contact"

interface Props {
    lead: DataLead
}

export function HoverContact({ lead }: Props) {

    const contact= lead.contactName ? lead.contactName : lead.contactEmail ? lead.contactEmail : lead.contactPhone ? lead.contactPhone : "Sin contacto"

  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <p className="ml-2 text-sm text-muted-foreground">({ contact })</p>
      </HoverCardTrigger>
      <HoverCardContent className="w-full">
        <Contact lead={lead} />
      </HoverCardContent>
    </HoverCard>
  )
}
