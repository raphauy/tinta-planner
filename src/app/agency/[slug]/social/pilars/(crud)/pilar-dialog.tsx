"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Pilar } from "@prisma/client"
import { useState } from "react"
import { PilarForm, PilarFormValues } from "./pilarForm"

interface Props{
  title: string
  trigger: React.ReactNode
  id?: number
  create: (slug: string, json: PilarFormValues) => Promise<Pilar | null>
  update: (slug: string, id: number, json: PilarFormValues) => Promise<Pilar | null>
}

export function PilarDialog({ title, trigger, id, create, update }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <PilarForm create={create} update={update} closeDialog={() => setOpen(false)} id={id} />
      </DialogContent>
    </Dialog>
  )
}
