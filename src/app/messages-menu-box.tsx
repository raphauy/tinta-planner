"use client"

import { Button } from "@/components/ui/button";
import Link from "next/link"
import { useEffect, useRef, useState } from "react";
import { getUnreadMessagesCountAction } from "./whatsapp/messages/message-actions";
import socket from "@/lib/socket";
import { cn } from "@/lib/utils";

type Props = {
    whatsappHref: string;
}
export default function MessagesMenuBox({ whatsappHref }: Props) {
    const [unreadMessages, setUnreadMessages] = useState(0);
    const unreadMessagesRef = useRef(0)

    useEffect(() => {
        unreadMessagesRef.current = unreadMessages;
    }, [unreadMessages])

    useEffect(() => {
        getUnreadMessagesCountAction()
        .then((res) => {
            console.log(res)            
            setUnreadMessages(res)
        })
        .catch((err) => {
            console.error(err)
        })    
    }, [])
    

    useEffect(() => {
        const handleNewMessage = (message: string) => {
            getUnreadMessagesCountAction()
            .then((res) => {
                setUnreadMessages(res)
            })
            .catch((err) => {
                console.error(err)
            })    
        };

        socket.on("messageArrived", handleNewMessage)

        socket.on("messagesRead", handleNewMessage)

        return () => {
            socket.off("messageArrived", handleNewMessage)
            socket.off("messagesRead", handleNewMessage)
        };
    }, [])

    return (
        <div className="relative">
            <Link href={whatsappHref}>
                <Button className="h-8 text-lg" variant="ghost">
                    Mensajes
                </Button>
            </Link>
            <div className={cn("absolute top-0 right-0 z-20 flex items-center justify-center w-5 h-5 text-sm font-bold text-white bg-green-500 rounded-full", unreadMessages === 0 && "hidden")}>
                {unreadMessages}
            </div>
        </div>
    )
}
