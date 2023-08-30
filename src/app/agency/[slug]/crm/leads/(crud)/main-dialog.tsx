"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Lead } from "@prisma/client"
import { useEffect, useState } from "react"
import { DataService, getDataServices } from "../../services/(crud)/actions"
import { LeadForm, LeadFormValues } from "./main-form"

interface Props{
  title: string
  trigger: React.ReactNode
  id?: string
  clientId: number
  create: (json: LeadFormValues) => Promise<Lead | null>
  update: (id: string, json: LeadFormValues) => Promise<Lead | null>
}

export function LeadDialog({ title, trigger, id, clientId, create, update }: Props) {
  const [open, setOpen] = useState(false)
  const [services, setServices] = useState<DataService[]>([])

  useEffect(() => {
    async function getServices() {
      const services= await getDataServices(clientId)
      setServices(services)
    }
    getServices()
  }, [clientId])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <LeadForm create={create} update={update} services={services} closeDialog={() => setOpen(false)} id={id} />
      </DialogContent>
    </Dialog>
  )
}
