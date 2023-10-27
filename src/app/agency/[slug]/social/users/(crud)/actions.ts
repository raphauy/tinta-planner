"use server"

import { deleteUser, updateUser, getUser, createClientUser } from "@/services/userService";
import { User } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { getClientById } from "@/app/(server-side)/services/getClients";
import { UserFormValues } from "./usersForm";

export type DataUser = {
    id: string
    name: string | null
    email: string | null
    role: string
    emailVerified: Date | null
    clientId: number | null
    clientSlug: string
}
  


export async function create(slug: string, data: UserFormValues): Promise<User | null> {
    const created= await createClientUser(slug, data)

    console.log(created);

    revalidatePath(`/agency/${slug}/social/users`)

    return created
}
  
export async function update(slug: string, userId: string, data: UserFormValues): Promise<User | null> {  
    const edited= await updateUser(userId, data)    

    revalidatePath(`/agency/${slug}/social/users`)
    
    return edited
}


export async function eliminate(userId: string): Promise<User | null> {    
    const deleted= await deleteUser(userId)

    if (!deleted?.clientId) return deleted

    const client= await getClientById(deleted.clientId)
    if (!client) return deleted

    revalidatePath(`/agency/${client.slug}/social/users`)

    return deleted
}

