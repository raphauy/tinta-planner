import { getAgency } from "@/app/(server-side)/services/agencyService";
import getCurrentUser from "@/app/(server-side)/services/getCurrentUser";
import NotAlowedPage from "@/app/auth/not-alowed/page";
import ClientBox from "./ClientBox";
import { PlusCircle } from "lucide-react";
import Link from "next/link";

export const revalidate= 0

export default async function AdminPage() {
  const user= await getCurrentUser()

  {/* @ts-expect-error Server Component */}
  if (!user) return <NotAlowedPage message="Para acceder a esta página debes estar logueado." />

  const agencyId= user.agencyId
  if (!agencyId) return <div>No Agency found</div>

  const agency= await getAgency(agencyId)
  if (!agency) return <div>No Agency found</div>

  const clients= agency.clients

  if (clients.length === 0)
    return noClients()
  
  return (
    <section className="flex justify-center pt-3">
      
      <div className="flex max-w-[980px] flex-col items-center gap-4">
        <div className="flex gap-4">
          <p className="mb-2 text-3xl font-extrabold leading-tight tracking-tighter text-center md:text-4xl">
            Clientes
          </p>
          <div className="flex justify-end mt-2 mr-1 text-green-400">
            <Link href={`/admin/clients/add`}><PlusCircle size={28} /></Link>
          </div>
        </div>
        {
          clients.map(client => (
            <ClientBox key={client.id} client={client} />
          ))
        }
      </div>
      
    </section>
  )
}

function noClients() {
  return (
    <div className="flex flex-col items-center gap-2 mt-10">
      <p className="text-3xl font-bold">Bienvenido a Agency planner</p>
      <p className="text-xl">click aquí abajo para agregar el primer cliente</p>
      <div className="flex justify-end mt-2 mr-1 text-green-400">
        <Link href={`/admin/clients/add`}><PlusCircle size={28} /></Link>
      </div>
   </div>
  )
}