import { DataWset } from "@/app/agency/[slug]/crm/wsets/(crud)/actions";
import { prisma } from "../app/(server-side)/db";
import { get } from "http";
import { getService } from "./serviceService";

export default async function getAllWsets(): Promise<DataWset[]> {

  const res: DataWset[]= []


  const found = await prisma.wset.findMany({
    orderBy: {
      institute: 'asc',
    },
  })

  found.forEach(wset => {
    const data= transform(wset)
    res.push(data)
  })

  return res
}


export async function getWset(id: string) {

  const found = await prisma.wset.findUnique({
    where: {
      id
    },
  })

  return transform(found)
}


export async function deleteWset(id: string) {
  
  const deleted= await prisma.wset.delete({
    where: {
      id
    },
  })

  return deleted
}

export async function importWset(id: string) {

  // create a Lead with wset data
  const wset= await getWset(id)
  console.log("wset", wset)
  const service= await getService("cllz3v4fr0007notuh4a99va5")
  if (!service) throw new Error("service not found")

  // create a Lead with wset data
  const lead= await prisma.lead.create({
    data: {
      company: wset.institute,
      contactEmail: wset.email,
      contactPhone: wset.phone,
      website: wset.website,
      serviceId: service.id,
      clientId: service.clientId,
    },
  })
  // create note and link to lead
  const note= await prisma.note.create({
    data: {
      title: "Imported from Wset data", 
      text: wset.institute + " is located at: <br /><br /> <b>" + wset.location + "</b> <br /><br />",
      leadId: lead.id,
    },
  })
  console.log("importWset", id)

  // update wset as imported
  await prisma.wset.update({
    where: {
      id
    },
    data: {
      imported: true,
    },
  })
  
}

function transform(wset: any): DataWset {
  return {
    id: wset.id,
    institute: wset.institute,
    location: wset.location || "",
    email: wset.email || "",
    phone: wset.phone || "",
    website: wset.website || "",
    imported: wset.imported,
  }
}
