import { getClientBySlug } from "@/app/(server-side)/services/getClients"
import Link from "next/link"
import { GrAddCircle } from "react-icons/gr"

import { columns } from "./columns"
import { DataTable } from "./data-table"
import getClientWines from "@/services/wineService"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
 
interface Props{
  params: {
    slug: string
  },
}

export default async function WinesPage({ params }: Props) {
  const slug= params.slug
  const client= await getClientBySlug(slug)
  if (!client) return <div>Client not found</div>
  
  const wines= await getClientWines(client.id)
  const wineNames= Array.from(new Set(wines.map(wine => wine.wine)))
  const regions= Array.from(new Set(wines.map(wine => wine.region)))
  const vintages= Array.from(new Set(wines.map(wine => wine.vintage)))

  return (
    <div className="w-full px-2">      

      <div className="flex justify-end my-2 text-lg font-semibold text-grey-800">
        <Link href={`/agency/${slug}/social/wines/add`} >
          <Button><PlusCircle size={22} className="mr-2"/>Agregar</Button>
        </Link>
      </div>

      <div className="container p-3 py-4 mx-auto bg-white border rounded-md">
        <DataTable columns={columns} data={wines} wineNames={wineNames} regions={regions} vintages={vintages} />      
      </div>
    </div>
)
}
