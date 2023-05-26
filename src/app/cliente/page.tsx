import { Client, User } from "@prisma/client";
import { getClientOfCurrenUser } from "../(server-side)/services/getClients";
import Link from "next/link";
import LoadingSpinner from "@/components/LoadingSpinner";
import { AiOutlineInstagram } from "react-icons/ai";
import { BsHddStack } from "react-icons/bs";
import { FaRegUserCircle } from "react-icons/fa";

export default async function ClientPage() {
  const client = await getClientOfCurrenUser();

  if (!client) return <LoadingSpinner />

  return (
    <>
      <section className="text-gray-600 body-font">
        <div className="container px-5 mx-auto py-14">
          <div className="flex flex-col w-full text-center mb-14">
            <h1 className="mb-4 text-2xl font-medium text-gray-900 sm:text-4xl title-font">{client.name}</h1>
            <p className="mx-auto text-base leading-relaxed lg:w-2/3">{client.description}</p>
          </div>
          <div className="flex flex-wrap -m-4 text-center">
            <div className="w-full p-4 md:w-1/3 sm:w-1/2">
              <Link href="/cliente/posts">
                <div className="flex flex-col items-center px-4 py-6 border-2 border-gray-200 rounded-lg">
                  <AiOutlineInstagram size={65} className="text-tinta-vino"/>
                  <h2 className="text-3xl font-medium text-gray-900 title-font">{client.posts.length}</h2>
                  <p className="leading-relaxed">Posts</p>
                </div>
              </Link>
            </div>
            <div className="w-full p-4 md:w-1/3 sm:w-1/2">
            <Link href="/cliente/pilares">
              <div className="flex flex-col items-center px-4 py-6 border-2 border-gray-200 rounded-lg">
                <BsHddStack size={65} className="text-tinta-vino"/>                
                <h2 className="text-3xl font-medium text-gray-900 title-font">{client.pilars.length}</h2>
                <p className="leading-relaxed">Pilares de contenido</p>
              </div>
              </Link>
            </div>
            <div className="w-full p-4 md:w-1/3 sm:w-1/2">
              <Link href="/cliente/usuarios">
                <div className="flex flex-col items-center px-4 py-6 border-2 border-gray-200 rounded-lg">
                  <FaRegUserCircle size={65} className="text-tinta-vino"/>
                  <h2 className="text-3xl font-medium text-gray-900 title-font">{client.users.length}</h2>
                  <p className="leading-relaxed">Usuarios</p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

