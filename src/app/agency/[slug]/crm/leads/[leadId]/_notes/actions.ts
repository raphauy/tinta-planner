"use server"

import { getClientById } from "@/app/(server-side)/services/getClients";
import { createNote, deleteNote, getDataNote, getLead, getNote, getNotes, updateNote } from "@/services/leadService";
import { Note } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { TitleFormValues } from "../title-form";
import { updateDescription, updateTitle } from "@/services/noteService";
import { DescriptionFormValues } from "../description-form";




/**
 * Notes 
 */

// export async function getDataNoteAction(id: string): Promise<DataNote | null>{
//     const note= await getNote(id)
//     if (!note) return null

//     const lead= await getLead(note.leadId)
//     const data: DataNote= await getDataNote(note, lead?.company || "")
//     return data
// }


// export async function createNoteAction(data: NoteFormValues): Promise<Note | null> {       
//     const created= await createNote(data)
//     if (!created) return created

//     if (!created?.leadId) return created

//     const lead= await getLead(created.leadId)
//     if (!lead) return created
    
//     const client= await getClientById(lead.clientId)
//     if (!client) return created

//     revalidatePath(`/agency/${client.slug}/crm/leads`)
//     revalidatePath(`/agency/${client.slug}/crm/leads/${lead.id}`)

//     return created
// }


// export async function getNotesAction(leadId: string): Promise<DataNote[]> {
//     const notes= await getNotes(leadId)
//     return notes
// }
export async function updateNoteTitleAction(id: string, data: TitleFormValues): Promise<boolean> {  
    const updated= await updateTitle(id, data)

    if (!updated) return false

    const lead= await getLead(updated.leadId)
    if (!lead) return false

    const client= await getClientById(lead.clientId)
    if (!client) return false

    revalidatePath(`/agency/${client.slug}/crm/leads`)
    revalidatePath(`/agency/${client.slug}/crm/leads/${lead.id}`)
    
    return true
}

export async function updateNoteDescriptionAction(id: string, data: DescriptionFormValues): Promise<boolean> {  
    
    const updated= await updateDescription(id, data)

    if (!updated) return false

    const lead= await getLead(updated.leadId)
    if (!lead) return false

    const client= await getClientById(lead.clientId)
    if (!client) return false

    revalidatePath(`/agency/${client.slug}/crm/leads`)
    revalidatePath(`/agency/${client.slug}/crm/leads/${lead.id}`)
    
    return true
}

export async function deleteNoteAction(id: string): Promise<boolean> {
    const deleted= await deleteNote(id)

    if (!deleted?.leadId) return false

    const lead= await getLead(deleted.leadId)
    if (!lead) return false

    const client= await getClientById(lead.clientId)
    if (!client) return false

    revalidatePath(`/agency/${client.slug}/crm/leads`)
    revalidatePath(`/agency/${client.slug}/crm/leads/${lead.id}`)

    return true
}
