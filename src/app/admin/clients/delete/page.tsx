import { Separator } from '@/components/ui/separator'
import { Client } from '@prisma/client'
import { revalidatePath } from 'next/cache'
import DeleteForm from './deleteForm'
import { deleteClient, getClient } from '@/app/(server-side)/services/getClients'

interface Props{
    searchParams: {
      id: string
    }
}
    
export default async function DeletePage({ searchParams }: Props) {
    const id= searchParams.id
    console.log("id " + id);
    

    const client= await getClient(parseInt(id))

    if (!client) return <div>No client found</div>

    const usersCount= client.users.length
    const postsCount= client.posts.length
    const pilarsCount= client.pilars.length

    async function eliminate(): Promise<Client | null> {
        "use server"
        
        try {
            const deleted= await deleteClient(parseInt(id))
            revalidatePath("/admin/clients")
            return deleted
        } catch (error) {
            return null
        }
    }


    return (
        <div className="flex flex-col items-center w-full my-5 space-y-6">
            <div className="flex flex-col items-center gap-2 text-lg">
                <p className="text-xl font-medium text-center">Eliminar cliente {client.name}?</p>

                <Separator className="my-5" />
                {usersCount > 0 && <p>Este cliente tiene {usersCount} Usuarios!</p>}

                {postsCount > 0 && <p>Este cliente tiene {postsCount} Posts!</p>}

                {pilarsCount > 0 && <p>Este cliente tiene {pilarsCount} Pilares de contenido!</p>}                
                
                <p className="mb-5">Esta operación no se puede reversar</p>

                <DeleteForm id={id} eliminate={eliminate} />
            </div>
        
        </div>
    )
}