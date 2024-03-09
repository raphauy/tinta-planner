"use client"

import { Button } from "@/components/ui/button"
import { ConversationDAO } from "@/services/conversation-services"
import { ColumnDef } from "@tanstack/react-table"

import { formatWhatsAppStyle } from "@/lib/utils"
import Image from "next/image"
import Link from "next/link"
import UnreadMessages from "../[conversationId]/unread-box"
import { ConversationActions } from "./actions-box"
  

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

      return (
        <div className="flex flex-col items-end gap-2 pr-1 tracking-tighter justify-evenly parent-hover">
          <p>
            {formatWhatsAppStyle(data.updatedAt)}
          </p>
          <div className="flex items-center">
            <UnreadMessages conversationId={data.id} initUnreadMessages={data.unreadMessages} />

            <ConversationActions data={data} />
          </div>
        </div>
      )
    },
  },
]


