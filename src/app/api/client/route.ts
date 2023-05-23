import { getClientOfCurrenUser } from "@/app/(server-side)/services/getClients";
import { NextResponse } from "next/server";


export async function GET(request: Request) {

    const found= await getClientOfCurrenUser()

    if (!found)
        return NextResponse.json({ error: "client not found"}, { status: 401 })
   
    return NextResponse.json({ data: found }, { status: 200 })
}

