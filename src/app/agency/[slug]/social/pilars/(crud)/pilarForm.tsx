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
import { Pilar } from "@prisma/client"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import { getDataPilar } from "./actions"
import { Textarea } from "@/components/ui/textarea"

const schema = z.object({
  name: z.string().min(2, { message: "(debe tener al menos 2 caracteres)" }),
  description: z.string().min(2, { message: "(debe tener al menos 2 caracteres)" }),
  color: z.string({ required_error: "Debe seleccionar un color" }),
})

export type PilarFormValues = z.infer<typeof schema>

const defaultValues: Partial<PilarFormValues> = {
  color: "#DDBBC0",
}

interface Props{
  id?: number
  create: (slug: string, json: PilarFormValues) => Promise<Pilar | null>
  update: (slug: string, id: number, json: PilarFormValues) => Promise<Pilar | null>
  closeDialog?: () => void
}

export function PilarForm({ id, create, update, closeDialog }: Props) {
  const form = useForm<PilarFormValues>({
    resolver: zodResolver(schema),
    defaultValues,
    mode: "onChange",
  })
  const [loading, setLoading] = useState(false)
  const path= usePathname()
  const slug= getSlug(path)

  async function onSubmit(data: PilarFormValues) {
    setLoading(true)
    let message= null
    if (id) {
      await update(slug, id, data)
      message= "Pilar editado"
    } else {
      await create(slug, data)
      message= "Pilar creado"
    }
    setLoading(false)
      
    toast({title: message })

    closeDialog && closeDialog()

  }

  useEffect(() => {
    if (id) {
      getDataPilar(id).then((data) => {
        if (!data) return
        form.setValue("name", data.name)
        form.setValue("description", data.description)
        form.setValue("color", data.color)
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
                <Input placeholder="Nombre del pilar" {...field} />
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
          name="color"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center h-8 gap-4">
                <FormLabel>Color</FormLabel>                
                <FormMessage />
              </div>
              <FormControl>                
                <Input type="color" placeholder="" {...field} />
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