"use client"

import { Button } from "@/components/ui/button"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, ChevronsLeft, ChevronsRight, Edit, Facebook, Instagram, Trash2 } from "lucide-react"
import { DeleteDialog } from "./(crud)/delete-dialog"
import { DataReportDefinition, create, eliminate, update } from "./(crud)/actions"
import { ReportDefinitionDialog } from "./(crud)/report-definition-dialog"
import Link from "next/link"
import * as LucideIcons from "lucide-react"
import React from "react"

export const columns: ColumnDef<DataReportDefinition>[] = [
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
    accessorKey: "indicators",
    header: ({ column }) => {
      return (
        <Button variant="ghost" className="pl-0 dark:text-white"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Indicadores
          <ArrowUpDown className="w-4 h-4 ml-1" />
        </Button>
    )
  },
  cell: ({ row }) => {
    const data= row.original

    return (
      <div className="flex justify-between gap-4 p-3 border rounded-md">
        <div>
          {
            data.indicators.map((indicator) => {

              let color= "text-gray-400"
              if (indicator.type === "Facebook") color= "text-[#3b5998]"
              if (indicator.type === "Instagram") color= "text-[#e1306c]"
              if (indicator.type === "Linkedin") color= "text-[#0077b5]"

              return (
                <div key={indicator.id} className="flex items-center justify-between gap-2">                
                  <p className={`whitespace-nowrap ${color}`}>{indicator.name}</p>
                  <div className="flex items-center">
                    <Link href={`/config/reports?action=remove&reportId=${data.id}&indicatorId=${indicator.id}`} prefetch={false}>
                      <Button variant="secondary" className="h-7 x-7"><ChevronsRight /></Button>
                    </Link>
                  </div>
                </div>
              )})
          }
        </div>
        <div>
          {
            data.complementIndicators.map((indicator) => {
              let color= "text-gray-400"
              if (indicator.type === "Facebook") color= "text-[#3b5998]"
              if (indicator.type === "Instagram") color= "text-[#e1306c]"
              if (indicator.type === "Linkedin") color= "text-[#0077b5]"

              return (
                <div key={indicator.id} className="flex items-center gap-2">
                  <div className="flex items-center">
                    <Link href={`/config/reports?action=add&reportId=${data.id}&indicatorId=${indicator.id}`} prefetch={false}>
                      <Button variant="secondary" className="h-7 x-7"><ChevronsLeft /></Button>
                    </Link>
                  </div>
                  <p className={`whitespace-nowrap ${color}`}>{indicator.name}</p>
                </div>
            )})
          }            
        </div>        
      </div>
    )
  },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const data= row.original     

      const editTrigger= (<Edit size={30} className="pr-2 hover:cursor-pointer text-sky-400"/>)
      const eliminateTrigger= (<Trash2 className="text-red-400 hover:cursor-pointer"/>)
      const title= "Eliminar Reporte"
      const description= `Desea eliminar el reporte ${data.name}?`
 
      return (
        <div className="flex items-center justify-end gap-2">
          <ReportDefinitionDialog create={create} update={update} title="Editar Reporte" trigger={editTrigger} id={data.id} />
          <DeleteDialog eliminate={eliminate} title={title} description={description} trigger={eliminateTrigger} id={data.id} />
        </div>

      )
    },
  },
]
