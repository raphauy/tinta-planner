"use server"
  
import { revalidatePath } from "next/cache"
import { ConversationDAO, ConversationFormValues, createConversation, updateConversation, getFullConversationDAO, deleteConversation, sendTintaMessage, setMessagesRead, getConversationsDAO, setSlackHook} from "@/services/conversation-services"

import { getComplentaryMessages, setMessages} from "@/services/conversation-services"
import { MessageDAO, getMessageDAO, setText } from "@/services/message-services"
import getCurrentUser from "@/app/(server-side)/services/getCurrentUser"
import { transcribeAudio } from "@/lib/audio-utils"
    

export async function getConversationDAOAction(id: string): Promise<ConversationDAO | null> {
    return getFullConversationDAO(id)
}

export async function getConversationsDAOAction(): Promise<ConversationDAO[]> {
    const data= await getConversationsDAO()
    return data
}


export async function createOrUpdateConversationAction(id: string | null, data: ConversationFormValues): Promise<ConversationDAO | null> {       
    let updated= null
    if (id) {
        updated= await updateConversation(id, data)
    } else {
        updated= await createConversation(data)
    }     

    revalidatePath("/whatsapp/conversations")

    return updated as ConversationDAO
}

export async function deleteConversationAction(id: string): Promise<ConversationDAO | null> {    
    const deleted= await deleteConversation(id)

    revalidatePath("/whatsapp/conversations")

    return deleted as ConversationDAO
}
    
export async function getComplentaryMessagesAction(id: string): Promise<MessageDAO[]> {
    const complementary= await getComplentaryMessages(id)

    return complementary as MessageDAO[]
}

export async function setMessagesAction(id: string, messages: MessageDAO[]): Promise<boolean> {
    const res= setMessages(id, messages)

    revalidatePath("/admin/conversations")

    return res
}


export async function sendTintaMessageAction(conversationId: string, text: string, quotedMsgId?: string, mediaUrl?: string, mimeType?: string) {
    console.log("conversationId: ", conversationId)
    console.log("text: ", text)
    console.log("quotedMsgId: ", quotedMsgId)
    console.log("mediaUrl: ", mediaUrl)
    console.log("mimeType: ", mimeType)

    const currentUser= await getCurrentUser()
    if (!currentUser) return null
  
    const name= currentUser.name || "Tinta"
    console.log("name: ", name)     
    
    const created= await sendTintaMessage(conversationId, name, text, quotedMsgId, mediaUrl, mimeType)
    if (!created) return false

    revalidatePath("/whatsapp")

    return true
}

export async function setMessagesReadAction(id: string) {
    const res= await setMessagesRead(id)

    //revalidatePath(`/whatsapp/${id}`, "layout")

    return res
}

export async function transcribeAudioAction(messageId: string): Promise<string> {
    const message= await getMessageDAO(messageId)
    if (!message)
        throw new Error("Message not found")

    const audioUrl= message.mediaUrl
    if (!audioUrl)
        throw new Error("Audio not found")

    const transcription= await transcribeAudio(audioUrl)
    await setText(messageId, transcription)

    revalidatePath(`/whatsapp/${message.conversationId}`, "layout")
    
    return transcription
}

export async function setSlackHookAction(conversationId: string, slackHook: string): Promise<boolean> {
    return setSlackHook(conversationId, slackHook)
}