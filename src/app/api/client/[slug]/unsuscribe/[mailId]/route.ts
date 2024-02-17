import { NextResponse } from "next/server";
import { prisma } from "@/app/(server-side)/db";
import { getEmailDAO, setEmailStatus } from "@/services/email-services";
import { getClientBySlug } from "@/app/(server-side)/services/getClients";
import { getContactDAO, getContactDAOByEmail, setStatus } from "@/services/contact-services";

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

    if (mailId) {
        console.log(`baja mailId: ${mailId}`);
        
        const mail= await getEmailDAO(mailId)
        if (mail) {
            const contact= await getContactDAOByEmail(mail.emailTo)
            await setStatus(contact.id, 'unsubscribed')
        } else {
            console.log('Email not found')            
        }
    }

    const BASE_URL = process.env.NEXTAUTH_URL || "http://localhost:3000"

    return NextResponse.redirect(`${BASE_URL}/unsuscribe/${mailId}`)

}

