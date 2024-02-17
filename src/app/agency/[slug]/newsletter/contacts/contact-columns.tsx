"use client"

import { Button } from "@/components/ui/button"
import { ContactDAO } from "@/services/contact-services"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"
import { format } from "date-fns"
import { DeleteContactDialog, ContactDialog } from "./contact-dialogs"
import { cn } from "@/lib/utils"


export const columns: ColumnDef<ContactDAO>[] = [
  
  {
    accessorKey: "name",
    header: ({ column }) => {
        return (
          <Button variant="ghost" className="pl-0 dark:text-white"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
            Name
            <ArrowUpDown className="w-4 h-4 ml-1" />
          </Button>
    )},
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
    )},
  },
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
      const data= row.original
      return (
        <span className={cn(data.status === "subscribed" && "text-green-600", data.status === "unsubscribed" && "text-red-600")}>
          {data.status}
        </span>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const data= row.original

      const deleteDescription= `Do you want to delete Contact ${data.name}?`
 
      return (
        <div className="flex items-center justify-end gap-2">

          <ContactDialog id={data.id} />
          <DeleteContactDialog description={deleteDescription} id={data.id} />
        </div>

      )
    },
  },
]


