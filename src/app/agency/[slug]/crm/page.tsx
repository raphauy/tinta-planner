
export default function CRMPage() {
  return <div>CRM</div>
}


// import { formatter } from "@/app/(client-side)/utils";
// import { getClientBySlug } from "@/app/(server-side)/services/getClients";
// import getCurrentUser from "@/app/(server-side)/services/getCurrentUser";
// import LoadingSpinner from "@/components/LoadingSpinner";
// import { getClientActiveLeads } from "@/services/leadService";
// import { Magnet, PlusCircle, Target } from "lucide-react";
// import Link from "next/link";
// import StateBox from "./state-box";
// import StateFlow from "./state-flow";
// import { LeadDialog } from "./leads/(crud)/main-dialog";
// import { create, update } from "./leads/(crud)/actions";
// import { Button } from "@/components/ui/button";
// import { redirect } from "next/navigation";


// export default async function DashboardPage({ params }: { params: { slug: string } }) {

//   const { slug }= params  

//   const client = await getClientBySlug(slug)
//   if (!client) return <div>Client not found</div>

//   const leads= await getClientActiveLeads(client.id)
//   const totalLeads= leads.length

//   const user= await getCurrentUser()

//   // if (!user?.role.endsWith("admin"))
//   if (user?.email !== "rapha.uy@rapha.uy" && user?.email !== "gabi@tinta.wine" && user?.email !== "agustin@tinta.wine" && user?.email !== "aldana@tinta.wine")
//     return redirect("/not-allowed?message=No tienes permisos para acceder a este recurso")

//   const basePath= "agency"

//   console.log("[" + formatter.format(new Date()) + "] " + user?.name + " (admin)");
  
//   if (!client) return <LoadingSpinner />

//   const addTrigger= (<Button variant="ghost"><PlusCircle size={22} className="mr-2"/></Button>)

//     return (
//       <div className="w-full">
//         <div className="flex justify-between w-full py-4 text-muted-foreground">
//           <div/>
//           <h1 className="text-2xl font-medium sm:text-4xl title-font">{client.name}</h1>
//           <LeadDialog create={create} update={update} clientId={client.id} title="Agregar Servicio" trigger={addTrigger}/>
//         </div>

//         <StateFlow />      
        
//         <section className="grid grid-cols-1 mb-16 md:grid-cols-2 lg:grid-cols-4">
//           {/** @ts-expect-error Server Component */}
//           <StateBox status="Calificado" clientId={client.id} totalLeads={totalLeads}/>
//           {/** @ts-expect-error Server Component */}
//           <StateBox status="Propuesta" clientId={client.id} totalLeads={totalLeads}/>
//           {/** @ts-expect-error Server Component */}
//           <StateBox status="Negociación" clientId={client.id} totalLeads={totalLeads}/>
//           {/** @ts-expect-error Server Component */}
//           <StateBox status="Ganado" clientId={client.id} totalLeads={totalLeads}/>
//         </section>

//         <section className="grid w-full max-w-4xl grid-cols-1 gap-8 px-5 mx-auto text-gray-600 md:grid-cols-2 lg:grid-cols-2 body-font">
//           <Link href={`/${basePath}/${slug}/crm/services`}>
//             <div className="flex flex-col items-center px-4 py-6 border-2 border-gray-200 rounded-lg">
//               <Target  size={50} className="text-tinta-vino"/>
//               <h2 className="text-3xl font-medium text-gray-900 title-font">{client.services.length}</h2>
//               <p className="leading-relaxed">Servicios</p>
//             </div>
//           </Link>
//           <Link href={`/${basePath}/${slug}/crm/leads`}>
//             <div className="flex flex-col items-center px-4 py-6 border-2 border-gray-200 rounded-lg">
//               <Magnet size={50} className="text-tinta-vino"/>                
//               <h2 className="text-3xl font-medium text-gray-900 title-font">{client.leads.length}</h2>
//               <p className="leading-relaxed">Leads</p>
//             </div>
//           </Link>
//         </section>
//       </div>
//     )
//   }
  
