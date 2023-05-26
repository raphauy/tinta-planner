import { prisma } from "@/app/(server-side)/db";
import { NextResponse } from "next/server";

export async function GET(request: Request) {

    const found= await prisma.client.findMany({})
    
    return NextResponse.json({ data: found }, { status: 200})
}

