"use server"

import getIndicators from "@/services/indicatorService";
import getReportDefinitions, { createReportDefinition, deleteReportDefinition, editReportDefinition, getReportDefinition, setReportToClient } from "@/services/reportDefinitionService";
import { ReportDefinition } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { DataIndicator } from "../../indicators/(crud)/actions";
import { ReportDefinitionFormValues } from "./report-definition-form";
import { getClientById } from "@/app/(server-side)/services/getClients";

export type DataReportDefinition = {
    id: string
    name: string
    description: string | null
    indicators: DataIndicator[]
    complementIndicators: DataIndicator[]    
}
  

export async function getDataReportDefinition(reportdefinitionId: string): Promise<DataReportDefinition | null>{
    const reportdefinition= await getReportDefinition(reportdefinitionId)
    if (!reportdefinition) return null

    const allIndicators= await getIndicators()

    const data: DataReportDefinition= {
        id: reportdefinition.id,
        name: reportdefinition.name,
        description: reportdefinition.description,
        indicators: reportdefinition.indicators,
        complementIndicators: allIndicators.filter(indicator => !reportdefinition.indicators.find(i => i.id === indicator.id))
    }
    return data
}

export async function getDataReportDefinitions(): Promise<DataReportDefinition[]>{
    const reportdefinitions= await getReportDefinitions()

    return reportdefinitions
}

export async function setReportToClientAction(clientId: number, reportdefinitionId: string) {
    await setReportToClient(clientId, reportdefinitionId)
}


export async function create(data: ReportDefinitionFormValues): Promise<ReportDefinition | null> {       
    const created= await createReportDefinition(data)

    console.log(created);

    revalidatePath(`/config/reportdefinitions`)

    return created
}
  
export async function update(reportdefinitionId: string, data: ReportDefinitionFormValues): Promise<ReportDefinition | null> {  
    const edited= await editReportDefinition(reportdefinitionId, data)    

    revalidatePath(`/config/reportdefinitions`)
    
    return edited
}


export async function eliminate(reportdefinitionId: string): Promise<ReportDefinition | null> {    
    const deleted= await deleteReportDefinition(reportdefinitionId)

    revalidatePath(`/config/reportdefinitions`)

    return deleted
}

