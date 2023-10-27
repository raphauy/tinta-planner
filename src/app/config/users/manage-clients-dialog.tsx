"use client"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { useState } from "react"
import { DataClient } from "./(crud)/actions"
import UserClientsBox from "./user-clients-box"

interface Props{
  userId: string
  title: string
  setClientsToUserAction: (userId: string, clients: DataClient[]) => Promise<boolean>
}

export function ManageClientsDialog({ userId, title, setClientsToUserAction }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="h-7">Gestionar</Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <UserClientsBox userId={userId} setClientsToUserAction={setClientsToUserAction} closeDialog={() => setOpen(false)}/>
      </DialogContent>
    </Dialog>
  )
}
