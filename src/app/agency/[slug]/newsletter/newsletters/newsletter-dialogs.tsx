"use client"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Pencil, PlusCircle, Trash2 } from "lucide-react";
import { useState } from "react";
import { DeleteNewsletterForm, NewsletterForm } from "./newsletter-forms";
import { Button } from "@/components/ui/button";

type AddProps= {
  clientId: number
}

export function AddNewsletterDialog({ clientId }: AddProps) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline"><PlusCircle size={22} className="mr-2"/>Create Newsletter</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Newsletter</DialogTitle>
        </DialogHeader>
        <NewsletterForm closeDialog={() => setOpen(false)} clientId={clientId} />
      </DialogContent>
    </Dialog>
  )
}

type EditProps= {
  id: string
}

export function EditNewsletterDialog({ id }: EditProps) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Pencil size={30} className="pr-2 hover:cursor-pointer"/>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Newsletter</DialogTitle>
        </DialogHeader>
        <NewsletterForm closeDialog={() => setOpen(false)} id={id} />
      </DialogContent>
    </Dialog>
  )
}

type DeleteProps= {
  id: string
  description: string
}

export function DeleteNewsletterDialog({ id, description }: DeleteProps) {
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Trash2 className="hover:cursor-pointer"/>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Newsletter</DialogTitle>
          <DialogDescription className="py-8">{description}</DialogDescription>
        </DialogHeader>
        <DeleteNewsletterForm closeDialog={() => setOpen(false)} id={id} />
      </DialogContent>
    </Dialog>
  )
}

