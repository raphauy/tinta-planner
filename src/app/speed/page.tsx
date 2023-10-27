
import getCurrentUser from "@/app/(server-side)/services/getCurrentUser"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import { getUniqueRoles } from "@/services/userService"
import { UserDialog } from "@/app/config/users/(crud)/user-dialog"
import { createAgencyUserAction, getAgencyUsersData, getAllUsersData, update } from "@/app/config/users/(crud)/actions"
import { DataTable } from "@/app/config/users/data-table"
import { columns } from "@/app/config/users/columns"
import { getAllPosts } from "../(server-side)/services/postServices"
 
export default async function UsersPage() {
  
  const users= await getAllUsersData()
  const posts= await getAllPosts()

  return (
    <div className="flex flex-col items-center justify-center mt-20 text-muted-foreground">
      <h1 className="text-3xl font-bold">Test speed page</h1>
      <div className="grid items-center justify-center grid-cols-2 p-4 mt-10 text-xl bg-white border rounded-md">
        <p>Users loaded:</p>
        <p className="place-self-end">{users.length}</p>
        <p>Posts loaded:</p>
        <p className="place-self-end">{posts.length}</p>
      </div>
    </div>
)
}
