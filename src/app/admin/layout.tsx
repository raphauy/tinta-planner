import getCurrentUser from "../(server-side)/services/getCurrentUser";
import NavBar from "../NavBar";
import getClients from "../(server-side)/services/getClients";
import ClientBar from "./ClientBar";
import ClientSideBar from "./ClientSideBar";
import Selector from "./selector";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {

    const currentUser= await getCurrentUser()  

    if (!currentUser)
        return <div>No session</div>

    const agency= currentUser.agency

    if (!agency)
        return <div>El usuario no tiene permisos agencia</div>

    const clients = await getClients(agency.id);
  
    return (
        <>
            <NavBar />

            <main className="flex flex-grow">
                <div className="flex flex-col gap-3 border-r w-52 border-r-tinta-vino/50">
                    {/** @ts-expect-error Server Component */}
                    <Selector />
                    <ClientSideBar />
                </div>
                <div className="flex justify-center flex-grow">
                    {children}
                </div>
            </main>

        </>
    );
}
