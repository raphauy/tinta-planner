import { formatter } from "@/app/(client-side)/utils";
import { getClientBySlug } from "@/app/(server-side)/services/getClients";
import getCurrentUser from "@/app/(server-side)/services/getCurrentUser";
import LoadingSpinner from "@/components/LoadingSpinner";
import getClientWines from "@/services/wineService";
import { Wine } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { AiOutlineInstagram } from "react-icons/ai";
import { BsHddStack } from "react-icons/bs";
import { FaRegUserCircle } from "react-icons/fa";


export default async function DashboardPage({ params }: { params: { slug: string } }) {

  const { slug }= params  

  const client = await getClientBySlug(slug)
  if (!client) return <div>Client not found</div>

  const usersWithRoleClient= client.users.filter(user => user.role === "client")

  const user= await getCurrentUser()

  const wines= await getClientWines(client.id)

  const basePath= "agency"

  console.log("[" + formatter.format(new Date()) + "] " + user?.name + " (admin)");
  
  if (!client) return <LoadingSpinner />

    return (
      <div className="w-full">
        <div className="flex flex-col items-center w-full p-5 text-center gap-7">
          <div className="flex items-center gap-3 pr-10 mb-2">
              { client.image_insta &&
                <div className="relative inline-block w-12 h-12 overflow-hidden border rounded-full">
                  <Image src={client.image_insta} width={100} height={100} alt="Client image" />
                </div>
              }
              <h1 className="text-2xl font-medium text-gray-900 sm:text-4xl title-font">
                {client.name}
              </h1>
            </div>
          <h2 className="mb-4 text-xl text-muted-foreground">{client.description}</h2>
        </div>
        
        <section className="grid w-full grid-cols-1 gap-8 px-5 mx-auto text-gray-600 md:grid-cols-2 lg:grid-cols-3 body-font">
          <Link href={`/${basePath}/${slug}/social/posts`}>
            <div className="flex flex-col items-center px-4 py-6 border-2 border-gray-200 rounded-lg">
              <AiOutlineInstagram size={65} className="text-tinta-vino"/>
              <h2 className="text-3xl font-medium text-gray-900 title-font">{client.posts.length}</h2>
              <p className="leading-relaxed">Posts</p>
            </div>
          </Link>
          <Link href={`/${basePath}/${slug}/social/pilars`}>
            <div className="flex flex-col items-center px-4 py-6 border-2 border-gray-200 rounded-lg">
              <BsHddStack size={65} className="text-tinta-vino"/>                
              <h2 className="text-3xl font-medium text-gray-900 title-font">{client.pilars.length}</h2>
              <p className="leading-relaxed">Pilares de contenido</p>
            </div>
          </Link>
          <Link href={`/${basePath}/${slug}/social/users`}>
            <div className="flex flex-col items-center px-4 py-6 border-2 border-gray-200 rounded-lg">
              <FaRegUserCircle size={65} className="text-tinta-vino"/>
              <h2 className="text-3xl font-medium text-gray-900 title-font">{usersWithRoleClient.length}</h2>
              <p className="leading-relaxed">Usuarios</p>
            </div>
          </Link>
          <div className="hidden lg:block"></div>
          <Link href={`/${basePath}/${slug}/social/wines`}>
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
  
