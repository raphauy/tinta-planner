"use server"

import { getClientById } from "@/app/(server-side)/services/getClients";
import { createLead, createNote, deleteLead, deleteNote, editLead, getData, getDataNote, getLead, getNote, getNotes, updateNote, updateStatus } from "@/services/leadService";
import { Lead, Note } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { LeadFormValues } from "./main-form";
import { NoteFormValues } from "./note-form";

export type DataLead = {
    id: string
    company: string
    status: string
    priority: string
    value: number
    contactName: string
    contactEmail: string
    contactPhone: string
    lastContact: Date | null
    clientId: number
    clientSlug: string
    serviceId: string
    serviceName: string
    serviceEmoji: string
    createdAt: Date
    updatedAt: Date
    website: string
    linkedin: string
    instagram: string
    twitter: string
}

export type DataNote = {
    id: string
    title: string
    text: string | null
    createdAt: Date
    updatedAt: Date
    leadId: string
    leadCompany: string
}
  

export async function getDataLead(id: string): Promise<DataLead | null>{
    const lead= await getLead(id)
    if (!lead) return null
    const client= lead.client
    if (!client) return null

    const data: DataLead= getData(lead, lead.service, client.slug)
    return data
}

export async function create(data: LeadFormValues): Promise<Lead | null> {       
    const created= await createLead(data)

    const client= await getClientById(created.clientId)
    if (!client) return created

    revalidatePath(`/agency/${client.slug}/crm/leads`)

    return created
}
  
export async function update(id: string, data: LeadFormValues): Promise<Lead | null> {  
    const edited= await editLead(id, data)    

    const client= await getClientById(edited.clientId)
    if (!client) return edited

    revalidatePath(`/agency/${client.slug}/crm/leads`)
    
    return edited
}

export async function updateStatusAction(id: string, status: string): Promise<Lead | null> {  
    const updated= await updateStatus(id, status)
    if (!updated) return updated

    const client= await getClientById(updated.clientId)
    if (!client) return updated

    revalidatePath(`/agency/${client.slug}/crm/leads`)
    
    return updated
}


export async function eliminate(id: string): Promise<Lead | null> {    
    const deleted= await deleteLead(id)

    if (!deleted?.clientId) return deleted

    const client= await getClientById(deleted.clientId)
    if (!client) return deleted

    revalidatePath(`/agency/${client.slug}/crm/leads`)

    return deleted
}


/**
 * Notes 
 */

export async function getDataNoteAction(id: string): Promise<DataNote | null>{
    const note= await getNote(id)
    if (!note) return null

    const lead= await getLead(note.leadId)
    const data: DataNote= await getDataNote(note, lead?.company || "")
    return data
}


export async function createNoteAction(data: NoteFormValues): Promise<Note | null> {       
    const created= await createNote(data)
    if (!created) return created

    if (!created?.leadId) return created

    const lead= await getLead(created.leadId)
    if (!lead) return created
    
    const client= await getClientById(lead.clientId)
    if (!client) return created

    revalidatePath(`/agency/${client.slug}/crm/leads`)

    return created
}
  
export async function updateNoteAction(id: string, data: NoteFormValues): Promise<Note | null> {  
    const updated= await updateNote(id, data)

    if (!updated) return updated

    const lead= await getLead(updated.leadId)
    if (!lead) return updated

    const client= await getClientById(lead.clientId)
    if (!client) return updated

    revalidatePath(`/agency/${client.slug}/crm/leads`)
    
    return updated
}

export async function eliminateNoteAction(id: string): Promise<Note | null> {
    const deleted= await deleteNote(id)

    if (!deleted?.leadId) return deleted

    const lead= await getLead(deleted.leadId)
    if (!lead) return deleted

    const client= await getClientById(lead.clientId)
    if (!client) return deleted

    revalidatePath(`/agency/${client.slug}/crm/leads`)

    return deleted
}

export async function getNotesAction(leadId: string): Promise<DataNote[]> {
    const notes= await getNotes(leadId)
    return notes
}