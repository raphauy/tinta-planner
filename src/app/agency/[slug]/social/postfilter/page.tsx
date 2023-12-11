import { getPostsDAO } from "@/services/post-services"
import getClientPilars from "@/services/pilarService"
import { DataTable } from "@/app/admin/posts/post-table"
import { columns } from "@/app/admin/posts/post-columns"
import { getClientBySlug } from "@/app/(server-side)/services/getClients"

type Props = {
  params: {
    slug: string
  }
}

export default async function Page({ params }: Props) {
  const slug= params.slug
  const client= await getClientBySlug(slug)
  if (!client) return <div>Cliente no encontrado</div>
  
  const clientId= client.id
  const data= await getPostsDAO(clientId)
  const pillars= await getClientPilars(clientId)
  const pillarNames: string[]= pillars.map((p) => p.name)

  return (
    <div className="w-full p-3">      

      <div className="mx-auto my-2 text-center">
        <p className="text-3xl font-bold">Filtro de Posts</p>
      </div>

      <div className="p-4 mx-2 bg-white border rounded-md text-muted-foreground dark:text-white">
        <DataTable columns={columns} data={data} subject="Post" pilares={pillarNames} columnsOff={["pilarName", "status", "copy"]}/>
      </div>
    </div>
  )
}
  
