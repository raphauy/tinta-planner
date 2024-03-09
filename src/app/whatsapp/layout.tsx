import { Toaster } from "@/components/ui/toaster";
import { getConversationsDAO } from "@/services/conversation-services";
import { redirect } from "next/navigation";
import getCurrentUser from "../(server-side)/services/getCurrentUser";
import NavBar from "../NavBar";
import { columns } from "./conversations/conversation-columns";
import { DataTable } from "./conversations/conversation-table";
import LateralPanel from "./lateral-panel";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {

    const currentUser= await getCurrentUser()  

    if (!currentUser)
        return <div>No session</div>

    const role= currentUser.role

    if (role !== "admin" && role !== "agency" && role !== "agency-admin")
        return redirect("/not-allowed?message=No tienes permisos")

    // const data= await getConversationsDAO()

    return (
        <>
            <NavBar />

            <main className="flex flex-grow">
                {/* <div className="hidden max-w-lg p-3 py-4 mx-auto border rounded-md md:block text-muted-foreground dark:text-white">
                    <DataTable columns={columns} data={data} subject="Conversation"/>      
                </div> */}
                <div className="flex justify-center flex-1 w-full">
                    {children}
                    <Toaster />
                </div>
            </main>

        </>
    );
}
