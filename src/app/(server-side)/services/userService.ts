"use server"

import { FormValues } from "@/app/super/users/form";
import { prisma } from "../db";

export async function getUser(id: string) {

  const found = await prisma.user.findFirst({
    where: {
      id
    },
    include: {
      agency: true
    }
  });

  return found;
};

export async function getAll() {

  const found = await prisma.user.findMany({
    orderBy: {
      id: 'asc',
    },
    include: {
      agency: true
    }
  });

  return found;
};

export async function getAllWithoutAgency() {

  const found = await prisma.user.findMany({
    orderBy: {
      id: 'asc',
    },
    where: {
      agency: null
    }
  });

  return found;
};

export async function create(data: FormValues) {
  
  const created= await prisma.user.create({
    data
  })

  return created
}

export async function edit(id: string, data: FormValues) {
  
  const updated= await prisma.user.update({
    where: {
      id
    },
    data
  })

  return updated
}

export async function deleteUser(id: string) {
  
  const deleted= await prisma.user.delete({
    where: {
      id
    },
  })

  return deleted
}

