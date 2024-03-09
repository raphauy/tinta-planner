import * as z from "zod"
import { prisma } from "@/app/(server-side)/db"
import { ConversationDAO } from "./conversation-services"

export type MessageDAO = {
	id: string
	createdAt: Date
	updatedAt: Date
  wapId: string
  name: string
  pictureUrl?: string
	role: string
	content: string
  read: boolean
  reactions?: string
  quoted?: string
  mediaUrl?: string
  mimeType?: string
	conversationId: string
	conversation: ConversationDAO
}

export const messageSchema = z.object({
  wapId: z.string({required_error: "wapId is required."}),
  name: z.string({required_error: "name is required."}),
	role: z.string({required_error: "role is required."}),
	content: z.string({required_error: "content is required."}),
	conversationId: z.string({required_error: "conversationId is required."}),
})

export type MessageFormValues = z.infer<typeof messageSchema>


export async function getMessagesDAO() {
  const found = await prisma.message.findMany({
    orderBy: {
      id: 'asc'
    },
  })
  return found as MessageDAO[]
}

export async function getConversationMessagesDAO(conversationId: string, take: number) {
  const found = await prisma.message.findMany({
    where: {
      conversationId
    },
    orderBy: {
      createdAt: 'desc'
    },
    take
  })
  return found.reverse() as MessageDAO[]
}

export async function getUnreadMessagesDAO(conversationId: string) {
  const found = await prisma.message.findMany({
    where: {
      conversationId,
      read: false
    },
    orderBy: {
      updatedAt: 'asc'
    }
  })
  return found as MessageDAO[]
}

export async function getUnreadMessagesCount() {
  const found = await prisma.message.count({
    where: {
      read: false
    }
  })
  return found
}


export async function getMessageDAO(id: string) {
  const found = await prisma.message.findUnique({
    where: {
      id
    },
  })
  return found as MessageDAO
}

export async function getMessageByWapIdDAO(wapId: string) {
  const found = await prisma.message.findFirst({
    where: {
      wapId
    },
  })
  return found as MessageDAO

}

export async function createMessage(data: MessageFormValues) {
  const created = await prisma.message.create({
    data
  })
  return created
}

export async function updateMessage(id: string, data: MessageFormValues) {
  const updated = await prisma.message.update({
    where: {
      id
    },
    data
  })
  return updated
}

export async function deleteMessage(id: string) {
  const deleted = await prisma.message.delete({
    where: {
      id
    },
  })
  return deleted
}


export async function getFullMessagesDAO() {
  const found = await prisma.message.findMany({
    orderBy: {
      id: 'asc'
    },
    include: {
			conversation: true,
		}
  })
  return found as MessageDAO[]
}
  
export async function getFullMessageDAO(id: string) {
  const found = await prisma.message.findUnique({
    where: {
      id
    },
    include: {
			conversation: true,
		}
  })
  return found as MessageDAO
}
    