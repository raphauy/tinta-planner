import { getEmailsDAO, getEmailsDAOByClientId, getEmailsDAOByEnvioId } from "@/services/email-services"
import { EmailDialog } from "./email-dialogs"
import { DataTable } from "./email-table"
import { columns } from "./email-columns"
import { getClientIdBySlug } from "@/app/(server-side)/services/getClients"
import { EnvioSelector, SelectorData } from "./envio-selector"
import { getEnviosDAOByClientId } from "@/services/envio-services"
import { format } from "date-fns"

type Props= {
  params: {
    slug: string
  }
  searchParams: {
    e: string
  }
}

export default async function Page({ params, searchParams }: Props) {
  const { slug }= params
  const { e }= searchParams

  const clientId= await getClientIdBySlug(slug)
  if (!clientId) return <div>Client not found</div>  
  
  const data= await getEmailsDAOByEnvioId(e)
  const envios= await getEnviosDAOByClientId(clientId)
  const selectorData: SelectorData[] = envios.map((envio) => {
    const date= envio.startedAt ? " - " + format(new Date(envio.startedAt), "dd MMM") : ""
    return {
      value: envio.id,
      label: (envio.newsletterSubject || "Sin asunto") + date
    }
  })

  return (
    <div className="w-full px-2">      

      <div className="flex justify-center w-full my-10">
        <div className="w-fit" >
          <EnvioSelector slug={slug} selectors={selectorData} />
        </div>        
      </div>

      {
        e && (
          <div className="border rounded-md text-muted-foreground dark:text-white">
            <DataTable columns={columns} data={data} subject="Email"/>      
          </div>
        )
      }
    </div>
  )
}
  
