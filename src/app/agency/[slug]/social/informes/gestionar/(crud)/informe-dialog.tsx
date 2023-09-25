"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Informe } from "@prisma/client"
import { useState } from "react"
import { InformeForm, InformeFormValues } from "./informe-form"

interface Props{
  title: string
  trigger: React.ReactNode
  id?: string
  create: (slug: string, json: InformeFormValues) => Promise<Informe | null>
  update: (reportdefinitionId: string, json: InformeFormValues) => Promise<Informe | null>
}

export function InformeDialog({ title, trigger, id, create, update }: Props) {
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
        <InformeForm create={create} update={update} closeDialog={() => setOpen(false)} id={id} />
      </DialogContent>
    </Dialog>
  )
}
