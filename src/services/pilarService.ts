import { getClientById, getClientBySlug } from "@/app/(server-side)/services/getClients";
import { prisma } from "../app/(server-side)/db";
import { DataPilar } from "@/app/agency/[slug]/social/pilars/(crud)/actions";
import { PilarFormValues } from "@/app/agency/[slug]/social/pilars/(crud)/pilarForm";

export default async function getClientPilars(clientId: number): Promise<DataPilar[]> {

  const res: DataPilar[]= []

  const client= await getClientById(clientId)
  if (!client)
    throw new Error()  

  const found = await prisma.pilar.findMany({
    orderBy: {
      name: 'asc',
    },
    where: {
      clientId
    },
  })

  found.forEach(pilar => {
    res.push({
      id: pilar.id,
      name: pilar.name,
      description: pilar.description,
      color: pilar.color,
      clientId: pilar.clientId,
      clientSlug: client.slug,
    })
  })

  return res
}



export async function getPilar(id: number) {

  const found = await prisma.pilar.findUnique({
    where: {
      id
    },
    include: {
      client: true
    }
  })

  return found
}

export async function createPilar(slug: string, data: PilarFormValues) {
  const client= await getClientBySlug(slug)
  if (!client)
    throw new Error()
  
  const created= await prisma.pilar.create({
    data: {
      ...data,
      clientId: client.id,
    }
  })

  return created
}

export async function editPilar(id: number, data: PilarFormValues) {
  console.log(data);
  
  const edited= await prisma.pilar.update({
    where: {
      id
    },
    data: {
      ...data,
    }
  })

  return edited
}

export async function deletePilar(id: number) {
  
  const deleted= await prisma.pilar.delete({
    where: {
      id
    },
  })

  return deleted
}