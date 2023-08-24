import getClients from "../(server-side)/services/getClients";
import getCurrentUser from "../(server-side)/services/getCurrentUser";
import NavBar from "../NavBar";

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

            <div className="flex justify-center flex-grow">
                {children}
            </div>

        </>
    );
}
