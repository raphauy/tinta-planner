import { Wine } from "@prisma/client";
import { createWine, editWine, getWine } from "@/app/(server-side)/services/getWines";
import { revalidatePath } from "next/cache";
import { Separator } from "@/components/ui/separator";
import { WineForm, WineFormValues } from "../add/wineForm";
import { getClientById } from "@/app/(server-side)/services/getClients";


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
    const clientIdStr= params.slug
    const client= await getClientById(parseInt(clientIdStr))
    if (!client) return <div>Client not found, id: {clientIdStr}</div>
    
    const wineId= searchParams.wineId
    const wine= await getWine(wineId)

    if (!wine) return <div>Wine not found, id: {wineId}</div>
 

    async function editData(data: WineFormValues): Promise<Wine | null> {
    "use server"

    const edited= await editWine(wineId, data)    

    //console.log(edited);
    
    revalidatePath("/admin")
    
    return edited
    }

    return (
    <div className="flex flex-col items-center w-full max-w-4xl my-10 space-y-6">
        <div className="min-w-[600px]">
        <h3 className="text-lg font-medium text-center">Agregar Vino</h3>

        <Separator className="my-5" />

        <div className="w-full">
            <WineForm slug={client.slug} processData={editData} wine={wine} />        
        </div>
        
        </div>
        
    </div>
    )
}