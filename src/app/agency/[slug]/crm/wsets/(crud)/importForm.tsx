"use client"

import { LoadingSpinnerChico } from "@/components/LoadingSpinner";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { Wset } from "@prisma/client";
import { usePathname } from "next/navigation";
import { useState } from "react";

interface Props {
  id: string
  importWset: (id: string) => void
  closeDialog: () => void
}

export default function ImportForm({ id, importWset, closeDialog }: Props) {
  const [loading, setLoading] = useState(false)
  const path= usePathname()

  async function handleClick() {
    setLoading(true)
    await importWset(id)
    setLoading(false)
    closeDialog && closeDialog()

    toast({title: "Wset Institute importado" })
  }
  
  return (
    <div>
      <Button onClick={() => closeDialog && closeDialog()} type="button" variant={"secondary"} className="w-32">Cancelar</Button>
      <Button onClick={handleClick} className="w-32 ml-2">
      {
          loading ? 
          <LoadingSpinnerChico /> :
          <p>importar</p>
        }
      </Button>
    </div>
  )
}
