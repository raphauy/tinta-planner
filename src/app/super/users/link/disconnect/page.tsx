import { disconnect, getAgency } from '@/app/(server-side)/services/agencyService'
import { getUser } from '@/app/(server-side)/services/userService'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

interface Props{
    searchParams: {
      agencyId: string
      userId: string
    }
}
    
export default async function DeletePage({ searchParams }: Props) {
    const agencyId= searchParams.agencyId
    const userId= searchParams.userId    

    const agency= await getAgency(parseInt(agencyId))
    if (!agency) return <div>No Agency to unlinnk</div>

    const user= await getUser(userId)
    if (!user) return <div>No User to unlinnk</div>

    async function onSubmit(){
        "use server"
        
        const updated= disconnect(parseInt(agencyId), userId)
        revalidatePath("/super/agencies")
        redirect("/super/agencies")
    }


    return (
        <div className="flex flex-col items-center w-full my-5 space-y-6">
            <div className="flex flex-col items-center">
                <p className="text-xl font-medium text-center">
                    Disconnect Agency {agency.name} from User {user.email}?
                </p>

                <Separator className="my-5" />
                
                <form action={onSubmit}>
                    <Button>Unlink</Button>
                </form>
            </div>
        
        </div>
    )
}