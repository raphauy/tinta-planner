import { getClientIdBySlug } from "@/app/(server-side)/services/getClients"
import { getEnviosDAOByClientId } from "@/services/envio-services"
import { columns } from "./envio-columns"
import { EnvioDialog } from "./envio-dialogs"
import { DataTable } from "./envio-table"

export const maxDuration = 299

type Props= {
  params: {
    slug: string
  }
}

export default async function Page({ params }: Props) {
  const { slug }= params
  const clientId= await getClientIdBySlug(slug)
  if (!clientId) return <div>Client not found</div>  

  const data= await getEnviosDAOByClientId(clientId)

  return (
    <div className="w-full px-2">      

      <div className="flex justify-end my-2">
        <EnvioDialog clientId={clientId} />
      </div>

      <div className="border rounded-md text-muted-foreground dark:text-white">
        <DataTable columns={columns} data={data} subject="Envio" />
      </div>
    </div>
  )
}
  
