import { WineFormValues } from "@/app/admin/[slug]/wines/add/wineForm";
import { prisma } from "../db";
import getCurrentUser from "./getCurrentUser";
import { getClientBySlug } from "./getClients";

export default async function getClientWines(clientId: number) {

  const found = await prisma.wine.findMany({
    orderBy: {
      year: 'asc',
    },
    where: {
      clientId
    },
  })

  return found;
};


export async function getWine(id: string) {

  const found = await prisma.wine.findUnique({
    where: {
      id
    },
  })

  return found
}

export async function createWine(slug: string, data: WineFormValues) {
  const client= await getClientBySlug(slug)
  if (!client)
    throw new Error()
  
  const created= await prisma.wine.create({
    data: {
      ...data,
      year: parseInt(data.year),
      clientId: client.id  
    }
  })

  return created
}

export async function editWine(id: string, data: WineFormValues) {
  console.log(data);
  
  const created= await prisma.wine.update({
    where: {
      id
    },
    data: {
      ...data,
      year: parseInt(data.year),
    }
  })

  return created
}

export async function deleteWine(id: string) {
  
  const deleted= await prisma.wine.delete({
    where: {
      id
    },
  })

  return deleted
}