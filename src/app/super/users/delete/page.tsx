import { deleteAgency, getAgency } from '@/app/(server-side)/services/agencyService'
import { Separator } from '@/components/ui/separator'
import { Agency, User } from '@prisma/client'
import { revalidatePath } from 'next/cache'
import DeleteForm from './deleteForm'
import { redirect } from 'next/navigation'
import { deleteUser, getUser } from '@/app/(server-side)/services/userService'

interface Props{
    searchParams: {
      id: string
    }
}
    
export default async function DeletePage({ searchParams }: Props) {
    const id= searchParams.id
    console.log("id " + id);
    

    const user= await getUser(id)

    if (!user) return redirect("/super/users")

    const agency= user.agency

    async function eliminate(): Promise<User | null> {
        "use server"
        
        try {
            const deleted= await deleteUser(id)
            revalidatePath("/super/agencies")
            return deleted
        } catch (error) {
            return null
        }
    }


    return (
        <div className="flex flex-col items-center w-full my-5 space-y-6">
            <div className="flex flex-col items-center">
                <p className="text-xl font-medium text-center">Delete User {user.email}</p>
                {
                    agency && 
                    <p className='flex justify-center mt-10 text-xl'>
                        <span className='mr-2 text-red-600'>Atention!!!</span>
                        This user is an administrator of agency {agency.name}
                    </p>
                }

                <Separator className="my-5" />
                
                <p className="mb-5 text-lg">This operation cannot be undone</p>

                <DeleteForm id={id} eliminate={eliminate} />
            </div>
        
        </div>
    )
}