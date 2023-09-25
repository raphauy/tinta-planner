"use client"

import { LoadingSpinnerChico } from "@/components/LoadingSpinner";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { getSlug } from "@/lib/utils";
import { Indicator } from "@prisma/client";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

interface Props {
  id: string
  eliminate: (id: string) => Promise<Indicator | null>
  closeDialog: () => void
}

export default function DeleteForm({ id, eliminate, closeDialog }: Props) {
  const router= useRouter()
  const [loading, setLoading] = useState(false)
  const path= usePathname()
  const slug= getSlug(path)

  async function handleClick() {
    setLoading(true)
    await eliminate(id)
    setLoading(false)
    closeDialog && closeDialog()

    toast({title: "Indicador eliminado" })
  }
  
  return (
    <div>
      <Button onClick={() => closeDialog && closeDialog()} type="button" variant={"secondary"} className="w-32">Cancelar</Button>
      <Button onClick={handleClick} variant="destructive" className="w-32 ml-2">
      {
          loading ? 
          <LoadingSpinnerChico /> :
          <p>Eliminar</p>
        }
      </Button>
    </div>
  )
}
