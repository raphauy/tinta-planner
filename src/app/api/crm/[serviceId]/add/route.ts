import { NoteFormValues } from "@/app/agency/[slug]/crm/leads/(crud)/note-form"
import { LeadFormValues } from "@/app/agency/[slug]/crm/leads/create/main-form"
import { createLead, createNote } from "@/services/leadService"
import { NextResponse } from "next/server"

type Props = {
    params: {
        serviceId: string
    }
}

export async function POST(request: Request, { params }: Props) {
    const serviceId= params.serviceId
    const { name, email, content, leadType }= await request.json()
    console.table({ name, email, content, leadType, serviceId })

    if (!name) return NextResponse.json({ data: "name is required" }, { status: 400 })
    if (!email) return NextResponse.json({ data: "email is required" }, { status: 400 })
    if (!leadType) return NextResponse.json({ data: "leadType is required" }, { status: 400 })

    const form: LeadFormValues= {
        serviceId,
        company: name,
        contactName: name,
        contactEmail: email,
        type: leadType,
    }

    const created= await createLead(form)
    if (!created) return NextResponse.json({ data: "Error creating lead" }, { status: 500 })

    const noteForm: NoteFormValues= {
        leadId: created.id,
        title: "Contact form",
        text: content,
    }
    const note= await createNote(noteForm)
    if (!note) return NextResponse.json({ data: "Error creating note" }, { status: 500 })

    return NextResponse.json({ data: "OK" }, { status: 201 })
}
