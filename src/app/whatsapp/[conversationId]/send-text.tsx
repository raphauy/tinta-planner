"use client"

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { toast } from "@/components/ui/use-toast"
import { cn } from "@/lib/utils"
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'
import { Image, ImagePlus, Loader, Mic, Plus, SendIcon, Smile, Video, X } from "lucide-react"
import { useEffect, useState } from "react"
import { sendTintaMessageAction } from "../conversations/conversation-actions"
import SendFiles from "./send-files"
import { Button } from "@/components/ui/button"
import { BsFilePdfFill } from "react-icons/bs"

type Props = {
    conversationId: string
    replayId?: string
    replyName?: string
    replayText?: string
    type: string
    notifyCloseReplay: () => void
}
export default function SendText({ conversationId, replayId, replyName, replayText, type, notifyCloseReplay }: Props) {
    const [loading, setLoading] = useState(false)
    const [input, setInput] = useState("")
    const [whatsappId, setWhatsappId] = useState("")

    useEffect(() => {
        setWhatsappId(replayId || "")    
    }, [replayId])
    

    function sendMessage() {
        setLoading(true)
        sendTintaMessageAction(conversationId, input, whatsappId)
        .catch(() => {
            toast({ title: "Error al enviar el mensaje", variant: "destructive" })
        })
        .finally(() => {
            setLoading(false)
            setInput("")
        })
        setWhatsappId("")
        notifyCloseReplay()
    }

    function emojiSelect(emoji: any) {
        setInput(input + emoji.native)
    }

    return (
        <div className="px-4 space-y-3">
            <div className={cn("flex items-center", !whatsappId && "hidden")}>
                <div className={cn("bg-[#f0f0f0] h-16 rounded-lg p-2 mt-1 flex-1 border-l-4 border-l-rose-500")}>
                    <p className="text-xs text-[#00a884]">{replyName}</p>

                    {type === "text" && <p className="text-xs line-clamp-2">{replayText}</p> }
                    {type === "audio" && <div className="flex items-center gap-2 mt-2 text-muted-foreground"><Mic /> Audio</div>}
                    {type === "image" && <div className="flex items-center gap-2 mt-2 text-muted-foreground"><ImagePlus /> Imagen</div>}
                    {type === "video" && <div className="flex items-center gap-2 mt-2 text-muted-foreground"><Video /> Video</div>}
                    {type === "pdf" && <div className="flex items-center gap-2 mt-2 text-muted-foreground"><BsFilePdfFill size={25} className='text-red-500' /> PDF</div>}
                    
                </div>
                <Button onClick={notifyCloseReplay} variant="link" >
                    <X className="mx-4 font-bold text-muted-foreground"/>
                </Button>
            </div>

            <div className="flex items-center gap-3 text-muted-foreground">
                <Popover>
                    <PopoverTrigger><Smile /></PopoverTrigger>
                    <PopoverContent><Picker data={data} onEmojiSelect={emojiSelect} /></PopoverContent>
                </Popover>

                <Popover>
                    <PopoverTrigger><Plus /></PopoverTrigger>
                    <PopoverContent className="w-48 rounded-3xl"><SendFiles /></PopoverContent>
                </Popover>

                <div className="relative w-full">
                    <input
                        id="text"
                        onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        className="flex-1 w-full h-12 p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring focus:ring-gray-400 dark:border-gray-800"
                        placeholder="Escribe un mensaje"
                        type="text"
                    />
                    <button
                        onClick={sendMessage}
                        className={cn(
                        "absolute inset-y-0 right-4 my-auto flex h-8 w-8 items-center justify-center rounded-md transition-all",
                        loading || input.length === 0
                            ? "cursor-not-allowed bg-white"
                            : "bg-green-500 hover:bg-green-600",
                        )}
                        disabled={loading}
                    >
                        {loading ? (
                        <Loader className="animate-spin" />
                        ) : (
                        <SendIcon
                            className={cn("h-4 w-4",input.length === 0 ? "text-gray-300" : "text-white")}
                        />
                        )}
                    </button>

                </div>
            </div>
        </div>
    )
}
