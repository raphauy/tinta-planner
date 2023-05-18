import { NextResponse } from "next/server";
import { prisma } from '../../../../(server-side)/db'


export async function GET(request: Request, { params }: { params: {slug: string, pilarId: string} } ) {
    const slug= params.slug
    const pilarId= params.pilarId
    console.table({ slug, pilarId })

    const found= await prisma.pilar.findFirst({
        where: {
            id: parseInt(pilarId)
        },
    })
    
    return NextResponse.json({ data: found }, { status: 200})
}


export async function PUT(request: Request, { params }: { params: {slug: string, pilarId: string} } ) {
    const json= await request.json()
    const slug= params.slug
    const pilarId= params.pilarId
    console.table({ slug, pilarId, json })

    const name= json.name
    const description= json.description
    const color= json.color
    
    if (!name || !description || !color)
        return NextResponse.json({ error: "all fields are required on PUT"}, { status: 400})    

    const updated= await prisma.pilar.update({
        where: {
            id: parseInt(pilarId)
        },
        data: {
            name,
            description,
            color,
        }
    })

    return NextResponse.json({ data: updated }, { status: 200})
}

export async function PATCH(request: Request, { params }: { params: {slug: string, pilarId: string} } ) {
    const json= await request.json()
    const slug= params.slug
    const pilarId= params.pilarId
    console.table({ slug, pilarId, json })

    const updated= await prisma.pilar.update({
        where: {
            id: parseInt(pilarId)
        },
        data: json
    })

    return NextResponse.json({ data: updated }, { status: 200})
}

export async function DELETE(request: Request, { params }: { params: {slug: string, pilarId: string} } ) {
    const slug= params.slug
    const pilarId= params.pilarId
    console.table({ slug, pilarId })

    const deleted= await prisma.pilar.delete({
        where: {
            id: parseInt(pilarId)
        }
    })

    return NextResponse.json({ data: deleted }, { status: 200})
}
