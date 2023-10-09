import { CalendarDays, Edit } from "lucide-react"
import { DataNote, createNoteAction, updateNoteAction } from "../(crud)/actions"
import { utcToZonedTime } from "date-fns-tz"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import { NoteDialog } from "../(crud)/note-dialog"
import { Trash2 } from "lucide-react"

interface Props {
    note: DataNote
}
export default function NoteBox({ note }: Props) {
    const created = utcToZonedTime(note.createdAt, 'America/Montevideo')
    const formattedCreated= format(created, "MMMM dd, yyyy", { locale: es })

    const editTrigger= (<Edit size={27} className="pr-2 hover:cursor-pointer text-sky-400"/>)
    const eliminateTrigger= (<Trash2 size={20} className="text-red-400 hover:cursor-pointer"/>)

    return (
        <div className="border-t">
            <div className="flex items-center justify-between">
                <p className="text-lg font-semibold">{note.title}</p>
                <div className="flex items-center">
                    <CalendarDays className="w-4 h-4 mr-2 opacity-70" />{" "}
                    <span className="text-xs text-muted-foreground">              
                        {formattedCreated}
                    </span>
                </div>
            </div>
            <div className="flex items-center justify-between">
                <div className="py-4" dangerouslySetInnerHTML={{ __html: note.text || "" }} />
                <div className="flex items-center justify-end gap-1">
                    <NoteDialog create={createNoteAction} update={updateNoteAction} leadId={note.leadId} id={note.id} title="Editar Nota" trigger={editTrigger}  />
                    {eliminateTrigger}
                </div>
            </div>

        </div>
)
}
