import { prisma } from "@/app/(server-side)/db";
import getClients from "@/app/(server-side)/services/getClients";
import getCurrentUser from "@/app/(server-side)/services/getCurrentUser";
import { User } from "@prisma/client";
import { NextResponse } from "next/server";


export async function GET(request: Request) {

    const user= await getCurrentUser()
    if (!user?.agencyId) return NextResponse.json({ error: "El usuario no tiene una agencia asignada" }, { status: 400 })
    
    const clients= await getClients(user.agencyId)
    const clientIds = clients.map(client => client.id)

    const users = await prisma.user.findMany({
        where: {
            clientId: {
                in: clientIds
            }
        },
        orderBy: {
            id: 'asc',
        },
        include: {
            client: true
        }
    })    
    

    if (!users)
        return NextResponse.json({ status: 200 })
    
    return NextResponse.json({ data: users }, { status: 200 })
}