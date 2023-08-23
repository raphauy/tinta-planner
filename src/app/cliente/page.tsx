import { Client, User } from "@prisma/client";
import { getClientOfCurrenUser } from "../(server-side)/services/getClients";
import Link from "next/link";
import LoadingSpinner from "@/components/LoadingSpinner";
import { AiOutlineInstagram } from "react-icons/ai";
import { BsHddStack } from "react-icons/bs";
import { FaRegUserCircle } from "react-icons/fa";
import getCurrentUser from "../(server-side)/services/getCurrentUser";
import { formatter } from "../(client-side)/utils";
import getClientWines from "../(server-side)/services/getWines";
import { Wine } from "lucide-react";

export default async function ClientPage() {
  const client = await getClientOfCurrenUser();

  if (!client) return <div>Cliente no encontrado. Por favor haga refresh o login nuevamente</div>

  const user= await getCurrentUser()

  const wines= await getClientWines(client.id)

  console.log("[" + formatter.format(new Date()) + "] " + user?.name + " ("+ client.name + ")");

  return (
    <div className="w-full">
      <div className="flex flex-col w-full text-center py-14">
        <h1 className="mb-4 text-2xl font-medium text-gray-900 sm:text-4xl title-font">{client.name}</h1>
      </div>
      
      <section className="grid w-full grid-cols-1 gap-8 px-5 mx-auto text-gray-600 md:grid-cols-2 lg:grid-cols-3 body-font">
        <Link href={`/cliente/posts`}>
          <div className="flex flex-col items-center px-4 py-6 border-2 border-gray-200 rounded-lg">
            <AiOutlineInstagram size={65} className="text-tinta-vino"/>
            <h2 className="text-3xl font-medium text-gray-900 title-font">{client.posts.length}</h2>
            <p className="leading-relaxed">Posts</p>
          </div>
        </Link>
        <Link href={`/cliente/pilares`}>
          <div className="flex flex-col items-center px-4 py-6 border-2 border-gray-200 rounded-lg">
            <BsHddStack size={65} className="text-tinta-vino"/>                
            <h2 className="text-3xl font-medium text-gray-900 title-font">{client.pilars.length}</h2>
            <p className="leading-relaxed">Pilares de contenido</p>
          </div>
        </Link>
        <Link href={`/cliente/usuarios`}>
          <div className="flex flex-col items-center px-4 py-6 border-2 border-gray-200 rounded-lg">
            <FaRegUserCircle size={65} className="text-tinta-vino"/>
            <h2 className="text-3xl font-medium text-gray-900 title-font">{client.users.length}</h2>
            <p className="leading-relaxed">Usuarios</p>
          </div>
        </Link>
        <div className="hidden lg:block"></div>
        <Link href={`/cliente/vinos`}>
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

