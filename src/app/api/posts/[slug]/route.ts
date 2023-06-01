import { NextRequest, NextResponse } from "next/server";
import { prisma } from '../../../(server-side)/db'

export async function GET(request: NextRequest, { params }: { params: {slug: string } } ) {
    const slug= params.slug

    const users = await prisma.post.findMany({
        where: {
            client: {
                slug
            },
        },
        orderBy: {
          date: 'desc'
        },
        include: {
            pilar: true,
        }
      });    
    
    return NextResponse.json({ data: users }, { status: 200 })
}



export async function POST(request: Request, { params }: { params: {slug: string} } ) {
    const slug= params.slug
    const json= await request.json()
    console.log("json: " + JSON.stringify(json))

    const { title, image, format, hashtags, copy, link, date, pilarId }= json

    const dateWithTime = new Date(date);
    dateWithTime.setHours(0, 0, 0, 0);
    dateWithTime.setDate(dateWithTime.getDate()+1)

    console.table({ slug, title, image, format, hashtags, copy, link, dateWithTime, pilarId })

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
            date: dateWithTime,
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

