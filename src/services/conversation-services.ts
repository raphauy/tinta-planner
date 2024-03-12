import * as z from "zod"
import { MessageDAO, createMessage, getMessageByWapIdDAO } from "./message-services"
import { getMessagesDAO } from "./message-services"
import { prisma } from "@/app/(server-side)/db"
import { is } from "date-fns/locale"
import getCurrentUser from "@/app/(server-side)/services/getCurrentUser"
import { sendWapMessage } from "./whatsapp-service"
import { revalidatePath } from "next/cache"

export type ConversationDAO = {
	id: string
	createdAt: Date
	updatedAt: Date
	phone: string
  isGroup: boolean
  name?: string
  pictureUrl?: string
	messages: MessageDAO[]
  unreadMessages: number
	agencyId: number
}

export const conversationSchema = z.object({
	phone: z.string({required_error: "phone is required."}),
})

export type ConversationFormValues = z.infer<typeof conversationSchema>


export async function getConversationsDAO() {
  const found = await prisma.conversation.findMany({
    orderBy: {
      updatedAt: 'desc'
    },
  })
  const unreadMessages= await prisma.message.findMany({
    where: {
      read: false,
    }
  })
  const res= found.map(c => {
    const unread= unreadMessages.filter(m => m.conversationId === c.id)
    return {
      ...c,
      unreadMessages: unread.length
    }
  })

  return res as ConversationDAO[]
}

export async function getConversationDAO(id: string) {
  const found = await prisma.conversation.findUnique({
    where: {
      id
    },    
  })
  const unreadMessages= await prisma.message.findMany({
    where: {
      read: false,
      conversationId: id
    }
  })

  const res= {
    ...found,
    messages: [],
    unreadMessages: unreadMessages.length
  }

  return res as ConversationDAO
}
    
export async function createConversation(data: ConversationFormValues) {
  // TODO: implement createConversation
  const created = await prisma.conversation.create({
    data
  })
  return created
}

export async function updateConversation(id: string, data: ConversationFormValues) {
  const updated = await prisma.conversation.update({
    where: {
      id
    },
    data
  })
  return updated
}

export async function deleteConversation(id: string) {
  const deleted = await prisma.conversation.delete({
    where: {
      id
    },
  })
  return deleted
}
    
export async function getComplentaryMessages(id: string) {
  const found = await prisma.conversation.findUnique({
    where: {
      id
    },
    include: {
      messages: true,
    }
  })
  const all= await getMessagesDAO()
  const res= all.filter(aux => {
    return !found?.messages.find(c => c.id === aux.id)
  })
  
  return res
}

export async function setMessages(id: string, messages: MessageDAO[]) {
  const oldMessages= await prisma.conversation.findUnique({
    where: {
      id
    },
    include: {
      messages: true,
    }
  })
  .then(res => res?.messages)

  await prisma.conversation.update({
    where: {
      id
    },
    data: {
      messages: {
        disconnect: oldMessages
      }
    }
  })

  const updated= await prisma.conversation.update({
    where: {
      id
    },
    data: {
      messages: {
        connect: messages.map(c => ({id: c.id}))
      }
    }
  })

  if (!updated) {
    return false
  }

  return true
}



export async function getFullConversationsDAO() {
  const found = await prisma.conversation.findMany({
    orderBy: {
      id: 'asc'
    },
    include: {
			messages: true,
		}
  })
  return found as ConversationDAO[]
}
  
export async function getFullConversationDAO(id: string) {
  const found = await prisma.conversation.findUnique({
    where: {
      id
    },
    include: {
			messages: {
        orderBy: {
          createdAt: 'desc'        
        },
        take: 50
      }
		}
  })
  // reverse the order of messages
  if (found) {
    found.messages= found.messages.reverse()
  }

  const unreadMessages= found?.messages.filter(m => !m.read).length
  const res= {
    ...found,
    unreadMessages
  }
  return res as ConversationDAO
}
    

export async function messageArrived(wapId: string, phone: string, name: string, text: string, role: string, pictureUrl: string, isGroup: boolean, groupName?: string, mediaUrl?: string, mimeType?: string, quoted?: string, fromMe?: boolean, timestamp?: number) {
  if (text && text.startsWith("*_")) {
    console.log(`discarding message from ${name} because it is a tinta message`)    
    return true
  }

  let timestampDate= new Date()
  if (timestamp) {
    timestampDate= new Date(timestamp * 1000)
  }

  const found= await getConversation(phone)
  if (found) {
    const dataMessage= {
      wapId,
      name,
      pictureUrl,
      role,
      content: text,
      quoted,
      mediaUrl,
      mimeType,
      conversationId: found.id,
      createdAt: timestampDate
    }
    await createMessage(dataMessage)
    const oldName= found.name
    const isNumber= !isNaN(Number(oldName))
    const newName= isGroup ? groupName : isNumber ? name : oldName
    await prisma.conversation.update({
      where: {
        id: found.id
      },
      data: {
        updatedAt: new Date(),
        name: newName
      }
    })
    return found.id
  } else {
    const newName= isGroup ? groupName : fromMe ? phone.split("@")[0] : name
    const dataConversation= {
      phone,
      isGroup,
      name: newName,
      pictureUrl,
      createdAt: timestampDate,
    }
    const created= await createConversation(dataConversation)
    const dataMessage= {
      wapId,
      name,
      pictureUrl,
      role,
      content: text,
      quoted,
      mediaUrl,
      mimeType,
      conversationId: created.id,
      createdAt: timestampDate
    }
    await createMessage(dataMessage)
    return created.id
  }
}
export async function sendTintaMessage(conversationId: string, name: string, text: string, quotedMsgId?: string) {
  const conversation= await getConversationDAO(conversationId)
  if (!conversation) return null

  const textWithName= "*_" + name + "_*:\n" + text

  const wapId= await sendWapMessage(conversation.phone, textWithName, quotedMsgId)

  const quotedText= quotedMsgId && (await getMessageByWapIdDAO(quotedMsgId))?.content
  console.log("quotedText:")
  console.log(quotedText)
  
  const quoted= quotedMsgId ? quotedMsgId  + "_@_" + quotedText : undefined
  console.log("quoted:")
  console.log(quoted)
  

  const dataMessage= {
    wapId,
    name,
    role: "tinta",
    content: text,
    quoted,
    read: false,
    conversationId,
  }

  const created= await createMessage(dataMessage)
  // update conversation updatedAt
  await prisma.conversation.update({
    where: {
      id: conversationId
    },
    data: {
      updatedAt: new Date()
    }
  })


  return created
}

export async function getConversation(phone: string) {
    
  const found = await prisma.conversation.findFirst({
    where: {
      phone,
    },
    orderBy: {
      createdAt: 'desc',
    },
  })

  return found;
}

export async function setMessagesRead(id: string) {
  console.log("server setMessagesRead: ", id)
  
  const conversation= await getConversationDAO(id)
  if (!conversation) return false

  const updated= await prisma.message.updateMany({
    where: {
      conversationId: id
    },
    data: {
      read: true
    }
  })

  if (!updated) return false

  return true
}

export async function addReaction(reactionId: string, name: string, text: string){
  const message= await prisma.message.findFirst({
    where: {
      wapId: reactionId
    }
  })
  if (!message) return false

  const newReactions= message.reactions ? message.reactions + "\n" + name + ": " + text : name + ": " + text

  const updated= await prisma.message.update({
    where: {
      id: message.id
    },
    data: {
      reactions: newReactions
    }
  })

  if (!updated) return null

  return updated.conversationId
}