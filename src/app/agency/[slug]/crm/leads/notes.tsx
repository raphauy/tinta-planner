"use client"

import { PlusCircle, StickyNote } from "lucide-react"
import { DataNote, createNoteAction, getNotesAction, updateNoteAction } from "./(crud)/actions"
import { NoteDialog } from "./(crud)/note-dialog"
import { useEffect, useState } from "react"
import { HoverNote } from "./(crud)/hover-note"

interface Props {
    leadId: string
}
export default function Notes({ leadId }: Props) {
    const [notes, setNotes] = useState<DataNote[]>()
    const [count, setCount] = useState(0)

    useEffect(() => {
        //const notes= await getNotesAction(leadId)
        async function getNotes() {
            const notes= await getNotesAction(leadId)
            setNotes(notes)
        }
        getNotes()
    }, [leadId, count])

    function updateNotes() {
        setCount(count + 1)        
    }
    
    if (!leadId) return (<div>No leadId</div>)
  
    const noteTrigger= (<div className="cursor-pointer"><PlusCircle size={20} className="mr-2"/></div>)
    
    return (
        <div className="flex items-center justify-end gap-1 pr-1">
            { notes &&
                notes.map(note => (
                    <HoverNote key={note.id} note={note} />
                    )
                )
            }
            <NoteDialog create={createNoteAction} update={updateNoteAction} updateNotes={updateNotes} leadId={leadId} title="Agregar Nota" trigger={noteTrigger}  />          
        </div>
    )
}
