"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { useState } from "react"
import { NoteForm, NoteFormValues } from "./note-form"
import { Note } from "@prisma/client"

interface Props{
  title: string
  trigger: React.ReactNode
  id?: string
  leadId: string
  create: (json: NoteFormValues) => Promise<Note | null>
  update: (id: string, json: NoteFormValues) => Promise<Note | null>
  updateNotes: () => void
}


export function NoteDialog({ title, trigger, id, leadId, create, update, updateNotes }: Props) {
  const [open, setOpen] = useState(false)

  function handleClose() {
    setOpen(false)
    updateNotes()
  }
  
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <NoteForm create={create} update={update} leadId={leadId} closeDialog={handleClose} id={id} />
      </DialogContent>
    </Dialog>
  )
}
