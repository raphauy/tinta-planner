
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import { create, update } from "./(crud)/actions"
import { columns } from "./columns"
import { DataTable } from "./data-table"
import { getInformesOfClient } from "@/services/informeService"
import { InformeDialog } from "./(crud)/informe-dialog"
import { getClientBySlug } from "@/app/(server-side)/services/getClients"
import Link from "next/link"
import { AiFillTool } from "react-icons/ai"

interface Props{
  params: {
    slug: string
  },
}

export default async function ListaPage({ params }: Props) {

  const slug= params.slug
  const client= await getClientBySlug(slug)
  if (!client) return <div>Client not found</div>

  if (client.reportDefinitionId === null) 
    return (
      <div className="flex flex-col items-center gap-4 mt-10">
        <p>El cliente no tiene un reporte configurado</p>
        <Link href={`/agency/${slug}/social/config`} className="self-center">
                <Button><AiFillTool size={22} className="mr-2" />Configurar</Button>              
        </Link>
      </div>
    )

  const data= await getInformesOfClient(client.id)

  const addTrigger= (<Button><PlusCircle size={22} className="mr-2"/>Agregar</Button>)

  return (
    <div className="w-full px-2">      

      <div className="flex justify-end mx-auto my-2">
        <InformeDialog create={create} update={update} title="Agregar Reporte" trigger={addTrigger}/>
      </div>

      <div className="p-3 mx-auto bg-white border rounded-md text-muted-foreground dark:text-white">
        <DataTable columns={columns} data={data} columnsOff={["month"]} />      
      </div>
    </div>
)
}
