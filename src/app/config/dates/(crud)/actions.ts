"use server"

import getClientFechaImportantes, { createFechaImportante, deleteFechaImportante, editFechaImportante, getClientAndGlobalFechaImportantes, getFechaImportante, getGlobalFechasImportantes } from "@/services/fechaImportanteService";
import { revalidatePath } from "next/cache";
import { FechaImportanteFormValues } from "./fecha-importante-form";
import { FechaImportante } from "@prisma/client";
import { getClientById, getClientBySlug } from "@/app/(server-side)/services/getClients";

export type DataFechaImportante = {
    id: string
    titulo: string
    fecha: Date
    clientId: number | null
    slug?: string
}


export async function getClientAndGlobalFechaImportantesBySlug(slug: string): Promise<DataFechaImportante[]> {
    const clientId= await getClientIdBySlug(slug)
    if (!clientId) return []

    const res: DataFechaImportante[]= await getClientAndGlobalFechaImportantes(clientId)

    return res
}

export async function getClientFechaImportantesBySlug(slug: string): Promise<DataFechaImportante[]> {
    const clientId= await getClientIdBySlug(slug)
    if (!clientId) return []

    const fechaImportantes= await getClientFechaImportantes(clientId)
    const res: DataFechaImportante[]= []
    for (const fechaImportante of fechaImportantes) {
        const data: DataFechaImportante= await getData(fechaImportante)
        res.push(data)
    }

    return res
}

export async function getDataFechaImportante(fechaimportanteId: string): Promise<DataFechaImportante | null>{
    const fechaimportante= await getFechaImportante(fechaimportanteId)
    if (!fechaimportante) return null

    const data: DataFechaImportante= await getData(fechaimportante)
    return data
}

export async function create(data: FechaImportanteFormValues): Promise<DataFechaImportante | null> {       
    const created= await createFechaImportante(data)

    console.log(created);

    revalidatePath(`/config/dates`)

    const res: DataFechaImportante= await getData(created)

    return res
}
  
export async function update(fechaimportanteId: string, data: FechaImportanteFormValues): Promise<DataFechaImportante | null> {  
    const edited= await editFechaImportante(fechaimportanteId, data)    

    revalidatePath(`/config/dates`)

    const res: DataFechaImportante= await getData(edited)
    
    return res
}


export async function eliminate(fechaimportanteId: string): Promise<DataFechaImportante | null> {    
    const deleted= await deleteFechaImportante(fechaimportanteId)

    revalidatePath(`/config/dates`)

    const res: DataFechaImportante= await getData(deleted)

    return res
}

export async function getClientIdBySlug(slug: string): Promise<number | null> {
    const client= await getClientBySlug(slug)
    if (!client) return null

    return client.id
}
 

export async function getData(fechaimportante: FechaImportante): Promise<DataFechaImportante>{
    let slug= null
    if (fechaimportante.clientId) {
        const client= await getClientById(fechaimportante.clientId)
        if (client) slug= client.slug
    }
    const res: DataFechaImportante= {
        id: fechaimportante.id,
        titulo: fechaimportante.title,
        fecha: fechaimportante.date,
        clientId: fechaimportante.clientId ?? null,
        slug: slug === null ? undefined : slug
    }

    return res
}

