import { Toaster } from "@/components/ui/toaster";
import getCurrentUser from "../(server-side)/services/getCurrentUser";
import NavBar from "../NavBar";
import ConfigSideBar from "./config-side-bar";
import { redirect } from "next/navigation";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {

    const currentUser= await getCurrentUser()  

    if (!currentUser)
        return <div>No session</div>

    const role= currentUser?.role

    if (role !== "admin" && role !== "agency-admin")
        return redirect("/not-allowed?message=Se necesitan permisos de administrador de agencia")

    return (
        <>
            <NavBar />

            <main className="flex flex-grow">
                <div className="flex flex-col gap-3 border-r w-52 border-r-tinta-vino/50">
                    <ConfigSideBar />
                </div>
                <div className="flex justify-center flex-grow">
                    {children}
                    <Toaster />
                </div>
            </main>

        </>
    );
}
