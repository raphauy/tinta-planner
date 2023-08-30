"use client"

import { Button } from "@/components/ui/button"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, Edit, Trash2 } from "lucide-react"
import { DataService, create, eliminate, update } from "./(crud)/actions"
import { DeleteDialog } from "./(crud)/delete-dialog"
import { ServiceDialog } from "./(crud)/main-dialog"

export const columns: ColumnDef<DataService>[] = [
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
    accessorKey: "price",
    header: ({ column }) => {
      return (
        <Button variant="ghost" className="pl-0 dark:text-white"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Precio
          <ArrowUpDown className="w-4 h-4 ml-1" />
        </Button>
    )
  },
    cell: ({ row }) => {
      const data= row.original

      return (
        <p className="">
          {/** format float with point instead of comma, like: 35.000 for 35 thousands */}
            { data.price && data.price.toLocaleString('es-ES', { minimumFractionDigits: 0 }) } USD
        </p>
      )
    },
  },
  {
    accessorKey: "emoji",
    header: ({ column }) => {
      return (<></>)
  },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const data= row.original     

      const editTrigger= (<Edit size={30} className="pr-2 hover:cursor-pointer text-sky-400"/>)
      const eliminateTrigger= (<Trash2 className="text-red-400 hover:cursor-pointer"/>)
      const title= "Eliminar Servicio"
      const description= `Desea eliminar el servicio ${data.name}?`
 
      return (
        <div className="flex items-center justify-end gap-2">
          <ServiceDialog create={create} update={update} title="Editar Servicio" trigger={editTrigger} id={data.id} />
          <DeleteDialog eliminate={eliminate} title={title} description={description} trigger={eliminateTrigger} id={data.id} />
        </div>

      )
    },
  },
]
