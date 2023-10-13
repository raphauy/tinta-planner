"use client"

import { LoadingSpinnerChico } from "@/components/LoadingSpinner"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { toast } from "@/components/ui/use-toast"
import { DialogDescription } from "@radix-ui/react-dialog"
import { Trash2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"

interface Props{
  id: string
  tipo: string
  nombre: string
  back: boolean
  eliminate: (id: string) => Promise<boolean>
}

export function DeleteDialog({ id, tipo, nombre, back, eliminate}: Props) {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const router= useRouter()

  async function handleClick() {
    setLoading(true)
    await eliminate(id)
    setLoading(false)

    toast({title: "Eliminado" })

    setOpen(false)

    if (back)
      router.back()
    else
      router.refresh()
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Trash2 size={20} className="text-red-400 hover:cursor-pointer"/>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Eliminar {tipo}</DialogTitle>
          <DialogDescription className="py-8">¿Estás seguro que deseas eliminar {nombre}?</DialogDescription>
        </DialogHeader>
          <div>
            <Button onClick={() => setOpen(false)} type="button" variant={"secondary"} className="w-32">Cancelar</Button>
            <Button onClick={handleClick} variant="destructive" className="w-32 ml-2">
            {
                loading ? 
                <LoadingSpinnerChico /> :
                <p>Eliminar</p>
              }
            </Button>
          </div>
      </DialogContent>
    </Dialog>
  )
}
