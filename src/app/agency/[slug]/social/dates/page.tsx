
import { getClientBySlug } from "@/app/(server-side)/services/getClients"
import { getClientFechaImportantesBySlug } from "@/app/config/dates/(crud)/actions"
import { columns } from "@/app/config/dates/columns"
import { DataTable } from "@/app/config/dates/data-table"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import Link from "next/link"
 
interface Props{
  params: {
    slug: string
  },
}

export default async function FechaImportantesPage({ params }: Props) {

  const slug= params.slug
  const client= await getClientBySlug(slug)
  if (!client) return <div>Client not found</div>

  const data= await getClientFechaImportantesBySlug(slug)

  return (
    <div className="w-full px-2">
      <div>
        <p className="mt-3 text-2xl font-bold text-center text-muted-foreground">Fechas Importantes de {client.name}</p>
      </div>
      <div className="flex justify-end mx-auto my-2">
        <Link href={`/agency/${slug}/social/dates/add`}><Button><PlusCircle size={22} className="mr-2"/>Agregar</Button></Link>
      </div>

      <div className="p-3 mx-auto bg-white border rounded-md text-muted-foreground dark:text-white">
        <DataTable columns={columns} data={data} />      
      </div>

    </div>
)
}
