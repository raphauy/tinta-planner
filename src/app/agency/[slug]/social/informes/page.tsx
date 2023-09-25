
import { getClientBySlug } from "@/app/(server-side)/services/getClients"
import { Button } from "@/components/ui/button"
import { getSelectorData } from "@/services/informeService"
import { ListChecks } from "lucide-react"
import Link from "next/link"
import CuerpoInformesPage from "./cuerpo-informe"
import { InformeSelector } from "./informe-selector"
import Botones from "./botones"

interface Props{
  params: {
    slug: string
  },
  searchParams: {
    id: string
  }
}

export default async function InformesPage({ params, searchParams }: Props) {

    const slug= params.slug
    const client= await getClientBySlug(slug)
    if (!client) return <div>Client not found</div>

    let informeId= searchParams.id
    
    const selectors= await getSelectorData(client.id)

    if (!informeId && selectors.length>0) informeId= selectors[0].id  
  
    return (
      <div className="w-full px-2">      
  
        <div className="flex justify-center mt-2 mb-10">
            <InformeSelector selectors={selectors}/>
        </div>

        <div className="flex flex-col items-end lg:mx-3 xl:mx-20 2xl:mx-36">
          {/** @ts-expect-error Server Component */}
          <Botones informeId={informeId} slug={slug} /> 
          
          {/** @ts-expect-error Server Component */}
          { informeId && <CuerpoInformesPage informeId={informeId} /> }
          { !informeId && 
            <Link href={`/agency/${slug}/social/informes/gestionar`} className="self-center">
              <Button><ListChecks className="mr-2" />Gestionar</Button>              
            </Link>
          }
        </div>

      </div>
  )
  }
  