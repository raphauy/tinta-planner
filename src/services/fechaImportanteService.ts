import { getClientById } from "@/app/(server-side)/services/getClients";
import { DataFechaImportante } from "@/app/config/dates/(crud)/actions";
import { FechaImportanteFormValues } from "@/app/config/dates/(crud)/fecha-importante-form";
import { FechaImportante } from "@prisma/client";
import { prisma } from "../app/(server-side)/db";

export default async function getClientFechaImportantes(clientId: number): Promise<FechaImportante[]> {
 
    const fechaImportantes= await prisma.fechaImportante.findMany({
      where: {
        clientId
      },
      orderBy: {
        date: 'desc'
      }
    })

    return fechaImportantes
  
}


export async function getClientAndGlobalFechaImportantes(clientId: number): Promise<DataFechaImportante[]> {

  const client= await getClientById(clientId)

  // fechaImportante can be global or can be of a client, field clientId can be null (global) or can have a clientId (client)
  // this function returns all global fechaImportantes and all client fechaImportantes
  const fechaImportantes= await prisma.fechaImportante.findMany({
    where: {
      OR: [
        {
          clientId: null
        },
        {
          clientId
        }
      ]
    }
  })

  const res: DataFechaImportante[]= getData(fechaImportantes)

  return res
}

export async function getGlobalFechasImportantes() {
  
  
    const fechaImportantes= await prisma.fechaImportante.findMany({
      where: {
        clientId: null
      },
      orderBy: {
        date: 'desc'
      }
    })

    const res: DataFechaImportante[]= getData(fechaImportantes)
  
    return res
}

export function getData(fechasImportantes: FechaImportante[]) {

  const res: DataFechaImportante[]= []

  for (const fechaImportante of fechasImportantes) {
      const data: DataFechaImportante= {
      id: fechaImportante.id,
      titulo: fechaImportante.title,
      fecha: fechaImportante.date,
      clientId: fechaImportante.clientId ?? null,
    }

    res.push(data)
  }

  return res
}

export async function getFechaImportante(id: string) {

  const found = await prisma.fechaImportante.findUnique({
    where: {
      id
    },
    include: {
      client: true
    }
  })

  return found
}

export async function createFechaImportante(data: FechaImportanteFormValues) {
  console.log(data);
  
  const created= await prisma.fechaImportante.create({
    data: {
      ...data,
    }
  })

  return created
}

export async function editFechaImportante(id: string, data: FechaImportanteFormValues) {
  console.log(data);
  
  const edited= await prisma.fechaImportante.update({
    where: {
      id
    },
    data: {
      ...data,
    }
  })

  return edited
}

export async function deleteFechaImportante(id: string) {
  
  const deleted= await prisma.fechaImportante.delete({
    where: {
      id
    },
  })

  return deleted
}