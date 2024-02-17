import { NextResponse } from "next/server";
import { prisma } from "@/app/(server-side)/db";
import { setEmailStatus } from "@/services/email-services";
import { getClientBySlug } from "@/app/(server-side)/services/getClients";

type Props = {
    params: {
        slug: string
        mailId: string
    }
}

export async function GET(request: Request, { params }: Props) {
    const slug= params.slug
    const mailId= params.mailId    

    console.table({ slug, mailId })

    if (mailId && mailId !== 'only-image') {
        const found= await setEmailStatus(mailId, 'opened')
        if(!found) {
            console.log('Email not found')            
        }
    }

    const found= await prisma.client.findFirst({
        where: {
            slug
        },
    })

    const client= await getClientBySlug(slug)
    if (!client) {
        return NextResponse.json({ error: "client not found"}, { status: 401 })
    }

    const banner= client.banner
    return NextResponse.redirect(banner)

}

