"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Indicator } from "@prisma/client"
import { useState } from "react"
import { IndicatorForm, IndicatorFormValues } from "./indicator-form"

interface Props{
  title: string
  trigger: React.ReactNode
  id?: string
  create: (json: IndicatorFormValues) => Promise<Indicator | null>
  update: (indicatorId: string, json: IndicatorFormValues) => Promise<Indicator | null>
}

export function IndicatorDialog({ title, trigger, id, create, update }: Props) {
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
        <IndicatorForm create={create} update={update} closeDialog={() => setOpen(false)} id={id} />
      </DialogContent>
    </Dialog>
  )
}
