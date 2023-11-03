
import { getClientOfCurrenUser } from "../(server-side)/services/getClients";
import NavBar from "../NavBar";
import Menu from "./Menu";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {

    const FEATURE_WINES_DISABLED_CLIENTS= process.env.FEATURE_WINES_DISABLED_CLIENTS?.split(",").map(Number) || []
    const client = await getClientOfCurrenUser()
    if (!client) return <div>Cliente no encontrado. Por favor haga refresh o login nuevamente</div>
    console.log("clientId: " + client.id)
    console.log("FEATURE_WINES_DISABLED_CLIENTS: " + FEATURE_WINES_DISABLED_CLIENTS)
        

    const wineDisabled= FEATURE_WINES_DISABLED_CLIENTS.includes(client.id)

    return (
    <>
        <NavBar />

        <main className="flex flex-col flex-grow">
            <Menu wineDisabled={wineDisabled} />
            <div className="flex-grow">
                {children}
            </div>
        </main>
    </>
    );
}
