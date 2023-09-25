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
import { Indicator } from "@prisma/client"
import { usePathname, useRouter } from "next/navigation"
import React, { useEffect, useState } from "react"
import { getDataIndicator } from "./actions"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

import * as LucideIcons from "lucide-react"
import Link from "next/link"

export const types= [
  "Instagram",
  "Facebook",
  "Linkedin",
]

export const icons= [
  "User",
  "UserCheck",
  "UserPlus",
  "Grip",
  "GitFork",
  "Expand",
  "BarChartBig",
  "BarChart3",
  "AreaChart",
  "Eye",
  "Target",
  "Video",
  "Camera",
  "Contact",
]


const schema = z.object({
  name: z.string().min(2, { message: "(debe tener al menos 2 caracteres)" }),
  description: z.string().optional(),
  type: z.string(),
  icon: z.string(),
  order: z.string().refine((val) => !isNaN(Number(val)), { message: "(debe ser un número)" }).optional(),
})

export type IndicatorFormValues = z.infer<typeof schema>

const defaultValues: Partial<IndicatorFormValues> = {}

interface Props{
  id?: string
  create: (json: IndicatorFormValues) => Promise<Indicator | null>
  update: (indicatorId: string, json: IndicatorFormValues) => Promise<Indicator | null>
  closeDialog?: () => void
}

export function IndicatorForm({ id, create, update, closeDialog }: Props) {
  const form = useForm<IndicatorFormValues>({
    resolver: zodResolver(schema),
    defaultValues,
    mode: "onChange",
  })
  const [loading, setLoading] = useState(false)
  const path= usePathname()
  const slug= getSlug(path)

  async function onSubmit(data: IndicatorFormValues) {
    setLoading(true)
    let message= null
    if (id) {
      await update(id, data)
      message= "Indicador editado 🏁"
    } else {
      await create(data)
      message= "Indicador creado 🏁"
    }
    setLoading(false)
      
    toast({title: message })

    closeDialog && closeDialog()

  }

  useEffect(() => {
    if (id) {
      getDataIndicator(id).then((data) => {
        if (!data) return
        form.setValue("name", data.name)
        form.setValue("description", data.description || "")
        form.setValue("type", data.type)
        form.setValue("icon", data.icon)
        form.setValue("order", data.order+"")
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
                <Input placeholder="Nombre del Indicator" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="icon"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center h-8 gap-4">
                <FormLabel>Ícono</FormLabel>
                <FormMessage />
              </div>
              <div className="flex gap-4 ">
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="w-32">
                      <SelectValue className="text-muted-foreground" placeholder="Íconos" />                    
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {icons.map(type => {
                      // @ts-ignore
                      const iconComponent= LucideIcons[type]
                      return (
                        <SelectItem key={type} value={type}>{React.createElement(iconComponent)}</SelectItem>
                    )})
                    }
                  </SelectContent>
                </Select>

                <div className="flex flex-col items-end w-full">
                  <FormControl>
                    <Input placeholder="Ícono del Indicator" {...field} />
                  </FormControl>
                  <Link href="https://lucide.dev/icons" target="_blank"><Button variant="link">lucide.dev</Button></Link>
                </div>

              </div>
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
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tipo de Indicador</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    {
                      id ? 
                      <SelectValue className="text-muted-foreground">{form.getValues("type")}</SelectValue> :
                      <SelectValue className="text-muted-foreground" placeholder="Seleccione el tipo" />
                    }
                    
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {types.map(type => (
                    <SelectItem key={type} value={type}>{type}</SelectItem>
                  ))
                  }
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="order"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center h-8 gap-4">
                <FormLabel>Orden de aparición en el informe</FormLabel>                
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