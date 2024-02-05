"use client"

import { Button } from "@/components/ui/button"
import { EmailDAO } from "@/services/email-services"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, CheckCircle2, Eye, Mail } from "lucide-react"
import { format, formatDistanceToNow } from "date-fns"
import { DeleteEmailDialog, EmailDialog } from "./email-dialogs"
import { MailCheck } from "lucide-react"
import { MailOpen } from "lucide-react"
import { es } from "date-fns/locale"


export const columns: ColumnDef<EmailDAO>[] = [
  
  {
    accessorKey: "status",
    header: ({ column }) => {
        return (
          <Button variant="ghost" className="pl-0 dark:text-white"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
            Status
            <ArrowUpDown className="w-4 h-4 ml-1" />
          </Button>
    )},
    cell: ({ row }) => {
      const data = row.original;
      return (
        <div className="flex items-center gap-2">
          {data.status === "pending" && "pending"}
          {data.status === "sent" && <Mail className="w-6 h-6 text-green-500" />}
          {data.status === "opened" && <div className="flex items-center text-green-500" ><MailOpen className="w-6 h-6" /><CheckCircle2 className="w-6 h-6" /></div>}
          {data.status === "draft" && 
            <div className="flex items-center gap-1">
              <p className="font-bold text-orange-500">draft</p>
            </div>
          }
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },

  {
    accessorKey: "sentAt",
    header: ({ column }) => {
        return (
          <Button variant="ghost" className="pl-0 dark:text-white"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
            Sent At
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
    accessorKey: "emailTo",
    header: ({ column }) => {
        return (
          <Button variant="ghost" className="pl-0 dark:text-white"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
            To
            <ArrowUpDown className="w-4 h-4 ml-1" />
          </Button>
    )},
  },

  {
    accessorKey: "emailSubject",
    header: ({ column }) => {
        return (
          <Button variant="ghost" className="pl-0 dark:text-white"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
            Subject
            <ArrowUpDown className="w-4 h-4 ml-1" />
          </Button>
    )},
  },
  // {
  //   accessorKey: "role",
  //   header: ({ column }) => {
  //     return (
  //       <Button variant="ghost" className="pl-0 dark:text-white"
  //         onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
  //         Rol
  //         <ArrowUpDown className="w-4 h-4 ml-1" />
  //       </Button>
  //     )
  //   },
  //   filterFn: (row, id, value) => {
  //     return value.includes(row.getValue(id))
  //   },
  // },
  // {
  //   id: "actions",
  //   cell: ({ row }) => {
  //     const data= row.original

  //     const deleteDescription= `Do you want to delete Email ${data.id}?`
 
  //     return (
  //       <div className="flex items-center justify-end gap-2">

  //         <EmailDialog id={data.id} />
  //         <DeleteEmailDialog description={deleteDescription} id={data.id} />
  //       </div>

  //     )
  //   },
  // },
]


