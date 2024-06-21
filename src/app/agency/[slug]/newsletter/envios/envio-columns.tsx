"use client"

import { Button } from "@/components/ui/button"
import { EnvioDAO } from "@/services/envio-services"
import { ColumnDef } from "@tanstack/react-table"
import { formatDistanceToNow } from "date-fns"
import { es } from "date-fns/locale"
import { ArrowUpDown, CheckCircle2 } from "lucide-react"
import Link from "next/link"
import { DeleteEnvioDialog, EnvioDialog, SendToAllDialog, TestEnvioDialog } from "./envio-dialogs"


export const columns: ColumnDef<EnvioDAO>[] = [
  
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
        <div className="flex items-center w-10 gap-2">
          {data.status === "sent" && <CheckCircle2 className="w-6 h-6 text-green-500" />}
          {data.status === "draft" && 
            <div className="flex items-center gap-1">
              <p className="font-bold text-orange-500">draft</p>
            </div>
          }
          {data.status === "pending" &&
            <p className="font-bold text-orange-500">pending</p>
          }
          {data.status === "sending" && 
            <p className="font-bold text-green-500">sending</p>
          }
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },

  {
    accessorKey: "newsletterSubject",
    header: ({ column }) => {
        return (
          <Button variant="ghost" className="pl-0 dark:text-white"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
            Subject
            <ArrowUpDown className="w-4 h-4 ml-1" />
          </Button>
    )},
  },

  {
    accessorKey: "startedAt",
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
      if (!data.startedAt) return null
      
      const dateStr= formatDistanceToNow(data.startedAt, {
        addSuffix: false,
        locale: es,
      })
      return (<p className="w-20">{dateStr}</p>)
    }
  },

  {
    accessorKey: "sentByName",
    header: ({ column }) => {
        return (
          <Button variant="ghost" className="pl-0 dark:text-white"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
            Sent by
            <ArrowUpDown className="w-4 h-4 ml-1" />
          </Button>
    )},
  },

  {
    accessorKey: "emailFrom",
    header: ({ column }) => {
        return (
          <Button variant="ghost" className="pl-0 dark:text-white"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
            From
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
  {
    id: "actions",
    cell: ({ row }) => {
      const data= row.original

      const deleteDescription= `Do you want to delete Envio ${data.id}?`
      const sendToAllDescription= `Quieres enviar el Newsletter a los ${data.emailsCount} contactos?`
      const message= data.status === "draft" ? "Enviar" : data.status === "sending" ? "Enviando emails" : "Envío exitoso"
 
      return (
        <div className="flex items-center justify-end gap-2">
          <TestEnvioDialog envioId={data.id} />
          {
            data.status === "draft" ?
            <SendToAllDialog envioId={data.id} description={sendToAllDescription} /> :
            <Link href={`/agency/${data.clientSlug}/newsletter/emails?e=${data.id}`}>
              <Button variant="outline" className="whitespace-nowrap">
                Ver Emails
              </Button>
            </Link>
          }
          <EnvioDialog id={data.id} clientId={data.clientId} />
          <DeleteEnvioDialog description={deleteDescription} id={data.id} />
        </div>

      )
    },
  },
]


