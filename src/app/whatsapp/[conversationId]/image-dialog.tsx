"use client"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useState } from "react";

import Image from "next/image";
import { ScrollArea } from "@/components/ui/scroll-area";
  
type Props= {
  name: string
  imageUrl: string
}


export function ImageDialog({ name, imageUrl }: Props) {
  const [open, setOpen] = useState(false);

  // la imagen debe ocupar el 100% del ancho y el 100% del alto del popup
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Image src={imageUrl} alt="media" className="object-cover w-full rounded-lg cursor-pointer" width={300} height={200} />
      </DialogTrigger>
      <DialogContent className="max-w-5xl">
        <DialogHeader>
          <DialogTitle className="text-[#00a884]">{name}</DialogTitle>
        </DialogHeader>
        <ScrollArea className="w-full max-h-[calc(100vh-200px)]">
          <Image src={imageUrl} alt="media" className="object-cover w-full rounded-lg" width={1000} height={600} />
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}
