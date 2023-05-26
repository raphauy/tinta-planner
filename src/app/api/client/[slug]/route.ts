import { NextResponse } from "next/server";
import { prisma } from "@/app/(server-side)/db";


export async function GET(request: Request, { params }: { params: {slug: string } }) {
    const slug= params.slug
    console.table({ slug })

    const found= await prisma.client.findFirst({
        where: {
            slug
        },
    })
    
    return NextResponse.json({ data: found }, { status: 200})
}

