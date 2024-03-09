"use client"

import { useEffect, useRef, useState } from "react"
import { columns } from "./conversations/conversation-columns"
import { DataTable } from "./conversations/conversation-table"
import { ConversationDAO } from "@/services/conversation-services"
import { getConversationsDAOAction } from "./conversations/conversation-actions"
import { io } from "socket.io-client";
import socket from "@/lib/socket"


export default function LateralPanel() {

    const [data, setData] = useState<ConversationDAO[]>([])
    const dataRef = useRef<ConversationDAO[]>([]); // Crear una ref para mantener la última versión de data

    const [messageArrived, setMessageArrived] = useState(false)
    const [actualMessage, setActualMessage] = useState("")

    useEffect(() => {
        dataRef.current = data;
    }, [data])

    useEffect(() => {

        // Escuchar el evento 'messageArrived' desde el servidor
        socket.on("messageArrived", (message) => {
            console.log("Nuevo mensaje llegado:", message);
            setMessageArrived(true)
            setActualMessage(message)

            const currentData = dataRef.current

            console.log(currentData);
            

            const conversation= currentData.find(c => c.id === message)
            if (conversation) {
                conversation.unreadMessages++
                console.log("conversation: ", conversation);                
            } else {
                console.log("No conversation found for message: ", message);
            }
        })

        socket.on("messagesRead", (conversationId) => {
            console.log("Messages read: ", conversationId)
            const currentData = dataRef.current
            const conversation= currentData.find(c => c.id === conversationId)
            if (conversation) {
                conversation.unreadMessages= 0
            } else {
                console.log("No conversation found for message: ", conversationId);
            }
        })

        // Limpiar el listener al desmontar el componente
        return () => {
            socket.off("messageArrived");
        };
    }, [])

    useEffect(() => {
        getConversationsDAOAction()
        .then(data => {
            setData(data)
        })
        .catch(err => {
            console.log("Error getting conversations: ", err)
        })
        setMessageArrived(false)
    }, [])


    return (
        <div className="hidden max-w-lg p-3 py-4 mx-auto border rounded-md md:block text-muted-foreground dark:text-white">
            <p>{messageArrived ? "Nuevo mensaje" : "Conversaciones"}</p>
            <DataTable columns={columns} data={data} subject="Conversation"/>      
        </div>
    )
}
