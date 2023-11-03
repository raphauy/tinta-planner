import { Toaster } from "@/components/ui/toaster";
import getCurrentUser from "../(server-side)/services/getCurrentUser";
import NavBar from "../NavBar";
import Selector from "./selector";
import MainSideBar from "./side-bar";
import { redirect } from "next/navigation";

type Props = {
    children: React.ReactNode
}
export default async function AdminLayout({ children }: Props) {    

    const currentUser= await getCurrentUser()  

    if (!currentUser)
        return <div>No session</div>

    const agency= currentUser.agency

    if (!agency)
        return <div>Agency not found</div>

    const role= currentUser.role
    if (role !== "admin" && role !== "agency-admin" && role !== "agency"){
        const message= "No tienes permisos de agencia"
        return redirect(`/not-allowed?message=${message}`)
    }
    
    const clients= currentUser.clients
    if (clients.length === 0){
        const message= "No tienes clientes asignados"
        return redirect(`/not-allowed?message=${message}`)
    }
        

    return (
        <>
            <NavBar />

            <main className="flex flex-grow">
                <div className="flex flex-col gap-3 border-r w-52 border-r-tinta-vino/50">
                    {/** @ts-expect-error Server Component */}
                    <Selector />
                    <MainSideBar />
                </div>
                <div className="flex justify-center w-full">
                    {children}
                    <Toaster />
                </div>
            </main>

        </>
    );
}
