import { Toaster } from "@/components/ui/toaster";
import getCurrentUser from "../(server-side)/services/getCurrentUser";
import NavBar from "../NavBar";
import AdminSideBar from "./side-bar";
import { redirect } from "next/navigation";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {

    const currentUser= await getCurrentUser()  

    if (!currentUser)
        return <div>No session</div>

    const role= currentUser.role

    if (role !== "admin")
        return redirect("/not-allowed?message=No tienes permisos")

    return (
        <>
            <NavBar />

            <main className="flex flex-grow">
                <div className="flex flex-col gap-3 border-r w-52 border-r-tinta-vino/50">
                    <AdminSideBar />
                </div>
                <div className="flex justify-center w-full">
                    {children}
                    <Toaster />
                </div>
            </main>

        </>
    );
}
