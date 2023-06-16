import getClients from "../../(server-side)/services/getClients";
import getCurrentUser from "../../(server-side)/services/getCurrentUser";
import NotAlowedPage from "../../auth/not-alowed/page";
import ClientBar from "./ClientBar";
import ClientSideBar from "./ClientSideBar";

interface Props{
    children: React.ReactNode
}

export default async function AdminLayout({ children }: Props) {

    const currentUser= await getCurrentUser()  

    if (!currentUser){
        {/* @ts-expect-error Server Component */}
        return <NotAlowedPage message="Para acceder debe estar logueado." />
    }

    const agency= currentUser.agency

    if (!agency){
        {/* @ts-expect-error Server Component */}
        return <NotAlowedPage message="Se necesita permisos de agencia" />
    }

    const clients = await getClients(agency.id);
  
    return (
        <>
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
