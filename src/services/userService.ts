import { getClientById, getClientBySlug } from "@/app/(server-side)/services/getClients";
import { prisma } from "../app/(server-side)/db";
import { DataUser } from "@/app/agency/[slug]/social/users/(crud)/actions";
import { UserFormValues } from "@/app/agency/[slug]/social/users/(crud)/usersForm";
import { DataClient } from "@/app/config/users/(crud)/actions";
import getCurrentUser from "@/app/(server-side)/services/getCurrentUser";

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
      clients: {
        some: {
          id: clientId,
        },
      },
      role: "client"
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

export async function getAllUsers() {
  
    const found = await prisma.user.findMany({
      orderBy: {
        name: 'asc',
      },
      include: {
        clients: true
      }
    })
  
    return found
}

export async function getAgencyUsers(agencyId: number){
  
    const found = await prisma.user.findMany({
      orderBy: {
        name: 'asc',
      },
      where: {
        agencyId
      },
      include: {
        clients: true
      }
    })
  
    return found
  }


export async function getUser(id: string) {

  const found = await prisma.user.findUnique({
    where: {
      id
    },
    include: {
      clients: true
    }
  })

  return found
}

export async function createClientUser(slug: string, data: UserFormValues) {  
  const currentUser= await getCurrentUser()
  if (!currentUser?.agencyId)
    throw new Error()

  const agencyId= currentUser.agencyId
  
  const client= await getClientBySlug(slug)
  if (!client)
    throw new Error()

  const created= await prisma.user.create({
    data: {
      ...data,
      agencyId,
      clientId: client.id
    },
  })

  // connect new user to client
  await prisma.client.update({
    where: {
      id: client.id
    },
    data: {
      users: {
        connect: {
          id: created.id
        }
      }
    }
  })

  return created
}
export async function createAgencyUser(agencyId: number, data: UserFormValues) {

  const created= await prisma.user.create({
    data: {
      ...data,
      agencyId
    }
  })

  return created
}

export async function updateUser(id: string, data: UserFormValues) {
  const currentUser= await getCurrentUser()
  if (!currentUser?.agencyId)
    throw new Error()

  const agencyId= currentUser.agencyId
  if (!agencyId)
    throw new Error()

  const edited= await prisma.user.update({
    where: {
      id
    },
    data: {
      ...data,
      agencyId
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

export async function getUniqueRoles() {
  const roles= await prisma.user.findMany({
    select: {
      role: true
    },
    distinct: ['role']
  })

  return roles.map(role => role.role)
}

export async function setClientsToUser(userId: string, clients: DataClient[]): Promise<boolean> {
  const oldClients= await prisma.user.findUnique({
    where: {
      id: userId
    },
    select: {
      clients: true
    }
  }).then(res => res?.clients)

  const old= await prisma.user.update({
    where: {
      id: userId
    },
    data: {
      clients: {
        disconnect: oldClients
      }
    }
  })

  const user= await prisma.user.update({
    where: {
      id: userId
    },
    data: {
      clients: {
        connect: clients.map(dataClient => ({ id: dataClient.id }))
      }
    }
  })

  if (!user) return false

  return true
}

export async function getUserComplentaryClients(userId: string){
  const user= await prisma.user.findUnique({
    where: {
      id: userId
    },
    include: {
      clients: true
    }
  })

  if (!user) {
    console.error('no user found');    
    return []
  }

  const agencyId= user.agencyId
  if (!agencyId) {
    console.error('no agencyId found');
    return []
  }

  const clients= await prisma.client.findMany({
    where: {
      agencyId: agencyId,
      NOT: {
        id: {
          in: user.clients.map(client => client.id)
        }
      }
    }
  })

  return clients
}