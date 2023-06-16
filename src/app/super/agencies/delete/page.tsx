import { deleteAgency, getAgency } from '@/app/(server-side)/services/agencyService'
import { Separator } from '@/components/ui/separator'
import { Agency } from '@prisma/client'
import { revalidatePath } from 'next/cache'
import DeleteForm from './deleteForm'
import { redirect } from 'next/navigation'

interface Props{
    searchParams: {
      id: string
    }
}
    
export default async function DeletePage({ searchParams }: Props) {
    const id= searchParams.id
    console.log("id " + id);
    

    const agency= await getAgency(parseInt(id))

    if (!agency) return redirect("/super/agencies")

    const clientCount= agency.clients.length
    if (clientCount > 0) 
        return <div className='flex justify-center mt-10 text-xl'>The agency has {clientCount} clients, to be able to delete you must first delete the clients</div>

    async function eliminate(): Promise<Agency | null> {
        "use server"
        
        try {
            const deleted= await deleteAgency(parseInt(id))
            revalidatePath("/super/agencies")
            return deleted
        } catch (error) {
            return null
        }
    }


    return (
        <div className="flex flex-col items-center w-full my-5 space-y-6">
            <div className="flex flex-col items-center">
                <p className="text-xl font-medium text-center">Delete Agency {agency.name}</p>

                <Separator className="my-5" />
                
                <p className="mb-5 text-lg">This operation cannot be undone</p>

                <DeleteForm id={id} eliminate={eliminate} />
            </div>
        
        </div>
    )
}