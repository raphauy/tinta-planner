"use server"

import { createIndicator, deleteIndicator, editIndicator, getIndicator } from "@/services/indicatorService";
import { Indicator } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { getClientById } from "@/app/(server-side)/services/getClients";
import { IndicatorFormValues } from "./indicator-form";

export type DataIndicator = {
    id: string
    name: string
    description: string | null
    type: string
    icon: string
    order: number
}
  

export async function getDataIndicator(indicatorId: string): Promise<DataIndicator | null>{
    const indicator= await getIndicator(indicatorId)
    if (!indicator) return null

    const data: DataIndicator= {
        id: indicator.id,
        name: indicator.name,
        description: indicator.description,
        type: indicator.type,
        icon: indicator.icon,
        order: indicator.order
    }
    return data
}

export async function create(data: IndicatorFormValues): Promise<Indicator | null> {       
    const created= await createIndicator(data)

    console.log(created);

    revalidatePath(`/config/indicators`)
    revalidatePath(`/config/reports`)

    return created
}
  
export async function update(indicatorId: string, data: IndicatorFormValues): Promise<Indicator | null> {  
    const edited= await editIndicator(indicatorId, data)    

    revalidatePath(`/config/indicators`)
    revalidatePath(`/config/reports`)
    
    return edited
}


export async function eliminate(indicatorId: string): Promise<Indicator | null> {    
    const deleted= await deleteIndicator(indicatorId)

    revalidatePath(`/config/indicators`)
    revalidatePath(`/config/reports`)

    return deleted
}

