import { formatter } from "@/app/(client-side)/utils";
import { getClientBySlug } from "@/app/(server-side)/services/getClients";
import getCurrentUser from "@/app/(server-side)/services/getCurrentUser";
import LoadingSpinner from "@/components/LoadingSpinner";
import getClientServices from "@/services/serviceService";
import getClientWines from "@/services/wineService";
import { Magnet, Target, Wine } from "lucide-react";
import Link from "next/link";
import { AiOutlineInstagram } from "react-icons/ai";
import { BsHddStack } from "react-icons/bs";
import { FaRegUserCircle } from "react-icons/fa";


export default async function DashboardPage({ params }: { params: { slug: string } }) {

  const { slug }= params  

  const client = await getClientBySlug(slug)
  if (!client) return <div>Client not found</div>

  const user= await getCurrentUser()

  const basePath= "agency"

  console.log("[" + formatter.format(new Date()) + "] " + user?.name + " (admin)");
  
  if (!client) return <LoadingSpinner />

    return (
      <div className="w-full">
        <div className="flex flex-col w-full text-center py-14">
          <h1 className="mb-4 text-2xl font-medium text-gray-900 sm:text-4xl title-font">{client.name}</h1>
        </div>
        
        <section className="grid w-full max-w-4xl grid-cols-1 gap-8 px-5 mx-auto text-gray-600 md:grid-cols-2 lg:grid-cols-2 body-font">
          <Link href={`/${basePath}/${slug}/crm/services`}>
            <div className="flex flex-col items-center px-4 py-6 border-2 border-gray-200 rounded-lg">
              <Target  size={65} className="text-tinta-vino"/>
              <h2 className="text-3xl font-medium text-gray-900 title-font">{client.services.length}</h2>
              <p className="leading-relaxed">Servicios</p>
            </div>
          </Link>
          <Link href={`/${basePath}/${slug}/crm/leads`}>
            <div className="flex flex-col items-center px-4 py-6 border-2 border-gray-200 rounded-lg">
              <Magnet size={65} className="text-tinta-vino"/>                
              <h2 className="text-3xl font-medium text-gray-900 title-font">{client.leads.length}</h2>
              <p className="leading-relaxed">Leads</p>
            </div>
          </Link>
        </section>

      </div>
    )
  }
  
