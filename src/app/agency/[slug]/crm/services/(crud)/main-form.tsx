"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"

import { LoadingSpinnerChico } from "@/components/LoadingSpinner"
import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/use-toast"
import { getSlug } from "@/lib/utils"
import { Service } from "@prisma/client"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import { getDataService } from "./actions"
import { Textarea } from "@/components/ui/textarea"

const schema = z.object({
  name: z.string().min(2, { message: "(debe tener al menos 2 caracteres)" }),
  description: z.string().min(2, { message: "(debe tener al menos 2 caracteres)" }),
  price: z.string().refine((val) => !isNaN(Number(val)), { message: "(debe ser un número)" }),
  emoji: z.string().optional(),
})

export type ServiceFormValues = z.infer<typeof schema>

const defaultValues: Partial<ServiceFormValues> = {}

interface Props{
  id?: string
  create: (slug: string, json: ServiceFormValues) => Promise<Service | null>
  update: (slug: string, id: string, json: ServiceFormValues) => Promise<Service | null>
  closeDialog?: () => void
}

export function ServiceForm({ id, create, update, closeDialog }: Props) {
  const form = useForm<ServiceFormValues>({
    resolver: zodResolver(schema),
    defaultValues,
    mode: "onChange",
  })
  const [loading, setLoading] = useState(false)
  const path= usePathname()
  const slug= getSlug(path)

  async function onSubmit(data: ServiceFormValues) {
    setLoading(true)
    let message= null
    if (id) {
      await update(slug, id, data)
      message= "Service editado"
    } else {
      await create(slug, data)
      message= "Service creado"
    }
    setLoading(false)
      
    toast({title: message })

    closeDialog && closeDialog()

  }

  useEffect(() => {
    if (id) {
      getDataService(id).then((data) => {
        if (!data) return
        form.setValue("name", data.name)
        form.setValue("description", data.description || "")
        form.setValue("price", data.price+"")
        form.setValue("emoji", data.emoji)
      })
    }
  
  }, [form, id])


  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="py-4 space-y-8 bg-white ">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center h-8 gap-4">
              <FormLabel>Nombre</FormLabel>
                <FormMessage />
              </div>
              <FormControl>
                <Input placeholder="Nombre del servicio" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descripción</FormLabel>
              <FormControl>
                <Textarea
                  placeholder=""                  
                  {...field}
                  rows={7}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        /> 

        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center h-8 gap-4">
                <FormLabel>Precio</FormLabel>                
                <FormMessage />
              </div>
              <FormControl>                
                <Input placeholder="" {...field} />
              </FormControl>              
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="emoji"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center h-8 gap-4">
                <FormLabel>Emoji</FormLabel>                
                <FormMessage />
              </div>
              <FormControl>                
                <Input placeholder="" {...field} />
              </FormControl>              
            </FormItem>
          )}
        />
        <div className="flex justify-end">
          <Button onClick={() => closeDialog && closeDialog()} type="button" variant={"secondary"} className="w-32">Cancelar</Button>
          <Button type="submit" className="w-32 ml-2" >{loading ? <LoadingSpinnerChico /> : <p>Guardar</p>}</Button>
        </div>
      </form>
    </Form>
  )
}