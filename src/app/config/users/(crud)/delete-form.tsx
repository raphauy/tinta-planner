"use user"

import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { useState } from "react";
import { DataUser } from "./actions";
import { LoadingSpinnerChico } from "@/components/LoadingSpinner";

interface Props {
  id: string
  eliminate: (id: string) => Promise<DataUser | null>
  closeDialog: () => void
}

export default function DeleteForm({ id, eliminate, closeDialog }: Props) {
  const [loading, setLoading] = useState(false)

  async function handleClick() {
    setLoading(true)
    await eliminate(id)
    setLoading(false)
    closeDialog && closeDialog()

    toast({title: "Usuario eliminado" })
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
