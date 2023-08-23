"use client"

import { Button } from "@/components/ui/button";
import { Wine } from "@prisma/client";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

interface Props {
  slug: string
  eliminate: () => Promise<Wine | null>;
}

export default function DeleteForm({ slug, eliminate }: Props) {
  const router= useRouter()

  async function handleClick() {
    await eliminate()

    toast.success("Vino eliminado", { duration: 4000 })

    router.push(`/admin/${slug}/wines?refresh=${new Date().getMilliseconds()}`)
  }
  
  return (
    <div>
      <Button
        onClick={() => history.back()}
        type="button"
        variant={"secondary"}
        className="w-32"
      >
        Cancelar
      </Button>
      <Button onClick={handleClick} variant="destructive" className="w-32 ml-2">
        Eliminar
      </Button>
    </div>
  )
}
