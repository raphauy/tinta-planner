import { prisma } from "@/app/(server-side)/db";
import { NextResponse } from "next/server";


export async function GET(request: Request) {
    
    const users = await prisma.user.findMany({
        where: {
            role: {
                not: "agency"
            }
        },
        orderBy: {
          id: 'asc'
        },
        include: {
            sessions: true,
            client: true
        }
      });

    if (!users)
        return NextResponse.json({ status: 200 })
    
    return NextResponse.json({ data: users }, { status: 200 })
}