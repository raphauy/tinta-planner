"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { useState } from "react"
import { DataUser, createAgencyUserAction } from "./actions"
import { UserForm, UserFormValues } from "./user-form"

interface Props{
  agencyId: number
  title: string
  trigger: React.ReactNode
  id?: string
  create: (agencyId: number, json: UserFormValues) => Promise<DataUser | null>
  update: (userId: string, json: UserFormValues) => Promise<DataUser | null>
}

export function UserDialog({ agencyId, title, trigger, id, create, update }: Props) {
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
        <UserForm agencyId={agencyId} 
          create={createAgencyUserAction} 
          update={update} 
          closeDialog={() => setOpen(false)} 
          id={id} 
        />
      </DialogContent>
    </Dialog>
  )
}
