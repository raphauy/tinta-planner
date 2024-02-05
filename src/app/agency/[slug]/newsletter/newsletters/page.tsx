import { getNewslettersDAO, getNewslettersDAOByClientId } from "@/services/newsletter-services"
import { DataTable } from "./newsletter-table"
import { columns } from "./newsletter-columns"
import { getClientIdBySlug } from "@/app/(server-side)/services/getClients"
import { Button } from "@/components/ui/button"
import { AddNewsletterDialog } from "./newsletter-dialogs"

type Props= {
  params: {
    slug: string
  }
}

export default async function Page({ params }: Props) {
  const { slug }= params
  const clientId= await getClientIdBySlug(slug)
  if (!clientId) return <div>Client not found</div>  

  const data= await getNewslettersDAOByClientId(clientId)

  return (
    <div className="w-full px-2">      

      <div className="flex justify-end mx-auto my-2">
        <AddNewsletterDialog clientId={clientId} />
      </div>

      <div className="border rounded-md text-muted-foreground">
        <DataTable columns={columns} data={data} subject="Newsletter"/>      
      </div>
    </div>
  )
}
  
