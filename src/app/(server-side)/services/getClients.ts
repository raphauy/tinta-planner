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

export async function getClientsOfUser (userId: string) {

  try {
    const clients = await prisma.client.findMany({
      orderBy: {
        id: 'asc',
      },
      where: {
        users: {
          some: {
            id: userId
          }
        }
      },
      include: {
        users: true,
        pilars: true,
      }
    })

    return clients
  } catch (error: any) {
    console.error('error', error)    
    return [];
  }
}

export async function getSelectorData() {
  let result: { slug: string; name: string }[] = []
  
  const currentUser = await getCurrentUser()
  if (!currentUser) {
    console.log('No current user found')    
    return result
  }
  const clients= await getClientsOfUser(currentUser.id)

  const selectorData= clients.map(client => ({ slug: client.slug, name: client.name }))
  
  result = result.concat(selectorData)
  
  return result;
}


export async function getClientOfCurrenUser() {
  const currentUser = await getCurrentUser()
  if (!currentUser) {
    console.log('No current user found')    
    return null
  }

  const clients= currentUser.clients
  if (!clients || clients.length === 0) {
    console.log('No clients found for current user')    
    return null
  }

  const client= clients[0]

  try {
    const clients = await prisma.client.findUnique({
      where: {
        id: client.id,
      },
      include: {
        users: {
          where: {
            role: 'client',
          },
        },
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

export async function getClientIdBySlug(slug: string): Promise<number | null> {

  try {
    const found = await prisma.client.findUnique({
      where: {
        slug: slug
      },
      select: {
        id: true
      }
    });

    return found?.id || null;
  } catch (error: any) {
    return null;
  }

}

export async function getClientById(id: number) {

  const found = await prisma.client.findUnique({
    where: {
      id
    },
  })

  return found
}

