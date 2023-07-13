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
    const slug = params.slug;
    const json = await request.json();

    const { title, image, format, hashtags, copy, link, date, pilarId }= json;

    // Define dateWithTime solo si date tiene un valor
    let dateWithTime: Date | undefined;
    if (date) {
        dateWithTime = new Date(date);
        dateWithTime.setHours(0, 0, 0, 0);
        dateWithTime.setDate(dateWithTime.getDate()+1);
    }

    const client = await prisma.client.findFirst({
        where: {
            slug
        },
    });

    if (!client) {
        return NextResponse.json({ error: "Client not found" }, { status: 401 });
    }

    // Define un objeto con el tipo específico
    let data: {
        title: string,
        image: string,
        format: string,
        hashtags: string,
        copy: string,
        link: string | undefined,
        date?: Date,
        client: {
            connect: {
                id: number
            }
        },
        pilar: {
            connect: {
                id: number
            }
        }
    } = {
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
    };

    // Solo añade date a data si dateWithTime tiene un valor
    if (dateWithTime) {
        data.date = dateWithTime;
    }

    const created = await prisma.post.create({
        data
    });

    return NextResponse.json({ data: created }, { status: 201 });
}

