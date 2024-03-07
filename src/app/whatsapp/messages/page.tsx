import { getFullMessagesDAO, getMessagesDAO } from "@/services/message-services"
import { MessageDialog } from "./message-dialogs"
import { DataTable } from "./message-table"
import { columns } from "./message-columns"

export default async function UsersPage() {
  
  const data= await getFullMessagesDAO()

  return (
    <div className="w-full">      

      <div className="container p-3 py-4 mx-auto border rounded-md text-muted-foreground dark:text-white">
        <DataTable columns={columns} data={data} subject="Message"/>      
      </div>
    </div>
  )
}
  
