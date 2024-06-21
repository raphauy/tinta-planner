"use client"

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Pencil, PlusCircle, Trash2 } from "lucide-react";
import { useState } from "react";
import { DeleteEnvioForm, EnvioForm, SendToAllForm, TestEnvioForm } from "./envio-forms";
import { Send } from "lucide-react";

  
type Props= {
  id?: string
  clientId: number
}

const addTrigger= <Button variant="outline"><PlusCircle size={22} className="mr-2"/>Create Envio</Button>
const updateTrigger= <Pencil size={30} className="pr-2 hover:cursor-pointer"/>

export function EnvioDialog({ id, clientId }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {id ? updateTrigger : addTrigger }
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{id ? 'Update' : 'Create'} Envio
          </DialogTitle>
        </DialogHeader>
        <EnvioForm closeDialog={() => setOpen(false)} id={id} clientId={clientId} />
      </DialogContent>
    </Dialog>
  )
}


type DeleteProps= {
  id?: string
  description: string
}

  
export function DeleteEnvioDialog({ id, description }: DeleteProps) {
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Trash2 className="hover:cursor-pointer"/>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Envio</DialogTitle>
          <DialogDescription className="py-8">{description}</DialogDescription>
        </DialogHeader>
        <DeleteEnvioForm closeDialog={() => setOpen(false)} id={id} />
      </DialogContent>
    </Dialog>
  )
}

type TestProps= {
  envioId: string
}

export function TestEnvioDialog({ envioId }: TestProps) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="whitespace-nowrap">Email de Prueba</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Enviar Test Email</DialogTitle>
        </DialogHeader>
        <TestEnvioForm closeDialog={() => setOpen(false)} envioId={envioId} />
      </DialogContent>
    </Dialog>
  )
}

type SendToAllProps= {
  envioId: string
  description: string
}


export function SendToAllDialog({ envioId, description }: SendToAllProps) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2 whitespace-nowrap">
          <p>Enviar a todos</p>
          <Send className="h-4"/>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Enviar Newsletter a todos los contactos</DialogTitle>
          <DialogDescription className="py-8">{description}</DialogDescription>
        </DialogHeader>
        <SendToAllForm closeDialog={() => setOpen(false)} envioId={envioId} />
      </DialogContent>
    </Dialog>
  )
}

