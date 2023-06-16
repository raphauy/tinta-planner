"use client"

import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { User } from "@prisma/client";
import { useRouter } from "next/navigation";

interface Props {
  id: string
  eliminate: () => Promise<User | null>;
}

export default function DeleteForm({ id, eliminate }: Props) {
  const router= useRouter()

  async function handleClick() {
    const deleted= await eliminate()

    if (deleted) {
      toast({
        description: (
          <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
            <p className="text-xl text-white">User deleted</p>
          </pre>
        ),
      })  
    } else {
      toast({
        variant: "destructive",
        title: "User not deleted",        
        description: (          
          <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
            <p className="text-xl text-white">Something went wrong</p>
          </pre>
        ),
      })  
    }

    router.push(`/super/users?refresh=${new Date().getMilliseconds()}`)
  }
  
  return (
    <div>
      <Button
        onClick={() => history.back()}
        type="button"
        variant={"secondary"}
        className="w-32"
      >
        Cancel
      </Button>
      <Button onClick={handleClick} variant="destructive" className="w-32 ml-2">
        Delete
      </Button>
    </div>
  )
}
