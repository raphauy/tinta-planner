"use server"
  
import { PostDAO, getPostDAO } from "@/services/post-services"


export async function getPostDAOAction(id: string): Promise<PostDAO | null> {
    return getPostDAO(id)
}

