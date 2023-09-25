"use server"

import { DataToGraph, changeStatus, createInforme, deleteInforme, editInforme, getDataToGraph, getInforme, updateDataIndicators } from "@/services/informeService";
import { Informe } from "@prisma/client";
import { InformeFormValues } from "./informe-form";
import { revalidatePath } from "next/cache";
import { getClientById } from "@/app/(server-side)/services/getClients";

export type IndicatorValue = {
    id: string
    name: string
    description: string | null
    type: string
    icon: string
    previousValue: number
    value: number
    indicatorId: string
}

export type DataInforme = {
    id: string
    name: string
    month: Date
    status: string
    notasFacebook: string | null
    notasInstagram: string | null
    notasLinkedin: string | null
    indicators: IndicatorValue[]
}
  

export async function getDataInforme(id: string): Promise<DataInforme | null>{
    const informe= await getInforme(id)
    if (!informe) return null   

    const data: DataInforme= {
        id: informe.id,
        name: informe.name,
        month: informe.month,
        status: informe.status,
        notasFacebook: informe.notasFacebook,
        notasInstagram: informe.notasInstagram,
        notasLinkedin: informe.notasLinkedin,
        indicators: informe.dataIndicators.map(dataIndicator => {
            return {
                id: dataIndicator.id,
                name: dataIndicator.indicator.name,
                description: dataIndicator.indicator.description,
                type: dataIndicator.indicator.type,
                icon: dataIndicator.indicator.icon,
                previousValue: dataIndicator.previousValue,
                value: dataIndicator.value,
                indicatorId: dataIndicator.indicatorId
            }
        }
    )}            
    
    return data
}

export async function create(slug: string, data: InformeFormValues): Promise<Informe | null> {       
    const created= await createInforme(slug, data)

    console.log(created);

    revalidatePath(`/agency/${slug}/social/informes`)

    return created
}
  
export async function update(id: string, data: InformeFormValues): Promise<Informe | null> {  
    const edited= await editInforme(id, data)    
    const client= await getClientById(edited?.clientId)
    const slug= client?.slug

    revalidatePath(`/agency/${slug}/social/informes`)
    
    return edited
}


export async function eliminate(id: string): Promise<Informe | null> {    
    const deleted= await deleteInforme(id)
    const client= await getClientById(deleted?.clientId)
    const slug= client?.slug

    revalidatePath(`/agency/${slug}/social/informes`)

    return deleted
}

export async function updateDataIndicatorsAction(slug: string, json: string) {
    updateDataIndicators(json)

    revalidatePath(`/agency/${slug}/social/informes`)
}

export async function getDataToGraphAction(indicatorId: string, clientId: number) {
    const data= await getDataToGraph(indicatorId, clientId)

    return data
}

export async function publishInforme(id: string) {
    await changeStatus(id, 'published')
}

export async function draftInforme(id: string) {
    await changeStatus(id, 'draft')
}