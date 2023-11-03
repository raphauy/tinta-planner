import { Wine } from "lucide-react";
import Link from "next/link";
import { AiOutlineInstagram } from "react-icons/ai";
import { BsHddStack } from "react-icons/bs";
import { FaRegUserCircle } from "react-icons/fa";
import { formatter } from "../(client-side)/utils";
import { getClientOfCurrenUser } from "../(server-side)/services/getClients";
import getCurrentUser from "../(server-side)/services/getCurrentUser";
import getClientWines from "@/services/wineService";

export default async function ClientPage() {
  const client = await getClientOfCurrenUser();

  if (!client) return <div>Cliente no encontrado. Por favor haga refresh o login nuevamente</div>

  const user= await getCurrentUser()

  const wines= await getClientWines(client.id)

  const usersWithRoleClient= client.users.filter(user => user.role === "client")

  console.log("[" + formatter.format(new Date()) + "] " + user?.name + " ("+ client.name + ")");

  return (
    <div className="w-full">
      <div className="flex flex-col w-full px-5 text-center py-14">
        <h1 className="mb-4 text-2xl font-medium text-gray-900 sm:text-4xl title-font">{client.name}</h1>
        <h2 className="mb-4 text-xl text-muted-foreground">{client.description}</h2>
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
            <h2 className="text-3xl font-medium text-gray-900 title-font">{usersWithRoleClient.length}</h2>
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

