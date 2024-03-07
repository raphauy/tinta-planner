"use server"
  
import { revalidatePath } from "next/cache"
import { MessageDAO, MessageFormValues, createMessage, updateMessage, getFullMessageDAO, deleteMessage } from "@/services/message-services"


export async function getMessageDAOAction(id: string): Promise<MessageDAO | null> {
    return getFullMessageDAO(id)
}

export async function createOrUpdateMessageAction(id: string | null, data: MessageFormValues): Promise<MessageDAO | null> {       
    let updated= null
    if (id) {
        updated= await updateMessage(id, data)
    } else {
        // const currentUser= await getCurrentUser()
        // if (!currentUser) {
        //   throw new Error("User not found")
        // }
        // updated= await createMessage(data, currentUser.id)

        updated= await createMessage(data)
    }     

    revalidatePath("/whatsapp/messages")

    return updated as MessageDAO
}

export async function deleteMessageAction(id: string): Promise<MessageDAO | null> {    
    const deleted= await deleteMessage(id)

    revalidatePath("/whatsapp/messages")

    return deleted as MessageDAO
}

