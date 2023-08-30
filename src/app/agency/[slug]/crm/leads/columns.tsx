"use client"

import { Button } from "@/components/ui/button"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, Edit, Globe, Instagram, Linkedin, Trash2, Twitter } from "lucide-react"
import { DataLead, create, eliminate, update } from "./(crud)/actions"
import { DeleteDialog } from "./(crud)/delete-dialog"
import { LeadDialog } from "./(crud)/main-dialog"
import Link from "next/link"

export const columns: ColumnDef<DataLead>[] = [
  {
    accessorKey: "company",
    header: ({ column }) => {
        return (
          <Button variant="ghost" className="pl-0 dark:text-white"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
            Compañía
            <ArrowUpDown className="w-4 h-4 ml-1" />
          </Button>
      )
    },
    cell: ({ row }) => {
      const data= row.original

      return (
        <div className="flex flex-col gap-5">
          <div>
            <p className="text-base font-bold whitespace-nowrap">{ data.company }</p>
          </div>
          <div className="flex items-center gap-2">
            { data.website !== "" ?
              <Link href={data.website} target="_blank"><Globe size={17} className="text-green-400" /></Link> :
              <Globe size={17} />
            }
            { data.linkedin !== "" ?
              <Link href={"https://www.linkedin.com/in/" + data.linkedin} target="_blank"><Linkedin size={17} className="text-blue-400" /></Link> :
              <Linkedin size={17} />
            }
            { data.instagram !== "" ?
              <Link href={"https://www.instagram.com/" + data.instagram} target="_blank"><Instagram size={17} className="text-pink-400" /></Link> :
              <Instagram size={17} />
            }
            { data.twitter !== "" ?
              <Link href={"https://twitter.com/" + data.twitter} target="_blank"><Twitter size={17} className="text-blue-400" /></Link> :
              <Twitter size={17} />
            }
            
          </div>

            
        </div>
      )
    },
  },
  {
    accessorKey: "serviceName",
    header: ({ column }) => {
      return (
        <Button variant="ghost" className="pl-0 dark:text-white"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Servicio
          <ArrowUpDown className="w-4 h-4 ml-1" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const data= row.original

      return (
        <div className="flex items-center gap-2">
            <p>{ data.serviceEmoji }</p>
            <p>{ data.serviceName }</p>
        </div>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: "value",
    header: ({ column }) => {
      return (
        <Button variant="ghost" className="pl-0 dark:text-white"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Valor
          <ArrowUpDown className="w-4 h-4 ml-1" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const data= row.original

      return (
        <p className="">
            { data.value && data.value !== 0 ? (data.value.toLocaleString('es-ES', { minimumFractionDigits: 0 } ) + " USD") : ""}
        </p>
      )
    },
  },
  {
    accessorKey: "contactName",
    header: ({ column }) => {
      return (
        <Button variant="ghost" className="pl-0 dark:text-white"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Nombre Contacto
          <ArrowUpDown className="w-4 h-4 ml-1" />
        </Button>
      )
    },
  },
  {
    accessorKey: "contactEmail",
    header: ({ column }) => {
      return (
        <Button variant="ghost" className="pl-0 dark:text-white"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Email Contacto
          <ArrowUpDown className="w-4 h-4 ml-1" />
        </Button>
      )
    },
  },
  {
    accessorKey: "contactPhone",
    header: ({ column }) => {
      return (
        <Button variant="ghost" className="pl-0 dark:text-white"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Teléfono Contacto
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
      const title= "Eliminar Lead"
      const description= `Desea eliminar el lead ${data.company}?`
 
      return (
        <div className="flex items-center justify-end gap-2">
          <LeadDialog create={create} update={update} clientId={data.clientId} title="Editar Servicio" trigger={editTrigger} id={data.id} />
          <DeleteDialog eliminate={eliminate} title={title} description={description} trigger={eliminateTrigger} id={data.id} />
        </div>

      )
    },
  },
]
