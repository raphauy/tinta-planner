import { prisma } from "@/app/(server-side)/db";
import { NextResponse } from "next/server";

export async function PATCH(request: Request, { params }: { params: {slug: string, clientId: string} } ) {
    const json= await request.json()
    const slug= params.slug
    const clientId= params.clientId
    console.table({ slug, clientId, json })

    const updated= await prisma.client.update({
        where: {
            id: parseInt(clientId)
        },
        data: json
    })

    return NextResponse.json({ data: updated }, { status: 200})
}
