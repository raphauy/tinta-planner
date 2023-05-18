import { NextResponse } from "next/server";
import { prisma } from '../../../../(server-side)/db'


export async function GET(request: Request, { params }: { params: {slug: string, userId: string} } ) {
    const slug= params.slug
    const userId= params.userId
    console.table({ slug, userId })

    const found= await prisma.user.findFirst({
        where: {
            id: userId
        },
    })
    
    return NextResponse.json({ data: found }, { status: 200})
}


export async function PUT(request: Request, { params }: { params: {slug: string, userId: string} } ) {
    const json= await request.json()
    const slug= params.slug
    const userId= params.userId
    console.table({ slug, userId, json })

    const name= json.name
    const email= json.email
    
    if (!email)
        return NextResponse.json({ error: "email are required"}, { status: 400})

    const found= await prisma.user.findFirst({
        where: {
            email
        },
    })

    if(found && found.id != userId)
        return NextResponse.json({ error: `Ya existe un usuario con el mail ${email}` }, { status: 401 })
    

    const updated= await prisma.user.update({
        where: {
            id: userId
        },
        data: {
            name,
            email,
        }
    })

    return NextResponse.json({ data: updated }, { status: 200})
}

export async function PATCH(request: Request, { params }: { params: {slug: string, userId: string} } ) {
    const json= await request.json()
    const slug= params.slug
    const userId= params.userId
    console.table({ slug, userId, json })

    const email= json.email
    
    if (!email)
        return NextResponse.json({ error: "email are required"}, { status: 400})

    const updated= await prisma.user.update({
        where: {
            id: userId
        },
        data: json
    })

    return NextResponse.json({ data: updated }, { status: 200})
}

export async function DELETE(request: Request, { params }: { params: {slug: string, userId: string} } ) {
    const slug= params.slug
    const userId= params.userId
    console.table({ slug, userId })

    const deleted= await prisma.user.delete({
        where: {
            id: userId
        }
    })

    return NextResponse.json({ data: deleted }, { status: 200})
}
