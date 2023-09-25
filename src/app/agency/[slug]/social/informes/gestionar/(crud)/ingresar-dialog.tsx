"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Informe } from "@prisma/client"
import { useState } from "react"
import { InformeForm, InformeFormValues } from "./informe-form"
import { IndicatorValue } from "./actions"
import { IngresarForm } from "./ingresar-form"

interface Props{
  title: string
  trigger: React.ReactNode
  indicators: IndicatorValue[]
  update: (slug: string, json: string) => void
}

export function IngresarDialog({ title, trigger, indicators, update }: Props) {
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
        <IngresarForm indicators={indicators} update={update} closeDialog={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  )
}
