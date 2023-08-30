import { getClientBySlug } from "@/app/(server-side)/services/getClients";
import { Separator } from "@/components/ui/separator";
import { editWine, getWine } from "@/services/wineService";
import { Wine } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { WineForm, WineFormValues } from "../add/wineForm";


export const revalidate= 0

interface Props{
    params: {
        slug: string
    },
    searchParams: {
        wineId: string
    },
  }  

export default async function AddWinePage({ params, searchParams }: Props) {
    const client= await getClientBySlug(params.slug)
    if (!client) return <div>Client not found: {params.slug}</div>
    
    const wineId= searchParams.wineId
    const wine= await getWine(wineId)

    if (!wine) return <div>Wine not found, id: {wineId}</div>
 

    async function editData(data: WineFormValues): Promise<Wine | null> {
    "use server"

    const edited= await editWine(wineId, data)    

    revalidatePath(`/agency/${params.slug}/social/wines`)
    
    return edited
    }

    return (
    <div className="flex flex-col items-center w-full max-w-4xl my-10 space-y-6">
        <h3 className="text-lg font-medium text-center">Editar Vino</h3>

        <Separator className="my-5" />

        <div className="w-full">
            <WineForm slug={client.slug} processData={editData} wine={wine} />        
        </div>

    </div>
    )
}