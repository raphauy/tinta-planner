import { Separator } from '@/components/ui/separator'
import { Wine } from '@prisma/client'
import { revalidatePath } from 'next/cache'
import DeleteForm from './deleteForm'
import { deleteWine, getWine } from '@/app/(server-side)/services/getWines'
import { getClientBySlug } from '@/app/(server-side)/services/getClients'

interface Props{
    params: {
        slug: string
    },
    searchParams: {
        wineId: string
    }
}
  
export default async function DeletePage({ params, searchParams }: Props) {
    const slug= params.slug
    
    const wineId= searchParams.wineId
  
    const wine= await getWine(wineId)
   
    if (!wine) <div>Wine not found</div>

    async function eliminate(): Promise<Wine | null> {
        "use server"
        
        const deleted= await deleteWine(wineId)

        revalidatePath(`/admin/${slug}/wines`)

        return deleted
    }


    return (
        <div className="flex flex-col items-center w-full my-5 space-y-6">
            <div className="flex flex-col items-center">
                <h3 className="text-xl font-medium text-center">Desea eliminar el vino {wine?.wine}?</h3>

                <Separator className="my-5" />
                
                <p className="mb-5 text-lg">Esta acción no se puede deshacer</p>

                <DeleteForm slug={slug} eliminate={eliminate} />
            </div>
        
        </div>
    )
}