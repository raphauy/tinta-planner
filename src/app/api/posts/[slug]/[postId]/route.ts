import { NextResponse } from "next/server";
import { prisma } from '../../../../(server-side)/db'
import { revalidatePath } from "next/cache";


export async function GET(request: Request, { params }: { params: {slug: string, postId: string} } ) {
    const slug= params.slug
    const postId= params.postId
    console.table({ slug, postId })

    const found= await prisma.post.findFirst({
        where: {
            id: postId
        },
        include: {
            pilar: true
        }
    })
    
    return NextResponse.json({ data: found }, { status: 200})
}


export async function PUT(request: Request, { params }: { params: {slug: string, postId: string} } ) {
    const json= await request.json()
    const slug= params.slug
    const postId= params.postId

    const { title, image, format, hashtags, copy, link, date, pilarId, status, comments }= json
    const pilarIdInt= parseInt(pilarId)

    const dateWithTime = new Date(date);
    dateWithTime.setHours(0, 0, 0, 0);
    dateWithTime.setDate(dateWithTime.getDate()+1)

    console.table({ slug, title, image, format, hashtags, copy, link, dateWithTime, pilarIdInt, status })

    const updated= await prisma.post.update({
        where: {
            id: postId
        },
        data: {
            title,
            image,
            format,
            hashtags,
            copy,
            link,
            date: date ? dateWithTime : null,
            pilarId: pilarIdInt,
            status,
            comments
        }
    })

    revalidatePath("/agency/")


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

export async function DELETE(request: Request, { params }: { params: {slug: string, postId: string} } ) {
    const slug= params.slug
    const postId= params.postId

    const deleted= await prisma.post.delete({
        where: {
            id: postId
        }
    })

    console.log("deleted: ", slug, postId)

    return NextResponse.json({ data: deleted }, { status: 200})
}
