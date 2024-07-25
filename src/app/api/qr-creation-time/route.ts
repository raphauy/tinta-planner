import { NextResponse } from "next/server";

export async function POST(request: Request) {
    if (request.headers.get('Authorization') !== `Bearer ${process.env.CRON_SECRET}`) {
        return NextResponse.json({ error: "unauthorized" }, { status: 401 })
    }

    const json= await request.json()
    console.log("json: ", json)

    const { url }= json

    if (!url)
        return new Response("Missing url field", { status: 400 })

    console.log("url: ", url)

    try {
        const response = await fetch(url)

        const lastModified = response.headers.get('Last-Modified') as string
        console.log("Last-Modified:", lastModified)
        // lastModified is "Sun, 21 Jul 2024 20:23:28 GMT"
        // create a Date object from the string
        const date = new Date(lastModified);
        // convert the date to a string in the desired format
        const timeFromCreationDate = Math.round((new Date().getTime() - date.getTime()) / 1000 / 60);
        console.log("timeFromCreationDate: ", timeFromCreationDate)


        return NextResponse.json({ data: "OK", lastModified, timeFromCreationDate }, { status: 200 })

    } catch (error) {
        console.error('Error fetching URL:', error)
        return new Response('Error fetching URL', { status: 500 })
    }

    
}
