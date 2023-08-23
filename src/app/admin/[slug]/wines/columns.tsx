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
import { DataWine } from "@/app/types/Wine"
import { AdvancedImage } from "@cloudinary/react"
import { CloudinaryImage } from "@cloudinary/url-gen"
import { fill } from "@cloudinary/url-gen/actions/resize"
import { AiOutlineDownload } from "react-icons/ai"
import slugify from "slugify"


export const columns: ColumnDef<DataWine>[] = [
  {
    accessorKey: "image",
    header: ({ column }) => {
      return <></>
    },
    cell: ({ row }) => {
      const wine = row.original     
      const url= wine.image
      if (!url) return null
      const short= url.split("/").slice(-2).join("/")
      const image = new CloudinaryImage(short, {cloudName: 'dtm41dmrz'}).resize(fill().width(80))
      return (        
        <div className="flex justify-center w-14">
          <button
            onClick={() => {
              const link = document.createElement('a');
              link.href = `https://res.cloudinary.com/dtm41dmrz/image/upload/fl_attachment:${slugify(wine.wine+"_"+wine.vintage, { lower: true })}/${short}`;
              link.click();
            }}
          >
            <AdvancedImage cldImg={image} />
          </button>

        </div>
        
      )
    }
  },
  {
    accessorKey: "winery",
    header: ({ column }) => {
        return (
          <Button variant="ghost" className="pl-0">
            Vino
          </Button>
        )
    },
    cell: ({ row }) => {
      const wine = row.original     
      return (
        <Link href={`/admin/${wine.clientSlug}/wines/edit?wineId=${wine.id}`} className="flex items-center">
          <div className="flex flex-col gap-6 w-44">
            <div>
              <p className="font-bold">{wine.winery}</p>
            </div>
            <div className="flex-1">
              <p className="text-sm">{wine.wine}</p>
              <p className="text-sm">{wine.vintage}</p>            
              {wine.alcohol ? 
                <p className="text-sm">{wine.alcohol}% alc.</p> :
                ""
              }
              {wine.price ? 
                <p className="text-sm">Precio: {wine.price} UYU</p> :
                ""
              }
            </div>
            <div>
              <p className="mb-1 text-sm">{wine.winemaker}</p>            
              <p className="text-sm">Región: {wine.region}</p>
            </div>
          </div>
        </Link>

      )
    }
  },
  {
    accessorKey: "wine",
    header: ({ column }) => {
      return (
        <Button variant="ghost" className="pl-0"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Vino
          <ArrowUpDown className="w-4 h-4 ml-1" />
        </Button>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    }
  },
  {
    accessorKey: "winemaker",
    header: ({ column }) => {
      return (
        <Button variant="ghost" className="pl-0"
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
        <Button variant="ghost" className="pl-0"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Region
          <ArrowUpDown className="w-4 h-4 ml-1" />
        </Button>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    }
  },
  {
    accessorKey: "vintage",
    header: ({ column }) => {
      return (
        <Button variant="ghost" className="pl-0"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Añada
          <ArrowUpDown className="w-4 h-4 ml-1" />
        </Button>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    }
  },
  {
    accessorKey: "grapes",
    header: ({ column }) => {
      return (
        <Button variant="ghost" className="pl-0"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Cepas
          <ArrowUpDown className="w-4 h-4 ml-1" />
        </Button>
      )
    },
  },
  {
    accessorKey: "style",
    header: ({ column }) => {
      return (
        <Button variant="ghost" className="pl-0"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Estilo
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
        <Button variant="ghost" className="pl-0"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Notas
          <ArrowUpDown className="w-4 h-4 ml-1" />
        </Button>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    }
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
                <Link href={`/admin/${wine.clientSlug}/wines/edit?wineId=${wine.id}`} className="flex items-center">
                    <Edit size={23} className="pr-2 hover:cursor-pointer text-sky-400"/>Editar
                </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
                <Link href={`/admin/${wine.clientSlug}/wines/delete?wineId=${wine.id}`} className="flex items-center">
                    <FiTrash2 size={22} className="pr-2 text-red-400 hover:cursor-pointer"/>Eliminar
                </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
