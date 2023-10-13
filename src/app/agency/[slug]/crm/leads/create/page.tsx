import { getClientBySlug } from "@/app/(server-side)/services/getClients";
import { create, update } from "../(crud)/actions";
import { CreateLeadForm } from "./main-form";
import { getDataServices } from "../../services/(crud)/actions";
import { IconBadge } from "@/components/icon-badge";
import { LayoutDashboard } from "lucide-react";

interface Props{
    params: {
        slug: string
    }
}
export default async function CreateLeadPage({ params: { slug } }: Props) {
    const client= await getClientBySlug(slug)
    if (!client) return <div>Client not found</div>
    const services= await getDataServices(client.id)
    return (
        <div className="flex flex-col items-center gap-5">
            <div className="flex items-center mt-4">
                <IconBadge variant="success" icon={LayoutDashboard}/>
                <p className="text-2xl font-bold text-muted-foreground">Nuevo Lead</p>
            </div>           

            <CreateLeadForm create={create} update={update} services={services} />
        </div>
    )
}
