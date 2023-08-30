import { DataService } from "@/app/agency/[slug]/crm/services/(crud)/actions";
import { prisma } from "../app/(server-side)/db";
import { getClientById, getClientBySlug } from "../app/(server-side)/services/getClients";
import { ServiceFormValues } from "@/app/agency/[slug]/crm/services/(crud)/main-form";

export default async function getClientServices(clientId: number): Promise<DataService[]> {

  const res: DataService[]= []

  const client= await getClientById(clientId)
  if (!client)
    throw new Error()  

  const found = await prisma.service.findMany({
    orderBy: {
      name: 'asc',
    },
    where: {
      clientId
    },
  })

  found.forEach(service => {
    res.push({
      id: service.id,
      name: service.name,
      description: service.description || "",
      emoji: service.emoji || "",
      price: service.price || 0,
      clientId: service.clientId,
      clientSlug: client.slug
    })
  })

  return res
}



export async function getService(id: string) {

  const found = await prisma.service.findUnique({
    where: {
      id
    },
    include: {
      client: true
    }
  })

  return found
}

export async function createService(slug: string, data: ServiceFormValues) {
  const client= await getClientBySlug(slug)
  if (!client)
    throw new Error()
  
  const created= await prisma.service.create({
    data: {
      ...data,
      price: parseFloat(data.price),
      clientId: client.id,
    }
  })

  return created
}

export async function editService(id: string, data: ServiceFormValues) {
  console.log(data);
  
  const edited= await prisma.service.update({
    where: {
      id
    },
    data: {
      ...data,
      price: parseFloat(data.price),
    }
  })

  return edited
}

export async function deleteService(id: string) {
  
  const deleted= await prisma.service.delete({
    where: {
      id
    },
  })

  return deleted
}