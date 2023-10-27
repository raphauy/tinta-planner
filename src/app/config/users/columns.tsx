"use client"

import { Button } from "@/components/ui/button"
import { ColumnDef } from "@tanstack/react-table"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import { ArrowUpDown, Edit, Trash2 } from "lucide-react"
import { DataUser, createAgencyUserAction, eliminate, setClientsToUserAction, update } from "./(crud)/actions"
import { DeleteDialog } from "./(crud)/delete-dialog"
import { UserDialog } from "./(crud)/user-dialog"
import { ManageClientsDialog } from "./manage-clients-dialog"

export const columns: ColumnDef<DataUser>[] = [
  {
    accessorKey: "nombre",
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
    accessorKey: "rol",
    header: ({ column }) => {
      return (
        <Button variant="ghost" className="pl-0 dark:text-white"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Rol
          <ArrowUpDown className="w-4 h-4 ml-1" />
        </Button>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: "clientsCSV",
    header: ({ column }) => {
      return (<p>Clientes</p>)
    },
    cell: ({ row }) => {
      const data = row.original
      const userName= data.nombre ? data.nombre : data.email
      const title= "Gestionar clientes para " + userName + " (" + data.rol + ")"
      const clients= data.clients ?? []

      return (
        <div className="flex items-center justify-between w-64 gap-4">
          <div className="flex flex-col">
            {
              clients.length === 0 ? <div className="px-3 font-bold text-center text-white bg-red-800 rounded-2xl">Sin clientes</div> : 
            
              clients.map((client) => {
                return (
                  <div key={client.id}>
                    {client.name}
                  </div>
              )
            })}
          </div>
          <div>
            <ManageClientsDialog userId={data.id} setClientsToUserAction={setClientsToUserAction} title={title} />
          </div>
        </div>
      )

    },
  },
  {
    accessorKey: "verificado",
    header: ({ column }) => {
      return (
        <Button variant="ghost" className="pl-0 dark:text-white"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Verificado
          <ArrowUpDown className="w-4 h-4 ml-1" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const data = row.original
      if (!data.verificado) return <div></div> 
      return (<p>{data.verificado && format(data.verificado, "MMMM dd, yyyy", { locale: es})}</p>)
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const data= row.original

      if(!data.agencyId) return <div>User without agency</div>

      const editTrigger= (<Edit size={30} className="pr-2 hover:cursor-pointer text-sky-400"/>)
      const eliminateTrigger= (<Trash2 className="text-red-400 hover:cursor-pointer"/>)
      const title= "Eliminar Usuario"
      const description= `Desea eliminar el usuario ${data.nombre ? data.nombre : "(sin nombre)"}?`

      return (
        <div className="flex items-center justify-end gap-2">
          <UserDialog agencyId={data.agencyId} create={createAgencyUserAction} update={update} title="Editar Usuario" trigger={editTrigger} id={data.id} />
          <DeleteDialog eliminate={eliminate} title={title} description={description} trigger={eliminateTrigger} id={data.id} />
        </div>

      )
    },
  },
]
