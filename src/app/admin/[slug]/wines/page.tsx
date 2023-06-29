import { getClientBySlug } from "@/app/(server-side)/services/getClients"
import getClientWines from "@/app/(server-side)/services/getWines"
import Link from "next/link"
import { GrAddCircle } from "react-icons/gr"

import { columns } from "./columns"
import { DataTable } from "./data-table"
 
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

  return (
    <div className="w-full p-5">      

      <div className="flex justify-end my-5 text-lg font-semibold text-grey-800">
        <Link href={`/admin/${slug}/wines/add`} className="flex items-center justify-center py-1 bg-green-400 border border-green-700 rounded-md cursor-pointer w-60 hover:opacity-80 focus-visible:outline-tinta-marron focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2">
            <GrAddCircle size={22} className="mr-2"/><p>Agregar Vino</p>
        </Link>
      </div>

      <div className="container p-3 py-10 mx-auto bg-white border rounded-md">
        <DataTable columns={columns} data={wines} />      
      </div>
    </div>
)
}
