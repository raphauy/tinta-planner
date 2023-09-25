import { getClientById, getClientBySlug } from "@/app/(server-side)/services/getClients";
import { prisma } from "../app/(server-side)/db";
import { DataIndicator } from "@/app/config/indicators/(crud)/actions";
import { IndicatorFormValues } from "@/app/config/indicators/(crud)/indicator-form";

export default async function getIndicators(): Promise<DataIndicator[]> {

  const res: DataIndicator[]= []

  const found = await prisma.indicator.findMany({
    orderBy: {
      name: 'asc',
    },
  })

  found.forEach(indicator => {
    res.push({
      id: indicator.id,
      name: indicator.name,
      description: indicator.description,
      type: indicator.type,
      icon: indicator.icon
    })
  })

  return res
}



export async function getIndicator(id: string) {

  const found = await prisma.indicator.findUnique({
    where: {
      id
    },
  })

  return found
}

export async function createIndicator(data: IndicatorFormValues) {
  
  const created= await prisma.indicator.create({
    data
  })

  return created
}

export async function editIndicator(id: string, data: IndicatorFormValues) {
  console.log(data);
  
  const edited= await prisma.indicator.update({
    where: {
      id
    },
    data: {
      ...data,
    }
  })

  return edited
}

export async function deleteIndicator(id: string) {
  
  const deleted= await prisma.indicator.delete({
    where: {
      id
    },
  })

  return deleted
}