"use client"

import { Button } from "@/components/ui/button"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, Edit, Trash2 } from "lucide-react"
import { DataPilar, create, eliminate, update } from "./(crud)/actions"
import { DeleteDialog } from "./(crud)/delete-dialog"
import { PilarDialog } from "./(crud)/pilar-dialog"

export const columns: ColumnDef<DataPilar>[] = [
  {
    accessorKey: "color",
    header: ({ column }) => {
      return (<></>)
    },
    cell: ({ row }) => {
      const data= row.original

      return (
        <div className="flex justify-center">
          <p className="w-4 h-4 rounded-full" style={{ backgroundColor: data.color }}>
            &nbsp;
          </p>
        </div>

      )
    },
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
        return (
          <Button variant="ghost" className="pl-0 dark:text-white"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
            Nombre
            <ArrowUpDown className="w-4 h-4 ml-1" />
          </Button>
    )
    },
  },
  {
    accessorKey: "description",
    header: ({ column }) => {
      return (
        <Button variant="ghost" className="pl-0 dark:text-white"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Descripción
          <ArrowUpDown className="w-4 h-4 ml-1" />
        </Button>
    )
  },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const data= row.original     

      const editTrigger= (<Edit size={30} className="pr-2 hover:cursor-pointer text-sky-400"/>)
      const eliminateTrigger= (<Trash2 className="text-red-400 hover:cursor-pointer"/>)
      const title= "Eliminar Pilar de contenido"
      const description= `Desea eliminar el pilar ${data.name}?`
 
      return (
        <div className="flex items-center justify-end gap-2">
          <PilarDialog create={create} update={update} title="Editar Pilar" trigger={editTrigger} id={data.id} />
          <DeleteDialog eliminate={eliminate} title={title} description={description} trigger={eliminateTrigger} id={data.id} />
        </div>

      )
    },
  },
]
