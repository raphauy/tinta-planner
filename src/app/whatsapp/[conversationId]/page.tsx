import { getFullConversationDAO } from "@/services/conversation-services"
import { Chat } from "./chat"
import SendText from "./send-text"
import Image from "next/image"
import { User } from "lucide-react"

interface Props {
    params: {
      conversationId: string
    }
  }
export default async function ConversationPage({ params }: Props) {

    const conversationId= params.conversationId

    const conversation= await getFullConversationDAO(conversationId)
    if (!conversation)
        return <div>Conversation not found</div>

    const image= conversation.pictureUrl ? conversation.pictureUrl : "https://utfs.io/f/ce7e6954-94ef-4c36-a4b5-5a742b633df9-h5faa7.png"

    const participantsStringArray= conversation.messages.map(m => m.name)
    const participants= new Set(participantsStringArray)
    const commaSeparatedParticipants= Array.from(participants).join(", ")

    return (
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
    )
}
