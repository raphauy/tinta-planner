import getCurrentUser from "../(server-side)/services/getCurrentUser";
import NavBar from "../NavBar";
import getClients from "../(server-side)/services/getClients";
import ClientBar from "./ClientBar";
import ClientSideBar from "./ClientSideBar";

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

            <ClientBar clients={clients} />

            <main className="flex flex-grow">
                <ClientSideBar />
                <div className="flex-grow">
                    {children}
                </div>
            </main>

        </>
    );
}
