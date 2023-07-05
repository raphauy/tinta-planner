"use client"

import { ColumnDef } from "@tanstack/react-table"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"
import Link from "next/link"
import { Edit } from "lucide-react"
import { FiTrash2 } from "react-icons/fi"

export type Wine = {
  id: string
  winery: string
  wine: string
  winemaker: string | null
  region: string
  vintage: string
  grapes: string
  style: string | null
  notes: string | null
  clientId: number
}

export const columns: ColumnDef<Wine>[] = [
  {
    accessorKey: "winery",
    header: ({ column }) => {
        return (
          <Button variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
            Winery
            <ArrowUpDown className="w-4 h-4 ml-1" />
          </Button>
        )
    },
  },
  {
    accessorKey: "wine",
    header: ({ column }) => {
      return (
        <Button variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Wine
          <ArrowUpDown className="w-4 h-4 ml-1" />
        </Button>
      )
    },
  },
  {
    accessorKey: "winemaker",
    header: ({ column }) => {
      return (
        <Button variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Winemaker
          <ArrowUpDown className="w-4 h-4 ml-1" />
        </Button>
      )
    },
  },
  {
    accessorKey: "region",
    header: ({ column }) => {
      return (
        <Button variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Region
          <ArrowUpDown className="w-4 h-4 ml-1" />
        </Button>
      )
    },
  },
  {
    accessorKey: "vintage",
    header: ({ column }) => {
      return (
        <Button variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Vintage
          <ArrowUpDown className="w-4 h-4 ml-1" />
        </Button>
      )
    },
  },
  {
    accessorKey: "grapes",
    header: ({ column }) => {
      return (
        <Button variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Grapes
          <ArrowUpDown className="w-4 h-4 ml-1" />
        </Button>
      )
    },
  },
  {
    accessorKey: "style",
    header: ({ column }) => {
      return (
        <Button variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Style
          <ArrowUpDown className="w-4 h-4 ml-1" />
        </Button>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    }
  },
  {
    accessorKey: "notes",
    header: ({ column }) => {
      return (
        <Button variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Notas
          <ArrowUpDown className="w-4 h-4 ml-1" />
        </Button>
      )
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const wine = row.original     
 
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="w-8 h-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
                <Link href={`/admin/${wine.clientId}/wines/edit?wineId=${wine.id}`} className="flex items-center">
                    <Edit size={22} className="pr-2 hover:cursor-pointer text-sky-400"/>Editar
                </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
                <Link href={`/admin/${wine.clientId}/wines/delete?wineId=${wine.id}`} className="flex items-center">
                    <FiTrash2 size={22} className="text-red-400 hover:cursor-pointer"/>Eliminar
                </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
