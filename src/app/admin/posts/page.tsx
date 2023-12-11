import { getPostsDAO } from "@/services/post-services"
import { DataTable } from "./post-table"
import { columns } from "./post-columns"
import getClientPilars from "@/services/pilarService"

export default async function UsersPage() {
  
  const clientId= 3
  const data= await getPostsDAO(clientId)
  const pillars= await getClientPilars(clientId)
  const pillarNames: string[]= pillars.map((p) => p.name)

  return (
    <div className="w-full p-3">      

      <div className="flex justify-end mx-auto my-2">
        <p className="text-3xl font-bold">Posts</p>
      </div>

      <div className="p-4 mx-2 bg-white border rounded-md text-muted-foreground dark:text-white">
        <DataTable columns={columns} data={data} subject="Post" pilares={pillarNames} columnsOff={["pilarName", "status", "copy"]}/>
      </div>
    </div>
  )
}
  
