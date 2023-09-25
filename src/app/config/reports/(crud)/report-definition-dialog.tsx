"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { ReportDefinition } from "@prisma/client"
import { useState } from "react"
import { ReportDefinitionForm, ReportDefinitionFormValues } from "./report-definition-form"

interface Props{
  title: string
  trigger: React.ReactNode
  id?: string
  create: (json: ReportDefinitionFormValues) => Promise<ReportDefinition | null>
  update: (reportdefinitionId: string, json: ReportDefinitionFormValues) => Promise<ReportDefinition | null>
}

export function ReportDefinitionDialog({ title, trigger, id, create, update }: Props) {
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
        <ReportDefinitionForm create={create} update={update} closeDialog={() => setOpen(false)} id={id} />
      </DialogContent>
    </Dialog>
  )
}
