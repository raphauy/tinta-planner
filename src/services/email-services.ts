import * as z from "zod"
import { EnvioDAO } from "./envio-services"
import { prisma } from "@/app/(server-side)/db"

export type EmailDAO = {
	id: string
	status: string
	createdAt: Date
	sentAt: Date | undefined
	envio: EnvioDAO
	envioId: string
	emailTo: string
	emailSubject: string
  clientId: number
}

export const emailSchema = z.object({
	status: z.string({required_error: "status is required."}),
	envioId: z.string({required_error: "envioId is required."}),
	emailTo: z.string({required_error: "emailTo is required."}),
	emailSubject: z.string({required_error: "emailSubject is required."}),
  clientId: z.number({required_error: "clientId is required."}),
})

export type EmailFormValues = z.infer<typeof emailSchema>


export async function getEmailsDAO() {
  const found = await prisma.email.findMany({
    orderBy: {
      id: 'asc'
    },
  })
  return found as EmailDAO[]
}

export async function getEmailsDAOByClientId(clientId: number) {
  const found = await prisma.email.findMany({
    orderBy: {
      id: 'asc'
    },
    where: {
      clientId
    }
  })
  return found as EmailDAO[]
}

export async function getEmailsDAOByEnvioId(envioId: string) {
  const found = await prisma.email.findMany({
    orderBy: {
      id: 'asc'
    },
    where: {
      envioId
    }
  })
  return found as EmailDAO[]
}

export async function getPendingEmailsDAOByEnvioIdAndTake(envioId: string, take: number) {
  const found = await prisma.email.findMany({
    orderBy: {
      id: 'asc'
    },
    where: {
      envioId,
      status: 'pending'
    },
    take
  })
  return found as EmailDAO[]
}

export async function getEmailDAO(id: string) {
  const found = await prisma.email.findUnique({
    where: {
      id
    },
  })
  return found as EmailDAO
}
    
export async function createEmail(data: EmailFormValues) {
  const created = await prisma.email.create({
    data
  })
  return created
}

export async function updateEmail(id: string, data: EmailFormValues) {
  const updated = await prisma.email.update({
    where: {
      id
    },
    data
  })
  return updated
}

export async function setEmailStatus(id: string, status: string, updateSentAt?: boolean) {
  const updated = await prisma.email.update({
    where: {
      id
    },
    data: {
      status,
      sentAt: updateSentAt ? new Date() : undefined
    }
  })
  return updated
}

export async function deleteEmail(id: string) {
  const deleted = await prisma.email.delete({
    where: {
      id
    },
  })
  return deleted
}


export async function getFullEmailsDAO() {
  const found = await prisma.email.findMany({
    orderBy: {
      id: 'asc'
    },
    include: {
			envio: true,
		}
  })
  return found as EmailDAO[]
}
  
export async function getFullEmailDAO(id: string) {
  const found = await prisma.email.findUnique({
    where: {
      id
    },
    include: {
			envio: true,
		}
  })
  return found as EmailDAO
}
    