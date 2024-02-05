import { prisma } from "@/app/(server-side)/db"
import * as z from "zod"

export type NewsletterDAO = {
	id: string
	name: string
	contentHtml: string | undefined
  contentJson: string | undefined
	createdAt: Date
	clientId: number
  clientSlug: string
	enviosCount: number
}

export const newsletterSchema = z.object({
	name: z.string({required_error: "name is required."}),
	clientId: z.number({required_error: "clientId is required."}),
})

export type NewsletterFormValues = z.infer<typeof newsletterSchema>


export async function getNewslettersDAO() {
  const found = await prisma.newsletter.findMany({
    orderBy: {
      id: 'asc'
    },
    include: {
      envios: true,
      client: true
    }
  })
  const res= found.map(c => {
    return {
      ...c,
      enviosCount: c.envios.length,
      clientSlug: c.client.slug
    }
  })

  return res as NewsletterDAO[]
}

export async function getNewslettersDAOByClientId(clientId: number) {
  const found = await prisma.newsletter.findMany({
    where: {
      clientId
    },
    orderBy: {
      id: 'asc'
    },
    include: {
      envios: true,
      client: true
    }
  })
  const res= found.map(c => {
    return {
      ...c,
      enviosCount: c.envios.length,
      clientSlug: c.client.slug
    }
  })

  return res as NewsletterDAO[]
}

export async function getNewsletterDAO(id: string) {
  const found = await prisma.newsletter.findUnique({
    where: {
      id
    },
    include: {
      envios: true,
      client: true
    }
  })

  if (!found) {
    return null
  }

  const res= {
    ...found,
    enviosCount: found.envios.length,
    clientSlug: found.client.slug
  }

  return res as NewsletterDAO  
}
    
export async function createNewsletter(data: NewsletterFormValues) {
  const created = await prisma.newsletter.create({
    data
  })
  return created
}

export async function updateNewsletter(id: string, data: NewsletterFormValues) {
  const updated = await prisma.newsletter.update({
    where: {
      id
    },
    data
  })
  return updated
}

export async function deleteNewsletter(id: string) {
  const deleted = await prisma.newsletter.delete({
    where: {
      id
    },
  })
  return deleted
}
    

export async function updateContent(id: string, contentHtml: string, contentJson: string) {
  const updated = await prisma.newsletter.update({
    where: {
      id
    },
    data: {
      contentHtml,
      contentJson
    }
  })
  return updated
}