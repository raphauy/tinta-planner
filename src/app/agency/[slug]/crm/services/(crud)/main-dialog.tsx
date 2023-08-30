"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Service } from "@prisma/client"
import { useState } from "react"
import { ServiceForm, ServiceFormValues } from "./main-form"

interface Props{
  title: string
  trigger: React.ReactNode
  id?: string
  create: (slug: string, json: ServiceFormValues) => Promise<Service | null>
  update: (slug: string, id: string, json: ServiceFormValues) => Promise<Service | null>
}

export function ServiceDialog({ title, trigger, id, create, update }: Props) {
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
        <ServiceForm create={create} update={update} closeDialog={() => setOpen(false)} id={id} />
      </DialogContent>
    </Dialog>
  )
}
