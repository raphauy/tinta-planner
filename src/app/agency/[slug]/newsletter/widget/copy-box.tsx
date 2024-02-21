"use client"

import useCopyToClipboard from "@/app/(client-side)/hooks/useCopyToClipboard"
import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/use-toast"
import { Copy } from "lucide-react"
import { useState } from "react"


type Props= {
    initialText: string
}
export default function CopyBox({ initialText }: Props) {
    const [text, setText] = useState(initialText)
    const [value, copy] = useCopyToClipboard()

    function copyToClipboard(){   
        copy(text)    
        toast({title: "Copiado" })
    }


    return (
        <Button variant="ghost" className="p-1 h-7"><Copy onClick={copyToClipboard} /></Button>
    )
}
