"use server"

import { FormValues } from "@/app/super/agencies/form";
import { prisma } from "../db";

export async function getAgency(id: number) {

  const found = await prisma.agency.findFirst({
    where: {
      id
    },
    include: {
      clients: true,
      users: true
    }
  });

  return found;
};

export async function getAgencys() {

  const found = await prisma.agency.findMany({
    orderBy: {
      id: 'asc',
    },
    include: {
      clients: true,
      users: true
    }
  });

  return found;
};

export async function create(data: FormValues) {
  
  const created= await prisma.agency.create({
    data
  })

  console.log("createdddd");
  
  return created
}

export async function edit(id: number, data: FormValues) {
  
  const updated= await prisma.agency.update({
    where: {
      id
    },
    data
  })
  console.log("editedddd");

  return updated
}

export async function deleteAgency(id: number) {
  
  const deleted= await prisma.agency.delete({
    where: {
      id
    },
  })

  return deleted
}

export async function connect(agencyId: number, userId: string) {

  const updated= await prisma.user.update({
    where: {
      id: userId
    },
    data: {
      role: "agency"
    }
  })

  if (!updated)
    return null

  const updatedAgency = await prisma.agency.update({
    where: {
      id: agencyId
    },
    data: {
      users: {
        connect: {
          id: userId
        }
      }
    }
  });

  return updatedAgency;
}

export async function disconnect(agencyId: number, userId: string) {
  const updatedAgency = await prisma.agency.update({
    where: {
      id: agencyId
    },
    data: {
      users: {
        disconnect: {
          id: userId
        }
      }
    }
  });

  return updatedAgency;
}

