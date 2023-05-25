import { NextRequest, NextResponse } from "next/server";
import { prisma } from '../../../../(server-side)/db'

export async function GET(request: NextRequest, { params }: { params: {slug: string } } ) {
    const slug= params.slug

    const users = await prisma.post.findMany({
        where: {
            client: {
                slug
            },
            date: {
                not: null
            }
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


