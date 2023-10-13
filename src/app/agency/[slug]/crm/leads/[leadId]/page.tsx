import { Button } from "@/components/ui/button"
import { getLead } from "@/services/leadService"
import { format } from "date-fns"
import { utcToZonedTime } from "date-fns-tz"
import { es } from "date-fns/locale"
import { CalendarDays, ClipboardEdit, Edit2, Globe, Instagram, Linkedin, PlusCircle, Twitter } from "lucide-react"
import Link from "next/link"
import { DataLead, create, createNoteAction, eliminateLeadAction, getNotesAction, update, updateNoteAction } from "../(crud)/actions"
import { LeadDialog } from "../(crud)/main-dialog"
import { NoteDialog } from "../(crud)/note-dialog"
import { StatusSelector } from "../status-selector"
import { DeleteDialog } from "./_notes/delete-dialog"
import NoteBox from "./note-box"
import { IconBadge } from "@/components/icon-badge"
import Contact from "./contact"
import { HoverContact } from "./hover-contact"

interface Props {
    params: {
        slug: string
        leadId: string
    }
}
export default async function LeadPage({ params }: Props) {
    const { slug, leadId }= params
    const lead= await getLead(leadId)
    const notes= await getNotesAction(leadId)
    if (!lead) return <div>Lead not found</div>

    const noteTrigger= (<div className="flex items-center cursor-pointer"><Button variant="ghost" className="p-1"><PlusCircle size={20} className="mr-2"/>Agregar Nota</Button></div>)

    const created = utcToZonedTime(lead.createdAt, 'America/Montevideo')
    const formattedCreated= format(created, "MMMM dd, yyyy", { locale: es })

    const editTrigger= (<Edit2 size={27} className="pr-2 hover:cursor-pointer"/>)

    return (
        <div className="flex flex-col w-full max-w-4xl gap-5 p-4 pr-0 my-auto mt-5 bg-white border rounded-lg md:pr-4 lg:pr-10">

          <div className="flex justify-between p-2 border rounded-md">

            <div className="flex flex-col justify-between gap-2 mt-1">
              <div className="flex items-center font-bold border-b">
                <p>{ lead.company }</p>
                <HoverContact lead={lead} />
              </div>

              <div className="flex items-center gap-2 mb-2">
                <p>{ lead.serviceEmoji }</p>
                <p>{ lead.serviceName }</p>
              </div>

              <Links {...lead} />
            </div>


            <div className="flex flex-col items-center justify-between">
              
              <StatusSelector status={lead.status} id={lead.id} />

              <div className="font-bold">
                { lead.value && lead.value !== 0 ? (lead.value.toLocaleString(undefined, {localeMatcher: 'best fit', style: 'decimal', useGrouping: true}).replace(/,/g, '.') + " USD") : ""}
              </div>

            </div>


            <div className="flex flex-col items-end justify-between">
              <div className="flex items-center mt-2">
                  <CalendarDays className="w-4 h-4 mr-2 opacity-70" />{" "}
                  <span className="text-sm text-muted-foreground">              
                      {formattedCreated}
                  </span>
              </div>

              <p className="text-orange-600">{lead.type}</p>

              <div className="flex items-center gap-2">
                <LeadDialog create={create} update={update} clientId={lead.clientId} title="Editar Lead" trigger={editTrigger} id={lead.id} />          
                <DeleteDialog tipo="Lead" nombre={lead.company} back={true} id={lead.id} eliminate={eliminateLeadAction} />
              </div>

            </div>
          </div>

          <div>
            <div className="flex justify-between">
              <div className="flex items-center gap-2">
                <IconBadge size="md" icon={ClipboardEdit}/> <p className="font-bold text-muted-foreground">Notas</p>
              </div>
              <NoteDialog create={createNoteAction} update={updateNoteAction} leadId={leadId} title="Agregar Nota" trigger={noteTrigger}  />          
            </div>

            {
                notes.map(note => (
                    <NoteBox key={note.id} note={note} />
                    )
                )
            }
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