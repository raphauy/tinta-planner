
import { getClientOfCurrenUser } from "@/app/(server-side)/services/getClients"
import CuerpoInformesPage from "@/app/agency/[slug]/social/informes/cuerpo-informe"
import { InformeSelector } from "@/app/agency/[slug]/social/informes/informe-selector"
import PdfPage from "@/app/agency/[slug]/social/informes/pdf"
import { getInforme, getPublishedSelectorData, getSelectorData } from "@/services/informeService"

interface Props{
  searchParams: {
    id: string
  }
}

export default async function InformesPage({ searchParams }: Props) {

    const client= await getClientOfCurrenUser()
    if (!client) return <div>Client not found</div>

    let informeId= searchParams.id
    
    const selectors= await getPublishedSelectorData(client.id)

    if (!informeId && selectors.length>0) 
      informeId= selectors[0].id

    const informe= await getInforme(informeId)
  
    return (
      <div className="w-full px-2">      
  
        <div className="flex justify-center mt-2 mb-10">
            <InformeSelector selectors={selectors}/>
        </div>

        <div className="flex flex-col items-end gap-1 lg:mx-3 xl:mx-20 2xl:mx-36">
          
          
          
          { informeId && (
            <>
              <PdfPage pdfName={informe?.name || "informe"} />
              {/** @ts-expect-error Server Component */}
              <CuerpoInformesPage informeId={informeId} />
            </>
          )}
        </div>

      </div>
  )
  }
  