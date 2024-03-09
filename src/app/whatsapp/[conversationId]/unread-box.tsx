"use client"

import socket from "@/lib/socket";
import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";

type Props = {
    conversationId: string;
    initUnreadMessages: number;
};

export default function UnreadMessages({ conversationId, initUnreadMessages }: Props) {
    const [unreadMessages, setUnreadMessages] = useState(initUnreadMessages);
    const unreadMessagesRef = useRef(initUnreadMessages)

    useEffect(() => {
        unreadMessagesRef.current = unreadMessages;
    }, [unreadMessages]);

    useEffect(() => {
        const handleNewMessage = (message: string) => {
            if (message === conversationId) {
                // Usa la referencia para obtener el valor actual
                setUnreadMessages(unreadMessagesRef.current + 1);
            }
        };

        const handleMessagesRead = (message: string) => {
            if (message === conversationId) {
                setUnreadMessages(0);
            }
        };

        // Escuchar el evento 'messageArrived' desde el servidor
        socket.on("messageArrived", handleNewMessage);

        socket.on("messagesRead", handleMessagesRead);

        // Limpiar el listener al desmontar el componente
        return () => {
            socket.off("messageArrived", handleNewMessage);
            socket.off("messagesRead", handleMessagesRead);
        };
    }, [conversationId]); // Asegúrate de incluir conversationId aquí si es necesario

    return (
        <div className={cn("w-6 h-6 font-bold text-center text-white bg-green-500 border rounded-full", unreadMessages === 0 && "hidden")}>
            {unreadMessages}
        </div>
    );
}
