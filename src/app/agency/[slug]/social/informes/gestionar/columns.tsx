"use client"

import { Button } from "@/components/ui/button"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, ChevronsRight, Edit, Trash2 } from "lucide-react"
import Link from "next/link"
import { DataInforme, create, eliminate, update, updateDataIndicatorsAction } from "./(crud)/actions"
import { DeleteDialog } from "./(crud)/delete-dialog"
import { InformeDialog } from "./(crud)/informe-dialog"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import { IngresarDialog } from "./(crud)/ingresar-dialog"

export const columns: ColumnDef<DataInforme>[] = [
  {
    accessorKey: "name",
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
    accessorKey: "month",
    header: ({ column }) => {
      return (
        <Button variant="ghost" className="pl-0 dark:text-white"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Mes
          <ArrowUpDown className="w-4 h-4 ml-1" />
        </Button>
    )
  },
  cell: ({ row }) => {
    const data= row.original

    return (
      <p className="whitespace-nowrap">{format(data.month, "MMMM yyyy", {locale: es})}</p>
    )},
  },
  {
    accessorKey: "notasFacebook",
    header: ({ column }) => {
      return (
        <Button variant="ghost" className="pl-0 dark:text-white"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Notas
          <ArrowUpDown className="w-4 h-4 ml-1" />
        </Button>
    )
  },
  cell: ({ row }) => {
    const data= row.original

    return (
      <div className="flex flex-col gap-2">
          <div>
            <p className="text-Facebook">Facebook:</p>
            <p>{data.notasFacebook}</p>
          </div>
          <div>
            <p className="text-Instagram">Instagram:</p>
            <p>{data.notasInstagram}</p>
          </div>
          <div>
            <p className="text-Linkedin">Linkedin:</p>
            <p>{data.notasLinkedin}</p>
          </div>
      </div>
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

    const instagramIndicators= data.indicators.filter((indicator) => indicator.type==="Instagram")
    const facebookIndicators= data.indicators.filter((indicator) => indicator.type==="Facebook")
    const linkedinIndicators= data.indicators.filter((indicator) => indicator.type==="Linkedin")

    return (
      <div className="flex items-center justify-between gap-4 p-3 border rounded-md">
        <div>
          {
            data.indicators.map((indicator) => {

              let color= "text-gray-400"
              if (indicator.type === "Facebook") color= "text-Facebook"
              if (indicator.type === "Instagram") color= "text-Instagram"
              if (indicator.type === "Linkedin") color= "text-Linkedin"

              return (
                <div key={indicator.id} className="flex items-center justify-between gap-4">                
                  <p className={`whitespace-nowrap ${color}`}>{indicator.name}</p>
                  <p className="">{indicator.value}</p>
                </div>
              )})
          }
        </div>
        <div className="flex flex-col justify-end gap-4">
          <IngresarDialog title="Ingresar Datos FB" trigger={getButton("Facebook")} indicators={facebookIndicators} update={updateDataIndicatorsAction} />
          <IngresarDialog title="Ingresar Datos IG" trigger={getButton("Instagram")} indicators={instagramIndicators} update={updateDataIndicatorsAction} />
          <IngresarDialog title="Ingresar Datos Ln" trigger={getButton("Linkedin")} indicators={linkedinIndicators} update={updateDataIndicatorsAction} />
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
          <InformeDialog create={create} update={update} title="Editar Reporte" trigger={editTrigger} id={data.id} />
          <DeleteDialog eliminate={eliminate} title={title} description={description} trigger={eliminateTrigger} id={data.id} />
        </div>

      )
    },
  },
]

function getButton(type: string) {
  switch (type) {
    case "Instagram":
      return <Button variant="secondary" className="h-7 x-7 whitespace-nowrap">Ingresar Datos IG</Button>
    case "Facebook":
      return <Button variant="secondary" className="h-7 x-7 whitespace-nowrap">Ingresar Datos FB</Button>
    case "Linkedin":
      return <Button variant="secondary" className="h-7 x-7 whitespace-nowrap">Ingresar Datos Ln</Button>
    default:
      return <Button variant="secondary" className="h-7 x-7">Ingresar Datos</Button>
    
  }
}