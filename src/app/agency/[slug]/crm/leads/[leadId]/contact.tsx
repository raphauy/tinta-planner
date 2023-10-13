"use client"

import useCopyToClipboard from "@/app/(client-side)/hooks/useCopyToClipboard"
import { toast } from "@/components/ui/use-toast"
import { Copy } from "lucide-react"
import { DataLead } from "../(crud)/actions"

interface Props {
    lead: DataLead
}

export default function Contact({ lead }: Props) {

    const [value, copy] = useCopyToClipboard()

    function copyNameToClipboard(){   
        copy(lead.contactName)    
        toast({title: "Nombre copiado" })
    }
    
    function copyEmailToClipboard(){   
        copy(lead.contactEmail)    
        toast({title: "Email copiado" })
    }

    function copyPhoneToClipboard(){   
        copy(lead.contactPhone)    
        toast({title: "Teléfono copiado" })
    }

    return (
        <div className="flex flex-col gap-3">
            {
                lead.contactName && (
                    <div className="flex items-center justify-between gap-3">
                        <p className="font-bold">{ lead.contactName }</p>
                        <Copy onClick={copyNameToClipboard} size={20} className='btn' />
                    </div>    
                )
            }
            {
                lead.contactEmail && (
                    <div className="flex items-center justify-between gap-3">
                        <p>{ lead.contactEmail }</p>
                        <Copy onClick={copyEmailToClipboard} size={20} className='btn' />
                    </div>
                )    
            }
            {
                lead.contactPhone && (
                    <div className="flex items-center justify-between gap-3">
                        <p>{ lead.contactPhone }</p>
                        <Copy onClick={copyPhoneToClipboard} size={20} className='btn' />
                    </div>
                )    
            }

        </div>
      )
}
