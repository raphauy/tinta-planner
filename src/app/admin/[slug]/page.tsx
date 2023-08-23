import { formatter } from "@/app/(client-side)/utils";
import { getClientBySlug } from "@/app/(server-side)/services/getClients";
import getCurrentUser from "@/app/(server-side)/services/getCurrentUser";
import getClientWines from "@/app/(server-side)/services/getWines";
import LoadingSpinner from "@/components/LoadingSpinner"
import { Wine } from "lucide-react";
import { headers } from "next/dist/client/components/headers";
import Link from "next/link";
import { AiOutlineInstagram } from "react-icons/ai";
import { BsHddStack } from "react-icons/bs";
import { FaRegUserCircle } from "react-icons/fa";


export default async function DashboardPage({ params }: { params: { slug: string } }) {

  const { slug }= params  

  const client = await getClientBySlug(slug)
  if (!client) return <div>Client not found</div>

  const user= await getCurrentUser()

  const wines= await getClientWines(client.id)

  console.log("[" + formatter.format(new Date()) + "] " + user?.name + " (admin)");
  
  if (!client) return <LoadingSpinner />

    return (
      <div className="w-full">
        <div className="flex flex-col w-full text-center py-14">
          <h1 className="mb-4 text-2xl font-medium text-gray-900 sm:text-4xl title-font">{client.name}</h1>
        </div>
        
        <section className="grid w-full grid-cols-1 gap-8 px-5 mx-auto text-gray-600 md:grid-cols-2 lg:grid-cols-3 body-font">
          <Link href={`/admin/${slug}/posts`}>
            <div className="flex flex-col items-center px-4 py-6 border-2 border-gray-200 rounded-lg">
              <AiOutlineInstagram size={65} className="text-tinta-vino"/>
              <h2 className="text-3xl font-medium text-gray-900 title-font">{client.posts.length}</h2>
              <p className="leading-relaxed">Posts</p>
            </div>
          </Link>
          <Link href={`/admin/${slug}/pilares`}>
            <div className="flex flex-col items-center px-4 py-6 border-2 border-gray-200 rounded-lg">
              <BsHddStack size={65} className="text-tinta-vino"/>                
              <h2 className="text-3xl font-medium text-gray-900 title-font">{client.pilars.length}</h2>
              <p className="leading-relaxed">Pilares de contenido</p>
            </div>
          </Link>
          <Link href={`/admin/${slug}/usuarios`}>
            <div className="flex flex-col items-center px-4 py-6 border-2 border-gray-200 rounded-lg">
              <FaRegUserCircle size={65} className="text-tinta-vino"/>
              <h2 className="text-3xl font-medium text-gray-900 title-font">{client.users.length}</h2>
              <p className="leading-relaxed">Usuarios</p>
            </div>
          </Link>
          <div className="hidden lg:block"></div>
          <Link href={`/admin/${slug}/wines`}>
            <div className="flex flex-col items-center px-4 py-6 border-2 border-gray-200 rounded-lg">
              <Wine size={65} className="text-tinta-vino"/>
              <h2 className="text-3xl font-medium text-gray-900 title-font">{wines.length}</h2>
              <p className="leading-relaxed">Vinos</p>
            </div>
          </Link>
        </section>

      </div>
    )
  }
  
