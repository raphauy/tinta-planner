import { messageArrived, addReaction } from "@/services/conversation-services";
import { NextResponse } from "next/server";


export async function POST(request: Request, { params }: { params: { clientId: string } }) {

    try {
        const authorization = request.headers.get("authorization")
        if (!authorization) return NextResponse.json({ error: "authorization is required" }, { status: 400 })
        const apiToken= authorization.replace("Bearer ", "")
        if (!apiToken) return NextResponse.json({ error: "apiToken is required" }, { status: 400 })
        if (apiToken !== process.env.API_TOKEN) return NextResponse.json({ error: "Bad apiToken" }, { status: 400 })
        
        const json= await request.json()
        const message= json.message
        console.log("json: ", json)

        const wapId = message.wapId
        if (!wapId) {
            return NextResponse.json({ error: "wapId is required" }, { status: 400 })
        }

        const phone = message.phone
        if (!phone) {
            return NextResponse.json({ error: "phone is required" }, { status: 400 })
        }

        const text = message.text
        const mediaUrl= message.mediaUrl || ""
        if (!text && !mediaUrl) {
            return NextResponse.json({ error: "text or mediaUrl is required" }, { status: 400 })
        }

        const fromMe = message.fromMe || false
        const name = message.name || phone.split("@")[0]
        let isGroup = message.isGroup || false        
        let groupName = message.groupName || ""
        const pictureUrl = message.pictureUrl || ""
        const reactionId= message.reactionId || ""
        let mimetype= message.mimetype || ""
        const quoted= message.quoted || ""
        const isBroadcast= message.isBroadcast || false
        const isContact= message.contact || false
        const isLocation= message.location || false

        console.log("wapId: ", wapId)
        console.log("phone: ", phone)
        console.log("text: ", text)
        console.log("name: ", name)
        console.log("isGroup: ", isGroup)
        console.log("groupName: ", groupName)
        console.log("pictureUrl: ", pictureUrl)
        console.log("reactionId: ", reactionId)
        console.log("mediaUrl: ", mediaUrl)
        console.log("mimeType: ", mimetype)
        console.log("quoted: ", quoted)
        console.log("isBroadcast: ", isBroadcast)
        console.log("isContact: ", isContact)
        console.log("location: ", isLocation)
        console.log("fromMe: ", fromMe)

        if (isBroadcast) {
            isGroup= true
            groupName= "Difusión"
        }

        if (isContact) {
            mimetype= message.contact
        }

        if (isLocation) {
            mimetype= JSON.stringify(message.location)
        }

        let id

        if (reactionId) {
            id= await addReaction(reactionId, name, text)
            if (!id) return NextResponse.json({ error: "error setting reaction" }, { status: 502 })
        } else {
            id= await messageArrived(wapId, phone, name, text, "user", pictureUrl, isGroup, groupName, mediaUrl, mimetype, quoted, fromMe)
            if (!id) return NextResponse.json({ error: "error creating message" }, { status: 502 })    
        }


        return NextResponse.json({ data: id }, { status: 200 })

    } catch (error) {
        console.log("error: ", error)        
        return NextResponse.json({ error: "error: " + error}, { status: 502 })        
    }
   
}

