"use client"

import { Button } from "@/components/ui/button"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, CheckCircle, Edit, Import, Trash2 } from "lucide-react"
import { DeleteDialog } from "./(crud)/delete-dialog"
import { DataWset, eliminate, importAction } from "./(crud)/actions"
import Link from "next/link"
import { ImportDialog } from "./(crud)/import-dialog"

export const columns: ColumnDef<DataWset>[] = [
  {
    accessorKey: "institute",
    header: ({ column }) => {
        return (
          <Button variant="ghost" className="pl-0 dark:text-white"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
            Institute
            <ArrowUpDown className="w-4 h-4 ml-1" />
          </Button>
      )
    },
  },
  {
    accessorKey: "location",
    header: ({ column }) => {
      return (
        <Button variant="ghost" className="pl-0 dark:text-white"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Location
          <ArrowUpDown className="w-4 h-4 ml-1" />
        </Button>
    )
  },
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <Button variant="ghost" className="pl-0 dark:text-white"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Email
          <ArrowUpDown className="w-4 h-4 ml-1" />
        </Button>
      )
    },
  },
  {
    accessorKey: "phone",
    header: ({ column }) => {
      return (
        <Button variant="ghost" className="pl-0 dark:text-white"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Phone
          <ArrowUpDown className="w-4 h-4 ml-1" />
        </Button>
      )
    },
  },
  {
    accessorKey: "website",
    header: ({ column }) => {
      return (
        <Button variant="ghost" className="pl-0 dark:text-white"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Website
          <ArrowUpDown className="w-4 h-4 ml-1" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const data= row.original

      return (
        <Link href={data.website} target="_blank" >{ data.website }</Link>
      )
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const data= row.original     

      const eliminateTrigger= (<Trash2 className="text-red-400 hover:cursor-pointer"/>)
      const title= "Eliminar Wset Institute"
      const description= `Desea eliminar el wset Institute: ${data.institute}?`

      const importTrigger= (<Import className="mt-1 text-orange-400 hover:cursor-pointer"/>)
      const importTitle= "Importar Wset Institute"
      const importDescription= `Desea importar el wset Institute: ${data.institute}?`

      return (
        <div className="flex items-center justify-end gap-3">
          { data.imported && (<CheckCircle  className="text-green-400 "/>) }
          <ImportDialog importWset={importAction} title={importTitle} description={importDescription} trigger={importTrigger} id={data.id} />
          <DeleteDialog eliminate={eliminate} title={title} description={description} trigger={eliminateTrigger} id={data.id} />
        </div>

      )
    },
  },
]
