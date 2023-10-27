
import getCurrentUser from "@/app/(server-side)/services/getCurrentUser"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import { getUniqueRoles } from "@/services/userService"
import { UserDialog } from "@/app/config/users/(crud)/user-dialog"
import { createAgencyUserAction, getAgencyUsersData, getAllUsersData, update } from "@/app/config/users/(crud)/actions"
import { DataTable } from "@/app/config/users/data-table"
import { columns } from "@/app/config/users/columns"
 
export default async function UsersPage() {
  
  const currentUser= await getCurrentUser()
  if(!currentUser) return null

  const agencyId= 1
  
  const users= await getAllUsersData()
  const AllRoles= await getUniqueRoles()

  const addTrigger= (<Button><PlusCircle size={22} className="mr-2"/>Agregar</Button>)

  return (
    <div className="w-full">      

      <div className="flex justify-end mx-auto my-2">
        <UserDialog agencyId={agencyId} 
          create={createAgencyUserAction} 
          update={update} 
          title="Agregar Usuario" 
          trigger={addTrigger}
        />
      </div>

      <div className="container p-3 py-4 mx-auto border rounded-md text-muted-foreground dark:text-white">
        <DataTable columns={columns} data={users} pageSize={50} roles={AllRoles}/>      
      </div>
    </div>
)
}
