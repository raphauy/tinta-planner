import { Toaster } from "@/components/ui/toaster";
import getCurrentUser from "../(server-side)/services/getCurrentUser";
import NavBar from "../NavBar";
import Selector from "./selector";
import MainSideBar from "./side-bar";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {

    const currentUser= await getCurrentUser()  

    if (!currentUser)
        return <div>No session</div>

    const agency= currentUser.agency

    if (!agency)
        return <div>El usuario no tiene permisos agencia</div>

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
