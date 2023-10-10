import { formatter } from "@/app/(client-side)/utils";
import { getClientBySlug } from "@/app/(server-side)/services/getClients";
import getCurrentUser from "@/app/(server-side)/services/getCurrentUser";
import LoadingSpinner from "@/components/LoadingSpinner";
import { Magnet, Target } from "lucide-react";
import Link from "next/link";
import StateBox from "./state-box";
import getClientLeads from "@/services/leadService";
import StateFlow from "./state-flow";


export default async function DashboardPage({ params }: { params: { slug: string } }) {

  const { slug }= params  

  const client = await getClientBySlug(slug)
  if (!client) return <div>Client not found</div>

  const leads= await getClientLeads(client.id)
  const totalLeads= leads.length

  const user= await getCurrentUser()

  const basePath= "agency"

  console.log("[" + formatter.format(new Date()) + "] " + user?.name + " (admin)");
  
  if (!client) return <LoadingSpinner />

    return (
      <div className="w-full">
        <div className="flex flex-col w-full py-5 text-center text-muted-foreground">
          <h1 className="text-2xl font-medium sm:text-4xl title-font">{client.name}</h1>
        </div>

        <StateFlow />      
        
        <section className="grid grid-cols-1 mb-16 md:grid-cols-2 lg:grid-cols-4">
          {/** @ts-expect-error Server Component */}
          <StateBox status="Calificado" clientId={client.id} totalLeads={totalLeads}/>
          {/** @ts-expect-error Server Component */}
          <StateBox status="Propuesta" clientId={client.id} totalLeads={totalLeads}/>
          {/** @ts-expect-error Server Component */}
          <StateBox status="Negociación" clientId={client.id} totalLeads={totalLeads}/>
          {/** @ts-expect-error Server Component */}
          <StateBox status="Ganado" clientId={client.id} totalLeads={totalLeads}/>
        </section>

        <section className="grid w-full max-w-4xl grid-cols-1 gap-8 px-5 mx-auto text-gray-600 md:grid-cols-2 lg:grid-cols-2 body-font">
          <Link href={`/${basePath}/${slug}/crm/services`}>
            <div className="flex flex-col items-center px-4 py-6 border-2 border-gray-200 rounded-lg">
              <Target  size={50} className="text-tinta-vino"/>
              <h2 className="text-3xl font-medium text-gray-900 title-font">{client.services.length}</h2>
              <p className="leading-relaxed">Servicios</p>
            </div>
          </Link>
          <Link href={`/${basePath}/${slug}/crm/leads`}>
            <div className="flex flex-col items-center px-4 py-6 border-2 border-gray-200 rounded-lg">
              <Magnet size={50} className="text-tinta-vino"/>                
              <h2 className="text-3xl font-medium text-gray-900 title-font">{client.leads.length}</h2>
              <p className="leading-relaxed">Leads</p>
            </div>
          </Link>
        </section>
      </div>
    )
  }
  
