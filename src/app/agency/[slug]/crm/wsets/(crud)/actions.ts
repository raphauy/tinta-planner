"use server"

import { revalidatePath } from "next/cache";
import getAllWsets, { deleteWset, getWset, importWset } from "@/services/wsetService";
import { Wset } from "@prisma/client";

export type DataWset = {
    id: string
    institute: string
    location: string
    email: string
    phone: string
    website: string
    imported: boolean
}

export async function getAllDataWsets(): Promise<DataWset[]>{
    const wsets= await getAllWsets()

    return wsets
}

export async function getDataWset(id: string): Promise<DataWset | null>{
    const data= await getWset(id)
    return data
}

export async function eliminate(id: string): Promise<Wset | null> {    
    const deleted= await deleteWset(id)

    revalidatePath(`/agency/tinta/crm/wsets`)

    return deleted
}

export async function importAction(id: string) {    
    await importWset(id)

    revalidatePath(`/agency/tinta/crm`)
    
}

