import { getConversationsDAO } from "@/services/conversation-services"
import { DataTable } from "./conversations/conversation-table"
import { columns } from "./conversations/conversation-columns"

export default async function WhatsappPage() {

  const data= await getConversationsDAO()

  return (
    <div className="flex w-full">
        <div className="hidden max-w-lg p-3 py-4 mx-auto border rounded-md md:block text-muted-foreground dark:text-white">
            <DataTable columns={columns} data={data} subject="Conversation"/>
        </div>
        <div className="flex flex-col justify-between w-full bg-slate-100">

        </div>

    </div>
)
}
