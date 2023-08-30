import { Wine } from "@prisma/client";
import { WineForm, WineFormValues } from "./wineForm";
import { revalidatePath } from "next/cache";
import { Separator } from "@/components/ui/separator";
import { createWine } from "@/services/wineService";


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
    const slug= params.slug

    async function saveData(data: WineFormValues): Promise<Wine | null> {
    "use server"
    
    const created= await createWine(slug, data)    

    console.log(created);
    
    revalidatePath(`/agency/${slug}/social/wines`)
    
    return created
    }

    return (
    <div className="flex flex-col items-center w-full max-w-4xl my-10 space-y-6">
        <h3 className="text-lg font-medium text-center">Agregar Vino</h3>

        <Separator className="my-5" />

        <div className="w-full">
            <WineForm slug={slug} processData={saveData} />
        </div>

    </div>
    )
}