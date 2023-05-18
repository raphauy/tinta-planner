import { NextResponse } from "next/server";
import { prisma } from '../../../(server-side)/db'


export async function GET(request: Request, { params }: { params: {slug: string} } ) {
    const slug= params.slug
    
    const users = await prisma.user.findMany({
        where: {
            client: {
                slug
            }
        },
        orderBy: {
          id: 'asc'
        },
        include: {
            sessions: true
        }
      });

    if (!users)
        return NextResponse.json({ status: 200 })
    
    return NextResponse.json({ data: users }, { status: 200 })
}


export async function POST(request: Request, { params }: { params: {slug: string} } ) {
    const slug= params.slug
    const { name, email }= await request.json()
    console.table({ slug, name, email })

    const found= await prisma.user.findFirst({
        where: {
            email
        },
    })

    if(found)
        return NextResponse.json({ error: `Ya existe un usuario con el mail ${email}` }, { status: 401 })

    const client= await prisma.client.findFirst({
        where: {
            slug
        },
    })

    if(!client)
        return NextResponse.json({ error: "Client not found" }, { status: 401 })

    const created= await prisma.user.create({
        data: {
            name,
            email,
            clientId: client.id
        }
    })

    return NextResponse.json({ data: created }, { status: 201 })
}
