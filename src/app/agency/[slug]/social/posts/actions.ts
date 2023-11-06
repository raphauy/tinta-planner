"use server"

import { getClientById } from "@/app/(server-side)/services/getClients";
import { getLastPostOfPilar, updatePostStatus } from "@/app/(server-side)/services/postServices";
import { getPilar } from "@/services/pilarService";
import { Post } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function updatePostStatusAction(id: string, status: string): Promise<boolean>{  
    const updated= await updatePostStatus(id, status)
    if (!updated) return false

    const client= await getClientById(updated.clientId)
    if (!client) return false

    revalidatePath(`/agency/${client.slug}/social/posts?id=${id}`)
    
    return true
}


export async function getLastPostOfPilarAction(id: number): Promise<Post | null> {
    return await getLastPostOfPilar(id)
}
