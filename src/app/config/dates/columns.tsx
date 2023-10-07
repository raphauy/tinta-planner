"use client"

import { Button } from "@/components/ui/button"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, Edit, Trash2 } from "lucide-react"
import { DataFechaImportante, eliminate } from "./(crud)/actions"

import { format } from "date-fns"
import es from "date-fns/locale/es"
import { DeleteDialog } from "./(crud)/delete-dialog"
import Link from "next/link"

export const columns: ColumnDef<DataFechaImportante>[] = [
  {
    accessorKey: "titulo",
    header: ({ column }) => {
        return (
          <Button variant="ghost" className="pl-0 dark:text-white"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
            Título
            <ArrowUpDown className="w-4 h-4 ml-1" />
          </Button>
    )
    },
  },
  {
    accessorKey: "fecha",
    header: ({ column }) => {
        return (
          <Button variant="ghost" className="pl-0 dark:text-white"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
            Fecha
            <ArrowUpDown className="w-4 h-4 ml-1" />
          </Button>
    )
    },
    cell: ({ row }) => {
      const data= row.original     
 
      return (
        <div>{format(data.fecha, "PPP", {locale: es})}</div>
        
      )
      
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const data= row.original     

      const eliminateTrigger= (<Trash2 className="text-red-400 hover:cursor-pointer"/>)
      const title= "Eliminar Fecha Importante"
      const description= `Desea eliminar el indicador ${data.titulo}?`
      console.log("slug: ", data.slug)
      
      const href= data.slug ? `/agency/${data.slug}/social/dates/add?id=${data.id}` : `/config/dates/add?id=${data.id}`
 
      return (
        <div className="flex items-center justify-end gap-2">
          <Link href={href}>
            <Button variant="ghost">
              <Edit size={30} className="pr-2 hover:cursor-pointer text-sky-400"/>
            </Button>
          </Link>

          <DeleteDialog eliminate={eliminate} title={title} description={description} trigger={eliminateTrigger} id={data.id} />
        </div>

      )
    },
  },
]
