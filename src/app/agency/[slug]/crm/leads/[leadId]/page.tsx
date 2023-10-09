import { getLead } from "@/services/leadService"
import { MenubarDemo } from "../status-menu"
import Notes from "../notes"
import Link from "next/link"
import { Globe, Linkedin, PlusCircle, Twitter } from "lucide-react"
import { Instagram } from "lucide-react"
import { createNoteAction, getNotesAction, updateNoteAction } from "../(crud)/actions"
import NoteBox from "./note-box"
import { NoteDialog } from "../(crud)/note-dialog"
import { Button } from "@/components/ui/button"

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

    return (
        <div className="flex flex-col w-full max-w-4xl gap-5 p-4 pr-0 my-auto mt-5 bg-white border rounded-lg md:pr-4 lg:pr-10">
          <div className="flex items-center justify-between min-w-[250px]">
            <p className="pl-6 text-base font-bold border-b whitespace-nowrap">{ lead.company }</p>
            <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
                <p>{ lead.serviceEmoji }</p>
                <p>{ lead.serviceName }</p>
            </div>
            </div>
                <MenubarDemo status={lead.status} id={lead.id} />
            </div>
          <div>
            <div className="flex justify-end">
                <NoteDialog create={createNoteAction} update={updateNoteAction} leadId={leadId} title="Agregar Nota" trigger={noteTrigger}  />          
            </div>

            {
                notes.map(note => (
                    <NoteBox key={note.id} note={note} />
                    )
                )
            }
          </div>
          <div className="flex items-center justify-between mt-2">
            <div className="flex items-center justify-center gap-3">
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
            <p className="pr-4">
              { lead.value && lead.value !== 0 ? (lead.value.toLocaleString('es-ES', { minimumFractionDigits: 0 } ) + " USD") : ""}
            </p>
            
          </div>           
        </div>
      )
}
