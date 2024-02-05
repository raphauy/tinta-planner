"use server"
  
import { revalidatePath } from "next/cache"
import { EmailDAO, EmailFormValues, createEmail, updateEmail, getFullEmailDAO, deleteEmail } from "@/services/email-services"


export async function getEmailDAOAction(id: string): Promise<EmailDAO | null> {
    return getFullEmailDAO(id)
}

export async function createOrUpdateEmailAction(id: string | null, data: EmailFormValues): Promise<EmailDAO | null> {       
    let updated= null
    if (id) {
        updated= await updateEmail(id, data)
    } else {
        updated= await createEmail(data)
    }     

    revalidatePath("/newsletter/emails")

    return updated as EmailDAO
}

export async function deleteEmailAction(id: string): Promise<EmailDAO | null> {    
    const deleted= await deleteEmail(id)

    revalidatePath("/newsletter/emails")

    return deleted as EmailDAO
}

