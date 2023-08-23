import { WineFormValues } from "@/app/admin/[slug]/wines/add/wineForm";
import { prisma } from "../db";
import { getClientById, getClientBySlug } from "./getClients";
import { DataWine } from "@/app/types/Wine";

export default async function getClientWines(clientId: number): Promise<DataWine[]> {

  const res: DataWine[]= []

  const client= await getClientById(clientId)
  if (!client)
    throw new Error()  

  const found = await prisma.wine.findMany({
    orderBy: {
      vintage: 'asc',
    },
    where: {
      clientId
    },
  })

  found.forEach(wine => {
    res.push({      
      id: wine.id,
      grapes: wine.grapes,
      notes: wine.notes,
      region: wine.region,
      style: wine.style,
      vintage: wine.vintage,
      winemaker: wine.winemaker,
      winery: wine.winery,
      wine: wine.wine,
      clientSlug: client.slug,
      image: wine.image,
      price: wine.price,
      alcohol: wine.alcohol,
    })
  })

  return res
}



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