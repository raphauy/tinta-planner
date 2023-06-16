import getCurrentUser from "../(server-side)/services/getCurrentUser";
import getClients from "../(server-side)/services/getClients";
import NotAlowedPage from "../auth/not-alowed/page";
import SuperSideBar from "./SuperSideBar";
import { Toaster } from "@/components/ui/toaster";

export default async function SuperLayout({ children }: { children: React.ReactNode }) {

    const currentUser= await getCurrentUser()  

    if (!currentUser)
        return <div>No session</div>

    const role= currentUser.role

    if (role !== "super")
        {/* @ts-expect-error Server Component */}
        return <NotAlowedPage message="Se necesita permisos de Super usuario" />
 
    return (
        <>
            <main className="flex flex-grow">
                <SuperSideBar />
                <div className="flex-grow">
                    {children}
                    <Toaster />
                </div>
            </main>

        </>
    );
}
