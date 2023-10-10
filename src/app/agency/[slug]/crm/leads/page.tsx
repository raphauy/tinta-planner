
import { getClientBySlug } from "@/app/(server-side)/services/getClients"
import { Button } from "@/components/ui/button"
import getClientLeads from "@/services/leadService"
import { PlusCircle } from "lucide-react"
import { create, update } from "./(crud)/actions"
import { LeadDialog } from "./(crud)/main-dialog"
import { columns } from "./columns"
import { DataTable } from "./data-table"
 
interface Props{
  params: {
    slug: string
  },
}

export default async function LeadsPage({ params }: Props) {

  const slug= params.slug
  const client= await getClientBySlug(slug)
  if (!client) return <div>Client not found</div>
  
  const leads= await getClientLeads(client.id)
  const services= leads.map(lead => lead.serviceName)
  const uniqueServices= Array.from(new Set(services))

  const addTrigger= (<Button><PlusCircle size={22} className="mr-2"/>Agregar</Button>)

  return (
    <div className="w-full px-2">      

      <div className="flex justify-end mx-auto my-2">
        <LeadDialog create={create} update={update} clientId={client.id} title="Agregar Servicio" trigger={addTrigger}/>
      </div>

      <div className="p-3 mx-auto bg-white border rounded-md text-muted-foreground dark:text-white">
        <DataTable title="Lead" columns={columns} data={leads} services={uniqueServices} columnsOff={["contactEmail", "contactPhone", "status", "type", "serviceName"]}/>      
      </div>
    </div>
)
}
