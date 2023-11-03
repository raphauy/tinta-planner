"use server"

import { getClientBySlug } from "../(server-side)/services/getClients"

export async function isWineDisabled(slug: string) {
    const FEATURE_WINES_DISABLED_CLIENTS= process.env.FEATURE_WINES_DISABLED_CLIENTS?.split(",").map(Number) || []

    const client= await getClientBySlug(slug)
    if (!client) return false

    return FEATURE_WINES_DISABLED_CLIENTS.includes(client.id)    
}