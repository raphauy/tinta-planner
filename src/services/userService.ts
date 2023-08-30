import { getClientById, getClientBySlug } from "@/app/(server-side)/services/getClients";
import { prisma } from "../app/(server-side)/db";
import { DataUser } from "@/app/agency/[slug]/social/users/(crud)/actions";
import { UserFormValues } from "@/app/agency/[slug]/social/users/(crud)/usersForm";

export default async function getClientUsers(clientId: number): Promise<DataUser[]> {

  const res: DataUser[]= []

  const client= await getClientById(clientId)
  if (!client)
    throw new Error()  

  const found = await prisma.user.findMany({
    orderBy: {
      name: 'asc',
    },
    where: {
      clientId
    },
  })

  found.forEach(user => {
    res.push({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      emailVerified: user.emailVerified,
      clientId: user.clientId,
      clientSlug: client.slug,
    })
  })

  return res
}



export async function getUser(id: string) {

  const found = await prisma.user.findUnique({
    where: {
      id
    },
    include: {
      client: true
    }
  })

  return found
}

export async function createUser(slug: string, data: UserFormValues) {
  const client= await getClientBySlug(slug)
  if (!client)
    throw new Error()
  
  const created= await prisma.user.create({
    data: {
      ...data,
      clientId: client.id,
    }
  })

  return created
}

export async function editUser(id: string, data: UserFormValues) {
  console.log(data);
  
  const edited= await prisma.user.update({
    where: {
      id
    },
    data: {
      ...data,
    }
  })

  return edited
}

export async function deleteUser(id: string) {
  
  const deleted= await prisma.user.delete({
    where: {
      id
    },
  })

  return deleted
}