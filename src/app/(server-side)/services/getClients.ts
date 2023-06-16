import { FormValues } from "@/app/admin/clients/add/clientForm";
import { prisma } from "../db";
import getCurrentUser from "./getCurrentUser";
import getSession from "./getSession";
import slugify from "slugify";

export default async function getClients (agencyId: number) {

  try {
    const clients = await prisma.client.findMany({
      orderBy: {
        id: 'asc',
      },
      where: {
        agencyId: agencyId
      },
      include: {
        users: true,
        pilars: true,
      }
    });

    return clients;
  } catch (error: any) {
    return [];
  }
};

export async function getClientOfCurrenUser() {
  const currentUser = await getCurrentUser();

  if (!currentUser?.clientId) {
    return null;
  }   

  try {
    const clients = await prisma.client.findUnique({
      where: {
        id: currentUser?.clientId,
      },
      include: {
        users: true,
        pilars: true,
        posts: true,
      }
    });

    return clients;
  } catch (error: any) {
    return null;
  }
};

export async function getClient(id: number) {

  const found = await prisma.client.findUnique({
    where: {
      id
    },
    include: {
      users: true,
      pilars: true,
      posts: true,
    }
})

  return found
}

export async function getClientBySlug(slug: string) {

  try {
    const clients = await prisma.client.findUnique({
      where: {
        slug: slug
      },
      include: {
        users: true,
        pilars: true,
        posts: true,
      }
    });

    return clients;
  } catch (error: any) {
    return null;
  }
};


export async function createClient(data: FormValues) {

  const user= await getCurrentUser()
  if (!user)
    throw new Error("User not found")
  const agencyId= user.agencyId
  if (!agencyId)
    throw new Error("User do not have Agency")

  const slug= slugify(data.name, {lower: true})

  const created= await prisma.client.create({    
    data: {
      name: data.name,
      slug,
      description: data.description,
      handle_insta: data.handle_insta,
      image_insta: data.image_insta,
      agencyId
    }
  })

  return created
}


export async function editClient(id: number, data: FormValues) {

  const user= await getCurrentUser()
  if (!user)
    throw new Error("User not found")
  const agencyId= user.agencyId
  if (!agencyId)
    throw new Error("User do not have Agency")

  const slug= slugify(data.name, {lower: true})
  data.slug= slug

  const updated= await prisma.client.update({
    where: {
      id
    },
    data
  })

  return updated
}

export async function deleteClient(id: number) {
  
  const deleted= await prisma.client.delete({
    where: {
      id
    },
  })

  return deleted
}
