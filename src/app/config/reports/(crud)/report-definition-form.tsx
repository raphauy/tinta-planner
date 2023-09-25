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
import { ReportDefinition } from "@prisma/client"
import { usePathname, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { getDataReportDefinition } from "./actions"
import { Textarea } from "@/components/ui/textarea"


const schema = z.object({
  name: z.string().min(2, { message: "(debe tener al menos 2 caracteres)" }),
  description: z.string().optional(),
})

export type ReportDefinitionFormValues = z.infer<typeof schema>

const defaultValues: Partial<ReportDefinitionFormValues> = {}

interface Props{
  id?: string
  create: (json: ReportDefinitionFormValues) => Promise<ReportDefinition | null>
  update: (reportdefinitionId: string, json: ReportDefinitionFormValues) => Promise<ReportDefinition | null>
  closeDialog?: () => void
}

export function ReportDefinitionForm({ id, create, update, closeDialog }: Props) {
  const form = useForm<ReportDefinitionFormValues>({
    resolver: zodResolver(schema),
    defaultValues,
    mode: "onChange",
  })
  const [loading, setLoading] = useState(false)

  async function onSubmit(data: ReportDefinitionFormValues) {
    setLoading(true)
    let message= null
    if (id) {
      await update(id, data)
      message= "Reporte editado 🏁"
    } else {
      await create(data)
      message= "Reporte creado 🏁"
    }
    setLoading(false)
      
    toast({title: message })

    closeDialog && closeDialog()

  }

  useEffect(() => {
    if (id) {
      getDataReportDefinition(id).then((data) => {
        if (!data) return
        form.setValue("name", data.name)
        form.setValue("description", data.description || "")
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
                <Input placeholder="Nombre del ReportDefinition" {...field} />
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
       <div className="flex justify-end">
          <Button onClick={() => closeDialog && closeDialog()} type="button" variant={"secondary"} className="w-32">Cancelar</Button>
          <Button type="submit" className="w-32 ml-2" >{loading ? <LoadingSpinnerChico /> : <p>Guardar</p>}</Button>
        </div>
      </form>
    </Form>
  )
}