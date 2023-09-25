"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"

import { LoadingSpinnerChico } from "@/components/LoadingSpinner"
import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/use-toast"
import { Informe } from "@prisma/client"
import { use, useEffect, useState } from "react"
import { getDataInforme } from "./actions"

import { es } from "date-fns/locale"
import { useParams } from "next/navigation"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { format } from "date-fns"
import { Textarea } from "@/components/ui/textarea"

const schema = z.object({
  name: z.string().min(2, { message: "(debe tener al menos 2 caracteres)" }),
  month: z.date(),
  notasFacebook: z.string().optional(),
  notasInstagram: z.string().optional(),
  notasLinkedin: z.string().optional(),
})

export type InformeFormValues = z.infer<typeof schema>

const defaultValues: Partial<InformeFormValues> = {}

interface Props{
  id?: string
  create: (slug: string, json: InformeFormValues) => Promise<Informe | null>
  update: (reportdefinitionId: string, json: InformeFormValues) => Promise<Informe | null>
  closeDialog?: () => void
}

export function InformeForm({ id, create, update, closeDialog }: Props) {
  const form = useForm<InformeFormValues>({
    resolver: zodResolver(schema),
    defaultValues,
    mode: "onChange",
  })
  const month= form.watch("month")
  const params= useParams()
  const slug= params.slug.toString()
  const [loading, setLoading] = useState(false)
  
  async function onSubmit(data: InformeFormValues) {
    setLoading(true)
    let message= null
    if (id) {
      await update(id, data)
      message= "Informe editado 🏁"
    } else {
      await create(slug, data)
      message= "Informe creado 🏁"
    }
    setLoading(false)
      
    toast({title: message })

    closeDialog && closeDialog()

  }

  useEffect(() => {
    if (id) {
      getDataInforme(id).then((data) => {
        if (!data) return
        form.setValue("name", data.name)
        form.setValue("month", data.month)
        data.notasFacebook && form.setValue("notasFacebook", data.notasFacebook)
        data.notasInstagram && form.setValue("notasInstagram", data.notasInstagram)
        data.notasLinkedin && form.setValue("notasLinkedin", data.notasLinkedin)
      })
    } else {
      form.setValue("month", new Date())
    }
  
  }, [form, id])

  useEffect(() => {
    if (!month) return
    const title= "Informe RRSS " + unSlug(slug) + " - " + format(month, "MMMM yyyy", {locale: es})
    form.setValue("name", title)
    
  
  }, [month,form, slug])
  


  
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="py-4 space-y-8 bg-white ">
        <FormField
          control={form.control}
          name="month"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <div className="flex items-center gap-2">
                <FormLabel>Mes del Informe: </FormLabel>              
                <DatePicker
                  className="cursor-pointer"
                  selected={field.value} 
                  onChange={field.onChange}
                  dateFormat="MMMM yyyy"
                  locale={es}
                  showMonthYearPicker
                  showFullMonthYearPicker
                  preventOpenOnFocus
                />

              </div>
              
              <FormMessage />

            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center h-8 gap-4">
              <FormLabel>Título</FormLabel>
                <FormMessage />
              </div>
              <FormControl>
                <Input placeholder="Título del Informe" {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        {id && (<FormField
                    control={form.control}
                    name="notasFacebook"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Notas Facebook</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder=""                  
                            {...field}
                            rows={3}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />)       
        }

        {id && (<FormField
                    control={form.control}
                    name="notasInstagram"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Notas Instagram</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder=""                  
                            {...field}
                            rows={3}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />)       
        }

        {id && (<FormField
                    control={form.control}
                    name="notasLinkedin"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Notas Linkedin</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder=""                  
                            {...field}
                            rows={3}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />)       
        }

       <div className="flex justify-end">
          <Button onClick={() => closeDialog && closeDialog()} type="button" variant={"secondary"} className="w-32">Cancelar</Button>
          <Button type="submit" className="w-32 ml-2" >{loading ? <LoadingSpinnerChico /> : <p>Guardar</p>}</Button>
        </div>
      </form>
    </Form>
  )
}

function unSlug(slug: string) {
  return slug.replace(/-/g, " ").replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase())))  
}