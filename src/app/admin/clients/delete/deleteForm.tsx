"use client"

import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { Client } from "@prisma/client";
import { useRouter } from "next/navigation";

interface Props {
  id: string
  eliminate: () => Promise<Client | null>;
}

export default function DeleteForm({ id, eliminate }: Props) {
  const router= useRouter()

  async function handleClick() {
    const deleted= await eliminate()

    if (deleted) {
      toast({
        description: (
          <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
            <p className="text-xl text-white">Cliente eliminado</p>
          </pre>
        ),
      })  
    } else {
      toast({
        variant: "destructive",
        title: "Cliente no eliminado",        
        description: (          
          <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
            <p className="text-xl text-white">Algo salió mal</p>
          </pre>
        ),
      })  
    }

    router.push(`/admin/clients?refresh=${new Date().getMilliseconds()}`)
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
