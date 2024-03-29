
import getCurrentUser from "@/app/(server-side)/services/getCurrentUser"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import { createAgencyUserAction, getAgencyUsersData, update } from "./(crud)/actions"
import { UserDialog } from "./(crud)/user-dialog"
import { columns } from "./columns"
import { DataTable } from "./data-table"
import { getUniqueRoles } from "@/services/userService"
 
export default async function UsersPage() {
  
  const currentUser= await getCurrentUser()
  if(!currentUser) return null
  if(!currentUser.agencyId) return null

  const users= await getAgencyUsersData(currentUser.agencyId)
  const AllRoles= await getUniqueRoles()
  // remove the "admin" role
  const roles= AllRoles.filter((role) => role !== "admin")


  const addTrigger= (<Button><PlusCircle size={22} className="mr-2"/>Agregar</Button>)

  return (
    <div className="w-full">      

      <div className="flex justify-end mx-auto my-2">
        <UserDialog agencyId={currentUser.agencyId} 
          create={createAgencyUserAction} 
          update={update} 
          title="Agregar Usuario" 
          trigger={addTrigger}
        />
      </div>

      <div className="container p-3 py-4 mx-auto border rounded-md text-muted-foreground dark:text-white">
        <DataTable columns={columns} data={users} pageSize={50} roles={roles}/>      
      </div>
    </div>
)
}
