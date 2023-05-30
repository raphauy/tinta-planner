import { prisma } from "@/app/(server-side)/db";
import { NextResponse } from "next/server";


export async function GET(request: Request) {
    console.log("route users");
    
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
    
    console.log(users.length);
    

    if (!users)
        return NextResponse.json({ status: 200 })
    
    return NextResponse.json({ data: users }, { status: 200 })
}