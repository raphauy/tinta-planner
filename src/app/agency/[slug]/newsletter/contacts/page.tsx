import { getClientIdBySlug } from "@/app/(server-side)/services/getClients"
import { getContactsDAOByClientId } from "@/services/contact-services"
import { columns } from "./contact-columns"
import { ContactDialog } from "./contact-dialogs"
import { DataTable } from "./contact-table"
import { Button } from "@/components/ui/button"
import { Upload } from "lucide-react"
import UploadContacts from "./upload-contaxts"

type Props= {
  params: {
    slug: string
  }
}
export default async function Page({ params }: Props) {
  const { slug }= params
  const clientId= await getClientIdBySlug(slug)
  if (!clientId) return <div>Client not found</div>  

  const data= await getContactsDAOByClientId(clientId)

  return (
    <div className="w-full max-w-5xl px-5">      

      <div className="flex justify-end gap-2 my-5">
        <ContactDialog clientId={clientId} />
        <UploadContacts clientId={clientId} />
      </div>

      <div className="container p-3 py-4 mx-auto border rounded-md text-muted-foreground dark:text-white">
        <DataTable columns={columns} data={data} subject="Contact"/>      
      </div>
    </div>
  )
}
  
