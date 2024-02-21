import { getClientById } from "@/app/(server-side)/services/getClients"
import { ContactFormValues, createContact, getContactDAOByEmail, getContactDAOByEmailAndClientId } from "@/services/contact-services"
import { NextResponse } from "next/server"

type Props= {
    params: {
        clientId: string
    }
}

export async function POST(req: Request, { params }: Props) {
    
    const clientIdStr= params.clientId
    const clientId= parseInt(clientIdStr)
    if (isNaN(clientId)){
        return NextResponse.json({ error: "clientId must be a number" }, { status: 400, headers})
    }

    const json= await req.json()
    const name= json.contact.name
    const email= json.contact.email
    console.table({ clientId, name, email })

    const contact= await getContactDAOByEmailAndClientId(email, clientId)
    if (contact){
        console.log(`Contact ${contact.email} already exists`)        
        return NextResponse.json({ message: `El email ${email} ya estaba subscripto` }, { status: 200, headers})
    }

    const client= await getClientById(clientId)
    console.log(`creating Contact vía API for: ${client?.name}`)

    const contactForm: ContactFormValues= {
        name,
        email,
        clientId
    }

    const created= await createContact(contactForm)
    if (!created){
        return NextResponse.json({ error: "Error al crear el contacto" }, { status: 500, headers})
    }
    
    return NextResponse.json({ message: `Suscripción exitosa para ${email}` }, { status: 201, headers})
}


export async function OPTIONS() {
    return new NextResponse(null, { status: 200,headers });
}

const headers= {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
}        