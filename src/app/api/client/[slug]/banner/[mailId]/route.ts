import { NextResponse } from "next/server";
import { prisma } from "@/app/(server-side)/db";
import { setEmailStatus } from "@/services/email-services";

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

    const text = found?.name || 'Newsletter';

    const svg = `
<svg width="1000" height="200" xmlns="http://www.w3.org/2000/svg">
    <defs>
    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:rgb(255,255,255);stop-opacity:1" />
        <stop offset="100%" style="stop-color:rgb(0,0,0);stop-opacity:1" />
    </linearGradient>
    </defs>
    <style>
        .text { font: bold 55px Arial; text-anchor: middle; dominant-baseline: middle; }
    </style>
    <rect width="100%" height="100%" fill="url(#gradient)" />
    <text x="50%" y="50%" class="text" fill="black">${text}</text>
</svg>
`;

    // res.setHeader('Content-Type', 'image/svg+xml');
    // res.send(svg);

    return new Response(svg, {
        headers: {
            'Content-Type': 'image/svg+xml',
        },
    });
    

}

