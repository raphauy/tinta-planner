import { getConversationsDAO } from "@/services/conversation-services"
import { ConversationDialog } from "./conversation-dialogs"
import { DataTable } from "./conversation-table"
import { columns } from "./conversation-columns"

export default async function UsersPage() {
  
  const data= await getConversationsDAO()

  return (
    <div className="w-full">      

      <div className="container p-3 py-4 mx-auto border rounded-md text-muted-foreground dark:text-white">
        <DataTable columns={columns} data={data} subject="Conversation"/>      
      </div>
    </div>
  )
}
  
