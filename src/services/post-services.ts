import { prisma } from "@/app/(server-side)/db"
import * as z from "zod"

export type PostDAO = {
	id: string
	title: string
	image: string | null
	format: string | null
	hashtags: string | null
	copy: string | null
	link: string | null
	date: Date | null
	pilarName: string | null
  pilarColor: string | null
  clientName: string | null
  clientSlug: string | null
	status: string
	comments: string | null
}

export const postSchema = z.object({
	title: z.string({required_error: "title is required."}),
	image: z.string().optional(),
	format: z.string().optional(),
	hashtags: z.string().optional(),
	copy: z.string().optional(),
	link: z.string().optional(),
	date: z.date().optional(),
	status: z.string({required_error: "status is required."}),
	comments: z.string().optional(),
})

export type PostFormValues = z.infer<typeof postSchema>


export async function getPostsDAO(clientId: number) {
  const found = await prisma.post.findMany({
    where: {
      clientId
    },
    orderBy: {
      date: 'desc'
    },
    include: {
      pilar: true,
      client: true,
    }
  })
  const res: PostDAO[] = found.map((post) => {
    return {
      ...post,
      pilarName: post.pilar.name,
      pilarColor: post.pilar.color,
      clientName: post.client.name,  
      clientSlug: post.client.slug,    
    }
  })
  return res
}

export async function getPostDAO(id: string) {
  const found = await prisma.post.findUnique({
    where: {
      id
    },
    include: {
      pilar: true,
      client: true,
    }
  })

  if (!found) {
    return null
  }

  const res: PostDAO = {
    ...found,
    pilarName: found.pilar.name,
    pilarColor: found.pilar.color,
    clientName: found.client.name,
    clientSlug: found.client.slug,
  }

  return res
}
    

