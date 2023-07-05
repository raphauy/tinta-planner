import { getClientBySlug } from "@/app/(server-side)/services/getClients"
import getClientWines from "@/app/(server-side)/services/getWines"
import Link from "next/link"
import { FiEdit, FiTrash2 } from "react-icons/fi"
import { GrAddCircle } from "react-icons/gr"

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
    <div className="max-w-4xl p-5 mx-auto">
    <div className="p-5 bg-white border rounded-md">
      <table className="w-full">
        <thead>
          <tr className="h-12 font-medium text-left text-gray-700 align-middle bg-gray-100 border-b text-muted-foreground">
            <th className="pl-3">Nombre</th>
            <th className="">Año</th>
            <th className="">Descripción</th>
            <th className="">Winery</th>
            <th className="">Winemaker</th>
            <th className="w-[50px]"></th>
            <th className="w-[50px]"></th>
          </tr>
        </thead>
        <tbody>
        {
        wines.map((wine) => (
          <tr key={wine.id} className="h-12 px-4 font-medium text-left align-middle border-b text-muted-foreground hover:bg-slate-100">
              <td className="pl-3 text-gray-600">{wine.wine}</td>
              <td className="text-gray-600">{wine.vintage}</td>
              <td className="text-gray-600">{wine.notes}</td>
              <td className="text-gray-600">{wine.winery}</td>
              <td className="text-gray-600">{wine.winemaker}</td>
              <td><Link href={`/admin/${slug}/wines/edit?wineId=${wine.id}`}><FiEdit size={22} className="hover:cursor-pointer text-sky-400"/></Link></td>
              <td><FiTrash2 size={22} className="text-red-400 hover:cursor-pointer"/></td>
          </tr>
        ))
        }
        </tbody>
      </table>
    </div>
    <div className="flex justify-end my-5 text-lg font-semibold text-grey-800 ">
      <Link href={`/admin/${slug}/wines/add`} className="flex items-center justify-center py-1 bg-green-400 border border-green-700 rounded-md cursor-pointer w-60 hover:opacity-80 focus-visible:outline-tinta-marron focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2">
          <GrAddCircle size={22} className="mr-2"/><p>Agregar Vino</p>
      </Link>
    </div>
  </div>
)
}
