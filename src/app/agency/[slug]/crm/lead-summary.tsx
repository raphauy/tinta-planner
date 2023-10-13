import { format } from "date-fns"
import { utcToZonedTime } from "date-fns-tz"
import { es } from "date-fns/locale"
import { CalendarDays, Globe, Instagram, Linkedin, Twitter } from "lucide-react"
import Link from "next/link"
import { DataLead, getNotesAction } from "./leads/(crud)/actions"
import { StatusSelector } from "./leads/status-selector"
import { HoverNote } from "./leads/(crud)/hover-note"

interface Props {
  lead: DataLead
  href: string
}
export default async function LeadSummary({ lead, href }: Props) {

    const notes= (await getNotesAction(lead.id)).reverse()

    const created = utcToZonedTime(lead.createdAt, 'America/Montevideo')
    const formattedCreated= format(created, "MMM dd", { locale: es })

    return (
        <div className="flex flex-col gap-2 p-1 bg-white border rounded-md">

          <div className="flex items-start justify-between gap-2 mt-1">
            <div className="flex items-center text-sm font-bold text-gray-600">
              <Link key={lead.id} href={href}>{ lead.company }</Link>
            </div>


            <div className="flex items-center">
              {/* {
              lead.type ?
                <div className="flex items-center justify-center w-5 h-5 p-1 text-sm font-bold text-white bg-orange-400 rounded-full">
                  { lead.type.charAt(0).toUpperCase()  }
                </div> :
                <p></p>
              } */}
              <p>{ lead.serviceEmoji }</p>
            </div>

          </div>

          <div className="flex items-center justify-between text-muted-foreground">

            <div className="flex">
              {
                notes.map((note, index) => {
                  return (
                    <HoverNote key={index} note={note} />
                  )
                })
              }
            </div>
            <div className="text-sm">
              { lead.value && lead.value !== 0 ? (lead.value.toLocaleString(undefined, {localeMatcher: 'best fit', style: 'decimal', useGrouping: true}).replace(/,/g, '.') + " USD") : ""}
            </div>
            <div className="flex items-center">
              <CalendarDays className="w-4 h-4 mr-1 opacity-70" />{" "}
              <span className="text-sm">              
                  {formattedCreated}
              </span>
            </div>

          </div>


        </div>
      )
}


function Links(lead: DataLead) {
  return (
    <div className="flex items-center gap-3">
      { lead.website !== "" ?
        <Link href={lead.website} target="_blank"><Globe size={17} className="text-green-400" /></Link> :
        <Globe size={17} />
      }
      { lead.linkedin !== "" ?
        <Link href={"https://www.linkedin.com/in/" + lead.linkedin} target="_blank"><Linkedin size={17} className="text-blue-400" /></Link> :
        <Linkedin size={17} />
      }
      { lead.instagram !== "" ?
        <Link href={"https://www.instagram.com/" + lead.instagram} target="_blank"><Instagram size={17} className="text-pink-400" /></Link> :
        <Instagram size={17} />
      }
      { lead.twitter !== "" ?
        <Link href={"https://twitter.com/" + lead.twitter} target="_blank"><Twitter size={17} className="text-blue-400" /></Link> :
        <Twitter size={17} />
      }              
    </div>
  )
  
}