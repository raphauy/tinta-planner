"use server"
  
import { EnvioDAO, EnvioFormValues, createEnvio, deleteEnvio, getEnvioDAO, sendEnvioToAllContacts, sendTestEmail, updateEnvio } from "@/services/envio-services"
import { getNewslettersDAOByClientId } from "@/services/newsletter-services"
import { revalidatePath } from "next/cache"
import { DataSelect } from "./envio-forms"
import getCurrentUser from "@/app/(server-side)/services/getCurrentUser"

    

export async function getEnvioDAOAction(id: string): Promise<EnvioDAO | null> {
    return getEnvioDAO(id)
}

export async function createOrUpdateEnvioAction(id: string | null, data: EnvioFormValues): Promise<EnvioDAO | null> {       
    let updated= null
    if (id) {
        updated= await updateEnvio(id, data)
    } else {
        updated= await createEnvio(data)
    }     

    revalidatePath("/newsletter/envios")

    return updated as EnvioDAO
}

export async function deleteEnvioAction(id: string): Promise<EnvioDAO | null> {    
    const deleted= await deleteEnvio(id)

    revalidatePath("/newsletter/envios")

    return deleted as EnvioDAO
}
    

export async function getNewslettersDataSelectByClientId(clientId: number): Promise<DataSelect[]> {
    const newsletters= await getNewslettersDAOByClientId(clientId)

    const res= newsletters.map((newsletter) => {
        return {
            value: newsletter.id,
            label: newsletter.name
        }
    })

    return res as DataSelect[]
}


export async function sendTestEmailAction(envioId: string, emailTo: string): Promise<boolean> {    
    const res= await sendTestEmail(envioId, emailTo)
    revalidatePath("/newsletter/envios")
    return res
}

export async function sendEnvioToAllContactsAction(envioId: string) {
    const currentUser= await getCurrentUser()
    if (!currentUser) {
        throw new Error("No current user")
    }
    console.log("Sending envio to all contacts with user: ", currentUser.name);
    

    const res= await sendEnvioToAllContacts(envioId, currentUser.name || "Unknown")
    revalidatePath("/newsletter/envios")
    return res
}