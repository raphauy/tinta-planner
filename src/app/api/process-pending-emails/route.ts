import { processPending } from '@/services/envio-services'
import { NextResponse } from 'next/server'

export const maxDuration = 120

export async function GET(req: Request) {
    if (req.headers.get('Authorization') !== `Bearer ${process.env.CRON_SECRET}`) {
        return NextResponse.json({ error: "unauthorized" }, { status: 401 })
    }

    await processPending()

    return NextResponse.json({ ok: true })
}