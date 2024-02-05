"use server"
  
import { revalidatePath } from "next/cache"
import { ContactDAO, ContactFormValues, createContact, updateContact, getFullContactDAO, deleteContact, importContacts } from "@/services/contact-services"
import { isEmailValid } from "@/lib/utils"


export async function getContactDAOAction(id: string): Promise<ContactDAO | null> {
    return getFullContactDAO(id)
}

export async function createOrUpdateContactAction(id: string | null, data: ContactFormValues): Promise<ContactDAO | null> {       
    let updated= null
    if (id) {
        updated= await updateContact(id, data)
    } else {
        updated= await createContact(data)
    }     

    revalidatePath("/newsletter/contacts")

    return updated as ContactDAO
}

export async function deleteContactAction(id: string): Promise<ContactDAO | null> {    
    const deleted= await deleteContact(id)

    revalidatePath("/newsletter/contacts")

    return deleted as ContactDAO
}

export type ContactImportData= {
    email: string
    name: string
}

export async function importContactsAction(clientId: number, contacts: ContactImportData[]): Promise<string> {        
    const res= await importContacts(clientId, contacts)
    
    revalidatePath("/newsletter/contacts")

    return res
}

