"use client"

import { PostStatusSelector, getNode } from "@/app/agency/[slug]/social/posts/post-status-selector"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { PostDAO } from "@/services/post-services"
import { ColumnDef } from "@tanstack/react-table"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import { ArrowUpDown } from "lucide-react"
import Image from "next/image"
import Link from "next/link"


export const columns: ColumnDef<PostDAO>[] = [

  {
    accessorKey: "title",
    header: ({ column }) => {
        return (
          <Button variant="ghost" className="pl-0 dark:text-white"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
            Título
            <ArrowUpDown className="w-4 h-4 ml-1" />
          </Button>
    )
    },
    cell: ({ row }) => {
      const data = row.original
      const formattedDate= data.date ? format(data.date, "dd 'de' MMMM, yyyy", { locale: es }) : ""
      const src= data.image ? data.image.split(",")[0] : "/images/Image-placeholder.svg"

      return (
        <div className="flex gap-2"> 
          <div className="min-w-[100px]">
            <Link href={`/agency/${data.clientSlug}/social/posts?id=${data.id}`}
              prefetch={false}
              target="_blank"
            >
              <Image src={src} alt={data.clientName || "post"} width={100} height={100}             
                className="rounded-md"
              />
            </Link>
          </div>
          
          <div className="flex flex-col justify-between flex-grow"> 
            <div className="flex flex-col gap-1">
              <div className="flex justify-between">
                <p className="text-base font-bold">{data.title}</p>
                <p className="text-xs text-gray-500">{formattedDate}</p>
              </div>
              <p className="text-xs text-gray-500">{data.copy}</p>
            </div>

            <div className="flex items-center justify-between">
              <div 
                className="px-2 font-bold text-gray-700 border rounded-md w-fit"
                style={{ backgroundColor: data.pilarColor || "#000000"}}
              >
                {data.pilarName}
              </div>
              <div>
                {/* {getNode(data.status)} */}
                <PostStatusSelector id={data.id} status={data.status}/>
              </div>
            </div>
          </div>
        </div>
      )
    }
  },
  {
    accessorKey: "copy",
  },
  {
    accessorKey: "pilarName",
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: "status",
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },

]



