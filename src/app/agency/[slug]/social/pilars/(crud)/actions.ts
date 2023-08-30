"use server"

import { createPilar, deletePilar, editPilar, getPilar } from "@/services/pilarService";
import { Pilar } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { getClientById } from "@/app/(server-side)/services/getClients";
import { PilarFormValues } from "./pilarForm";

export type DataPilar = {
    id: number
    name: string
    description: string
    color: string
    clientId: number
    clientSlug: string
}
  

export async function getDataPilar(id: number): Promise<DataPilar | null>{
    const pilar= await getPilar(id)
    if (!pilar) return null
    const client= pilar.client
    if (!client) return null

    const data: DataPilar= {
        id: pilar.id,
        name: pilar.name,
        description: pilar.description,
        color: pilar.color,
        clientId: pilar.clientId,
        clientSlug: client.slug,
    }
    return data
}

export async function create(slug: string, data: PilarFormValues): Promise<Pilar | null> {       
    const created= await createPilar(slug, data)

    console.log(created);

    revalidatePath(`/agency/${slug}/social/pilars`)

    return created
}
  
export async function update(slug: string, id: number, data: PilarFormValues): Promise<Pilar | null> {  
    const edited= await editPilar(id, data)    

    revalidatePath(`/agency/${slug}/social/pilars`)
    
    return edited
}


export async function eliminate(id: number): Promise<Pilar | null> {    
    const deleted= await deletePilar(id)

    if (!deleted?.clientId) return deleted

    const client= await getClientById(deleted.clientId)
    if (!client) return deleted

    revalidatePath(`/agency/${client.slug}/social/pilars`)

    return deleted
}

