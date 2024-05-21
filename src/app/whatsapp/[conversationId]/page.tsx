import { getConversationDAO, getConversationsDAO } from "@/services/conversation-services"
import Image from "next/image"
import { Chat } from "./chat"
import { DataTable } from "../conversations/conversation-table"
import { columns } from "../conversations/conversation-columns"
import { revalidatePath } from "next/cache"
import { getConversationMessagesDAO } from "@/services/message-services"
import getCurrentUser from "@/app/(server-side)/services/getCurrentUser"

// Opt out of caching for all data requests in the route segment
export const maxDuration = 59
export const dynamic = 'force-dynamic'

interface Props {
    params: {
      conversationId: string
    }
  }
export default async function ConversationPage({ params }: Props) {

    const conversationId= params.conversationId

    // const conversation= await getFullConversationDAO(conversationId)
    const conversation= await getConversationDAO(conversationId)
    if (!conversation)
        return <div>Conversation not found</div>

    const image= conversation.pictureUrl ? conversation.pictureUrl : "https://utfs.io/f/ce7e6954-94ef-4c36-a4b5-5a742b633df9-h5faa7.png"

    const messages= await getConversationMessagesDAO(conversationId, 100)
    const participantsStringArray= messages.map(m => m.name)
    const participants= new Set(participantsStringArray)
    const commaSeparatedParticipants= Array.from(participants).join(", ")

    const data= await getConversationsDAO()

    const currentUser= await getCurrentUser()
    const isAllowed= currentUser?.role === "admin" || currentUser?.role === "agency-admin"

    return (
        <div className="flex w-full">
            <div className="hidden max-w-lg p-3 py-4 mx-auto border rounded-md md:block text-muted-foreground dark:text-white">
                <DataTable columns={columns} data={data} subject="Conversation" pageSize={6} />
            </div>
            <div className="flex flex-col justify-between w-full bg-slate-100">
                <div className="flex items-center p-4 space-x-2">
                    <Image src={image} width={40} height={40} className="rounded-full" alt="Profile picture" />
                    
                    <div>
                        <p className="text-sm font-semibold">{conversation.name}</p>
                        <p className="text-xs text-gray-500">{commaSeparatedParticipants}</p>
                    </div>
                </div>

                <div className="flex-1">
                    <Chat conversation={conversation} />
                </div>
                

            </div>

        </div>
    )
}
