"use client"

import { Button } from "@/components/ui/button"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, Edit, Trash2 } from "lucide-react"
import { DeleteDialog } from "./(crud)/delete-dialog"
import { DataIndicator, create, eliminate, update } from "./(crud)/actions"
import { IndicatorDialog } from "./(crud)/indicator-dialog"

import * as LucideIcons from "lucide-react"
import React from "react"

export const columns: ColumnDef<DataIndicator>[] = [
  {
    accessorKey: "order",
    header: ({ column }) => {
        return (
          <Button variant="ghost" className="pl-0 dark:text-white"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
            Orden
            <ArrowUpDown className="w-4 h-4 ml-1" />
          </Button>
    )
    },
  },
  {
    accessorKey: "icon",
    header: ({ column }) => {
      return (
        <div></div>
    )},
  cell: ({ row }) => {
      const data= row.original     

      // @ts-ignore
      const iconComponent= LucideIcons[data.icon]
 
      return (
        <div className="w-1">{React.createElement(iconComponent)}</div>
        
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
    accessorKey: "type",
    header: ({ column }) => {
      return (
        <Button variant="ghost" className="pl-0 dark:text-white"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Tipo
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
      const title= "Eliminar Indicador"
      const description= `Desea eliminar el indicador ${data.name}?`
 
      return (
        <div className="flex items-center justify-end gap-2">
          <IndicatorDialog create={create} update={update} title="Editar Indicador" trigger={editTrigger} id={data.id} />
          <DeleteDialog eliminate={eliminate} title={title} description={description} trigger={eliminateTrigger} id={data.id} />
        </div>

      )
    },
  },
]
