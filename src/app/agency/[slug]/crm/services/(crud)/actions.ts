"use server"

import getClientServices, { createService, deleteService, editService, getService } from "@/services/serviceService";
import { Service } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { getClientById } from "@/app/(server-side)/services/getClients";
import { ServiceFormValues } from "./main-form";

export type DataService = {
    id: string
    name: string
    description?: string
    price?: number
    emoji?: string
    clientId: number
    clientSlug: string
}

export async function getDataServices(clientId: number): Promise<DataService[]>{
    const services= await getClientServices(clientId)

    return services
}

export async function getDataService(id: string): Promise<DataService | null>{
    const service= await getService(id)
    if (!service) return null
    const client= service.client
    if (!client) return null

    const data: DataService= {
        id: service.id,
        name: service.name,
        description: service.description || "",
        price: service.price || 0,
        emoji: service.emoji || "",
        clientId: service.clientId,
        clientSlug: client.slug,
    }
    return data
}

export async function create(slug: string, data: ServiceFormValues): Promise<Service | null> {       
    const created= await createService(slug, data)

    console.log(created);

    revalidatePath(`/agency/${slug}/crm/services`)

    return created
}
  
export async function update(slug: string, id: string, data: ServiceFormValues): Promise<Service | null> {  
    const edited= await editService(id, data)    

    revalidatePath(`/agency/${slug}/crm/services`)
    
    return edited
}


export async function eliminate(id: string): Promise<Service | null> {    
    const deleted= await deleteService(id)

    if (!deleted?.clientId) return deleted

    const client= await getClientById(deleted.clientId)
    if (!client) return deleted

    revalidatePath(`/agency/${client.slug}/crm/services`)

    return deleted
}

