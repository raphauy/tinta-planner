import { DataLead } from "@/app/agency/[slug]/crm/leads/(crud)/actions";
import { prisma } from "../app/(server-side)/db";
import { getClientById, getClientBySlug } from "../app/(server-side)/services/getClients";
import { LeadFormValues } from "@/app/agency/[slug]/crm/leads/(crud)/main-form";
import { Client, Lead, Service } from "@prisma/client";
import { getService } from "./serviceService";

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
  }

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

  return found
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
    }
  })

  return created
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