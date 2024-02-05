"use client"

import { Button } from "@/components/ui/button"
import { NewsletterDAO } from "@/services/newsletter-services"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, Eye, Pencil } from "lucide-react"
import { format, formatDistanceToNow } from "date-fns"
import { DeleteNewsletterDialog, EditNewsletterDialog } from "./newsletter-dialogs"
import Link from "next/link"
import { es } from "date-fns/locale"


export const columns: ColumnDef<NewsletterDAO>[] = [
  
  {
    accessorKey: "name",
    header: ({ column }) => {
        return (
          <Button variant="ghost" className="pl-0 dark:text-white"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
            Name
            <ArrowUpDown className="w-4 h-4 ml-1" />
          </Button>
    )},
		cell: ({ row }) => {
      const data= row.original
      return (
        <Link href={`/agency/${data.clientSlug}/newsletter/newsletters/${data.id}`}>
          <Button variant="link">{data.name}</Button>
        </Link>
      )
    }
  },

  {
    accessorKey: "createdAt",
    header: ({ column }) => {
        return (
          <Button variant="ghost" className="pl-0 dark:text-white"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
            Date
            <ArrowUpDown className="w-4 h-4 ml-1" />
          </Button>
    )},
		cell: ({ row }) => {
      const data= row.original
      const dateStr= formatDistanceToNow(data.createdAt, {
        addSuffix: true,
        locale: es,
      })
      return (<p>{dateStr}</p>)
    }
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const data= row.original

      const deleteDescription= `Do you want to delete Newsletter ${data.id}?`
 
      return (
        <div className="flex items-center justify-end gap-2">

          <Link href={`/agency/${data.clientSlug}/newsletter/newsletters/${data.id}`}>
            <Button variant="ghost"><Pencil size={25}/></Button>
          </Link>
          
          <DeleteNewsletterDialog description={deleteDescription} id={data.id} />
        </div>

      )
    },
  },
]


