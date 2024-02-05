import { prisma } from "@/app/(server-side)/db"
import { ContactImportData } from "@/app/agency/[slug]/newsletter/contacts/contact-actions"
import { isEmailValid } from "@/lib/utils"
import * as z from "zod"

export type ContactDAO = {
	id: string
	name: string | undefined
	email: string
	createdAt: Date
	clientId: number
}

export const contactSchema = z.object({
	name: z.string().optional(),
	email: z.string({required_error: "email is required."}),
	clientId: z.number({required_error: "clientId is required."}),
})

export type ContactFormValues = z.infer<typeof contactSchema>


export async function getContactsDAO() {
  const found = await prisma.contact.findMany({
    orderBy: {
      id: 'asc'
    },
  })
  return found as ContactDAO[]
}

export async function getContactsDAOByClientId(clientId: number) {
  const found = await prisma.contact.findMany({
    orderBy: {
      id: 'asc'
    },
    where: {
      clientId
    }
  })
  return found as ContactDAO[]
}

export async function getContactDAO(id: string) {
  const found = await prisma.contact.findUnique({
    where: {
      id
    },
  })
  return found as ContactDAO
}

export async function getContactDAOByEmailAndClientId(email: string, clientId: number) {
  const found = await prisma.contact.findFirst({
    where: {
      email,
      clientId
    }
  })
  return found as ContactDAO
}
    
export async function createContact(data: ContactFormValues) {
  // TODO: implement createContact
  const created = await prisma.contact.create({
    data
  })
  return created
}

export async function updateContact(id: string, data: ContactFormValues) {
  const updated = await prisma.contact.update({
    where: {
      id
    },
    data
  })
  return updated
}

export async function deleteContact(id: string) {
  const deleted = await prisma.contact.delete({
    where: {
      id
    },
  })
  return deleted
}


export async function getFullContactsDAO() {
  const found = await prisma.contact.findMany({
    orderBy: {
      id: 'asc'
    },
    include: {
			client: true,
		}
  })
  return found as ContactDAO[]
}
  
export async function getFullContactDAO(id: string) {
  const found = await prisma.contact.findUnique({
    where: {
      id
    },
    include: {
			client: true,
		}
  })
  return found as ContactDAO
}

export async function importContacts(clientId: number, contacts: ContactImportData[]): Promise<string> {
  // log the contacts
  let notValidCount = contacts.filter(contact => !isEmailValid(contact.email)).length
  contacts= contacts.filter(contact => isEmailValid(contact.email))
  let createdCount= 0
  try {
    for (let contact of contacts) {
      const found= await getContactDAOByEmailAndClientId(contact.email, clientId)
      if (!found) {
        await createContact({
          email: contact.email,
          name: contact.name,
          clientId
        })
        createdCount++
      } else {
        console.log(`Contact with email ${contact.email} already exists`)
        notValidCount++
      }
    }  
  } catch (error) {
    console.log(error)
    return "Error al importar los contactos"    
  }
  let res= `Se crearon ${createdCount} contactos`
  if (notValidCount > 0) {
    res+= ` y se omitieron ${notValidCount} contactos no válidos o repetidos`
  }

  return res
}