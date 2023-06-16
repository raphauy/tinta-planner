import { connect, getAgencys } from "@/app/(server-side)/services/agencyService";
import { getUser } from "@/app/(server-side)/services/userService";
import Link from "next/link";
import { AgencySelect } from "./agencySelect";
import { revalidatePath } from "next/cache";

interface Props{
    searchParams: {
      action: string
      userId: string
      agencyId: string
    }
  }  
  
export default async function LinkPage({ searchParams }: Props) {
    const userId= searchParams.userId
    const agencyId= searchParams.agencyId


    const action= searchParams.action

    async function onSelect(agencyId: number, userId: string){
    "use server"
        console.log("agencyId " + agencyId);
        console.log("userId " + userId);
        const updated= await connect(agencyId, userId)
        revalidatePath("/super")
        if (updated)
            console.log("connected")

    }
    if (action && action === "connect") {
        console.log("agencyId " + agencyId);
        console.log("userId " + userId);
        const updated= await connect(parseInt(agencyId), userId)
        if (updated)
            return <div>Conneted</div>
    }

    const user= await getUser(userId)
    if (!user) return <div>User not found</div>

    const agencies= await getAgencys()

    
    return (
        <div className="flex flex-col items-center gap-3 mt-5">
            <p>Select the Agency to link with the user</p>
            <p className="font-bold">{user.email}:</p>
            <AgencySelect userId={userId} onSelected={onSelect} />
        </div>
    )
}
