import { NextResponse } from "next/server";
import { prisma } from '../../../(server-side)/db'


export async function GET(request: Request, { params }: { params: {slug: string} } ) {
    const slug= params.slug
    
    const found= await prisma.pilar.findMany({
        where: {
            client: {
                slug
            }
        },
        orderBy: {
            id: "asc"
        }
    })
    if (!found)
        return NextResponse.json({}, { status: 200 })

    return NextResponse.json({ data: found }, { status: 200 })
}


export async function POST(request: Request, { params }: { params: {slug: string} } ) {
    const slug= params.slug
    const { name, description, color }= await request.json()
    console.table({ slug, name, description, color })

    const client= await prisma.client.findFirst({
        where: {
            slug
        },
    })

    if(!client)
        return NextResponse.json({ error: "Client not found" }, { status: 401 })

    const pilar= await prisma.pilar.create({
        data: {
            name,
            color,
            description,
            client: {
                connect: {
                    id: client.id
                }
            }
        }
    })
    return NextResponse.json({ data: pilar }, { status: 201 })
}
