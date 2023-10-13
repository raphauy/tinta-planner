import { DataLead, DataNote } from "@/app/agency/[slug]/crm/leads/(crud)/actions";
import { prisma } from "../app/(server-side)/db";
import { getClientById, getClientBySlug } from "../app/(server-side)/services/getClients";
import { LeadFormValues } from "@/app/agency/[slug]/crm/leads/(crud)/main-form";
import { Client, Lead, Note, Service } from "@prisma/client";
import { getService } from "./serviceService";
import { NoteFormValues } from "@/app/agency/[slug]/crm/leads/(crud)/note-form";

export function getData(lead: Lead, service: Service, clientSlug: string) {
  const res: DataLead= {
    id: lead.id,
    company: lead.company,
    status: lead.status,
    priority: lead.priority,
    value: lead.value || 0,
    contactName: lead.contactName || "",
    contactEmail: lead.contactEmail || "",
    contactPhone: lead.contactPhone || "",
    lastContact: lead.lastContact,
    clientId: lead.clientId,
    clientSlug: clientSlug,
    serviceId: lead.serviceId,
    serviceName: service.name,
    serviceEmoji: service.emoji || "",
    createdAt: lead.createdAt,
    updatedAt: lead.updatedAt,
    website: lead.website || "",
    linkedin: lead.linkedin || "",
    instagram: lead.instagram || "",
    twitter: lead.twitter || "",
    type: lead.type || null,
  }

  return res
}


export default async function getClientLeads(clientId: number): Promise<DataLead[]> {

  const res: DataLead[]= []

  const client= await getClientById(clientId)
  if (!client)
    throw new Error()  

  const found = await prisma.lead.findMany({
    orderBy: {
      company: 'asc',
    },
    include: {
      service: true
    },
    where: {
      clientId
    },
  })

  found.forEach(lead => {
    const data= getData(lead, lead.service, client.slug)
    res.push(data)
  })

  return res
}

// leads whose status is not "Ganado" or "Perdido" or "Potencial"
export async function getClientActiveLeads(clientId: number): Promise<DataLead[]> {

  const res: DataLead[]= []

  const client= await getClientById(clientId)
  if (!client)
    throw new Error()  

  const found = await prisma.lead.findMany({
    orderBy: {
      company: 'asc',
    },
    include: {
      service: true
    },
    where: {
      clientId,
      status: {
        notIn: ["Perdido", "Potencial"]
      }
    },
  })

  found.forEach(lead => {
    const data= getData(lead, lead.service, client.slug)
    res.push(data)
  })

  return res
}

export async function filterClientLeadsByStatus(clientId: number, status: string): Promise<DataLead[]> {
  
    const res: DataLead[]= []
  
    const client= await getClientById(clientId)
    if (!client)
      throw new Error()  
  
    const found = await prisma.lead.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        service: true
      },
      where: {
        clientId,
        status
      },
    })
  
    found.forEach(lead => {
      const data= getData(lead, lead.service, client.slug)
      res.push(data)
    })
  
    return res
}


export async function getLead(id: string) {

  const found = await prisma.lead.findUnique({
    where: {
      id
    },
    include: {
      client: true,
      service: true
    }
  })

  if (!found) return null

  const res= getData(found, found.service, found.client.slug)


  return res
}

export async function createLead(data: LeadFormValues) {
  const service= await getService(data.serviceId)
  if (!service)
    throw new Error()
 
  
  const value= data.value ? parseFloat(data.value) : 0
  const created= await prisma.lead.create({
    data: {
      company: data.company,
      value,
      contactName: data.contactName,
      contactEmail: data.contactEmail,
      contactPhone: data.contactPhone,
      serviceId: service.id,
      clientId: service.clientId,
      website: data.website,
      linkedin: data.linkedin,
      instagram: data.instagram,
      twitter: data.twitter,
      type: data.type
    }
  })

  return created
}

export async function updateStatus(id: string, status: string) {

  const updated= await prisma.lead.update({
    where: {
      id
    },
    data: {
      status
    }
  })

  return updated
}

export async function editLead(id: string, data: LeadFormValues) {
  console.log(data);
  const service= await getService(data.serviceId)
  if (!service)
    throw new Error()

  const value= data.value ? parseFloat(data.value) : 0

  const edited= await prisma.lead.update({
    where: {
      id
    },
    data: {
      company: data.company,
      value,
      contactName: data.contactName,
      contactEmail: data.contactEmail,
      contactPhone: data.contactPhone,
      serviceId: service.id,
      website: data.website,
      linkedin: data.linkedin,
      instagram: data.instagram,
      twitter: data.twitter,
      type: data.type
    }
  })

  return edited
}

export async function deleteLead(id: string) {
  
  const deleted= await prisma.lead.delete({
    where: {
      id
    },
  })

  return deleted
}

/**
 * Notes section
 */

export function getDataNote(note: Note, leadCompany: string) {
  const res: DataNote= {
    id: note.id,
    title: note.title,
    text: note.text,
    createdAt: note.createdAt,
    updatedAt: note.updatedAt,
    leadId: note.leadId,
    leadCompany,
  }

  return res
}

export async function getLeadNotes(leadId: string): Promise<DataNote[]> {

  const res: DataNote[]= []

  const found = await prisma.note.findMany({
    orderBy: {
      createdAt: 'asc',
    },
    where: {
      leadId
    },
  })

  const lead= await getLead(leadId)
  found.forEach(note => {
    const data= getDataNote(note, lead?.company || "")
    res.push(data)
  })

  return res
}

export async function getNote(id: string) {

  const found = await prisma.note.findUnique({
    where: {
      id
    },
    include: {
      lead: true
    }
  })

  if (!found) return null

  const lead= await getLead(found.leadId)

  return getDataNote(found, lead?.company || "")
}

export async function createNote(data: NoteFormValues) {
  
  const created= await prisma.note.create({
    data: {
      ...data
    }
  })

  return created
}

export async function updateNote(id: string, data: NoteFormValues) {

  const updated= await prisma.note.update({
    where: {
      id
    },
    data: {
      ...data
    }
  })

  return updated
}

export async function deleteNote(id: string) {
    
    const deleted= await prisma.note.delete({
      where: {
        id
      },
    })
  
    return deleted
}

export async function getNotes(leadId: string): Promise<DataNote[]> {
  const notes= await prisma.note.findMany({
    where: {
      leadId
    },
    orderBy: {
      createdAt: 'desc',
    },
  })

  const lead= await getLead(leadId)

  const res: DataNote[]= []

  notes.forEach(note => {
    const data= getDataNote(note, lead?.company || "")
    res.push(data)
  })

  return res
}

export async function getTotalValue(clientId: number, status: string) {
  const leads= await prisma.lead.findMany({
    where: {
      clientId,
      status
    }
  })

  let total= 0
  leads.forEach(lead => {
    total+= lead.value || 0
  })

  return total
}
  
