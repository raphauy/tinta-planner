import { NextResponse } from "next/server";
import { prisma } from '../../../(server-side)/db'

export async function GET(request: Request, { params }: { params: {slug: string} } ) {
    const slug= params.slug
    console.log("posts, slug: " + slug);
   
    const users = await prisma.post.findMany({
        where: {
            client: {
                slug
            }
        },
        orderBy: {
          id: 'desc'
        },
        include: {
            pilar: true
        }
      });

    if (!users)
        return NextResponse.json({ status: 200 })
    
    return NextResponse.json({ data: users }, { status: 200 })
}


export async function POST(request: Request, { params }: { params: {slug: string} } ) {
    const slug= params.slug
    const json= await request.json()
    console.log("json: " + JSON.stringify(json))


    const { title, image, format, hashtags, copy, link, pilarId }= json
    console.table({ slug, title, image, format, hashtags, copy, link, pilarId })

    const client= await prisma.client.findFirst({
        where: {
            slug
        },
    })

    if(!client)
        return NextResponse.json({ error: "Client not found" }, { status: 401 })

    const created= await prisma.post.create({
        data: {
            title,
            image,
            format,
            hashtags,
            copy,
            link,
            client: {
                connect: {
                    id: client.id
                }
            },
            pilar: {
                connect: {
                    id: parseInt(pilarId)
                }
            }
        }
    })

    return NextResponse.json({ data: created }, { status: 201 })


}
