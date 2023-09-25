"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Informe } from "@prisma/client"
import { DialogDescription } from "@radix-ui/react-dialog"
import { useState } from "react"
import DeleteForm from "./delete-form"

interface Props{
  title: string
  description: string
  trigger: React.ReactNode
  id: string
  eliminate: (id: string) =>  Promise<Informe | null>
}

export function DeleteDialog({ title, description, trigger, id, eliminate }: Props) {
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription className="py-8">{description}</DialogDescription>
        </DialogHeader>
        <DeleteForm eliminate={eliminate} closeDialog={() => setOpen(false)} id={id} />
      </DialogContent>
    </Dialog>
  )
}
