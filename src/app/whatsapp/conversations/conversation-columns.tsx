"use client"

import { Button } from "@/components/ui/button"
import { ConversationDAO } from "@/services/conversation-services"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, User } from "lucide-react"
import { format, formatDistanceToNow } from "date-fns"
import { DeleteConversationDialog, ConversationDialog } from "./conversation-dialogs"

import { MessagesDialog } from "./conversation-dialogs"
import Link from "next/link"
import Image from "next/image"
import { es } from "date-fns/locale"
import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"
  

export const columns: ColumnDef<ConversationDAO>[] = [
  
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <p>Conversaciones:</p>
      )
    },
    cell: ({ row }) => {
      const data= row.original
      const image= data.pictureUrl ? data.pictureUrl : "https://utfs.io/f/ce7e6954-94ef-4c36-a4b5-5a742b633df9-h5faa7.png"
  
      return (
        <div className="flex">
          <Link href={`/whatsapp/${data.id}`}>
            <Button variant="link" className="gap-2">
              <Image src={image} width={40} height={40} className="rounded-full" alt="Profile picture" />
              {data.name}
            </Button>
          </Link>
          {/* <div className="flex items-center justify-end">
            <DeleteConversationDialog description={"eliminar esta conversación"} id={data.id} />
          </div> */}
        </div>
      )
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const data= row.original

      const deleteDescription= `Do you want to delete Conversation ${data.id}?`
 
      return (
        <div className="flex flex-col items-end gap-2 pr-1">
          <p>
            {formatDistanceToNow(data.updatedAt, {locale: es})}
          </p>
          <div className={cn("w-6 h-6 font-bold text-center text-white bg-green-500 border rounded-full", data.unreadMessages === 0 && "hidden")}>
            {data.unreadMessages}
          </div>
        </div>
      )
    },
  },
]


