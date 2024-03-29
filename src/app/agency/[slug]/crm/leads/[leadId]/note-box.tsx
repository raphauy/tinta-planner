import { format } from "date-fns"
import { utcToZonedTime } from "date-fns-tz"
import { es } from "date-fns/locale"
import { CalendarDays } from "lucide-react"
import { DataNote } from "../(crud)/actions"
import { deleteNoteAction, updateNoteDescriptionAction, updateNoteTitleAction } from "./_notes/actions"
import { DeleteDialog } from "./_notes/delete-dialog"
import { TitleForm } from "./title-form"
import { Preview } from "@/components/preview"
import { DescriptionForm } from "./description-form"

interface Props {
    note: DataNote
}
export default function NoteBox({ note }: Props) {
    const created = utcToZonedTime(note.createdAt, 'America/Montevideo')
    const formattedCreated= format(created, "MMMM dd, yyyy", { locale: es })

    return (
        <div className="mt-2 border rounded-md bg-slate-100">
            <div className="flex items-center justify-between px-2 border-b">
                <TitleForm id={note.id} initialData={{ title: note.title }} update={updateNoteTitleAction} />
                <div className="flex items-center">
                    <CalendarDays className="w-4 h-4 mr-2 opacity-70" />{" "}
                    <span className="text-xs text-muted-foreground">              
                        {formattedCreated}
                    </span>
                </div>
            </div>
            <div className="flex items-end justify-between">
                {/* <div className="py-4" dangerouslySetInnerHTML={{ __html: note.text || "" }} />  */}
                <div className="flex-1">
                    <DescriptionForm id={note.id} initialData={{ description: note.text || ""}} update={updateNoteDescriptionAction} />
                </div>
                

                <div className="flex items-center justify-end pb-2 pr-1">
                    <DeleteDialog tipo="Nota" nombre={note.title} back={false} id={note.id} eliminate={deleteNoteAction} />
                </div>
            </div>

        </div>
)
}
