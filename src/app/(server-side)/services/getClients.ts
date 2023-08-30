import { prisma } from "../db";
import getCurrentUser from "./getCurrentUser";

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
}

export async function getSelectorData() {
  let result: { slug: string; name: string }[] = []

  const clients= await getClients(1)

  const selectorData= clients.map(client => ({ slug: client.slug, name: client.name }))
  
  result = result.concat(selectorData)
  
  return result;
}


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
        services: true,
        leads: true,
      }
    });

    return clients;
  } catch (error: any) {
    return null;
  }
};

export async function getClientById(id: number) {

  const found = await prisma.client.findUnique({
    where: {
      id
    },
  })

  return found
}

