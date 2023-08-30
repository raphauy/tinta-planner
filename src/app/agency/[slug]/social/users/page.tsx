
import { getClientBySlug } from "@/app/(server-side)/services/getClients"
import { Button } from "@/components/ui/button"
import getUsers from "@/services/userService"
import { PlusCircle } from "lucide-react"
import { UserDialog } from "./(crud)/user-dialog"
import { columns } from "./columns"
import { DataTable } from "./data-table"
import { create, update } from "./(crud)/actions"
 
interface Props{
  params: {
    slug: string
  },
}

export default async function UsersPage({ params }: Props) {

  const slug= params.slug
  const client= await getClientBySlug(slug)
  if (!client) return <div>Client not found</div>
  
  const users= await getUsers(client.id)


  const addTrigger= (<Button><PlusCircle size={22} className="mr-2"/>Agregar</Button>)

  return (
    <div className="w-full px-2">      

      <div className="flex justify-end mx-auto my-2">
        <UserDialog create={create} update={update} title="Agregar Usuario" trigger={addTrigger}/>
      </div>

      <div className="p-3 mx-auto bg-white border rounded-md text-muted-foreground dark:text-white">
        <DataTable columns={columns} data={users} />      
      </div>
    </div>
)
}
