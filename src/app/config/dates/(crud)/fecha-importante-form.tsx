"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"

import { LoadingSpinnerChico } from "@/components/LoadingSpinner"
import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/use-toast"
import { cn, getSlug } from "@/lib/utils"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import { DataFechaImportante, getClientIdBySlug, getDataFechaImportante } from "./actions"

import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import { CalendarIcon } from "lucide-react"

const schema = z.object({
  title: z.string().min(2, { message: "(debe tener al menos 2 caracteres)" }),
  date: z.date(),
  clientId: z.number().optional(),
})

export type FechaImportanteFormValues = z.infer<typeof schema>

const defaultValues: Partial<FechaImportanteFormValues> = {
  date: new Date(),
}

interface Props{
  global: boolean
  create: (json: FechaImportanteFormValues) => Promise<DataFechaImportante | null>
  update: (fechaimportanteId: string, json: FechaImportanteFormValues) => Promise<DataFechaImportante | null>
}

export function FechaImportanteForm({ global, create, update }: Props) {
  const form = useForm<FechaImportanteFormValues>({
    resolver: zodResolver(schema),
    defaultValues,
    mode: "onChange",
  })
  const [loading, setLoading] = useState(false)
  const [startMonth, setStartMonth] = useState<Date>()
  const path= usePathname()
  const slug= getSlug(path)
  const router= useRouter()
  const [id, setId] = useState("")
  const searchParams= useSearchParams()

  async function onSubmit(data: FechaImportanteFormValues) {
    setLoading(true)
    let message= null
    if (id) {
      await update(id, data)
      message= "Fecha importante editada 🏁"
    } else {
      await create(data)
      message= "Fecha importante creada 🏁"
    }
    setLoading(false)
      
    toast({title: message })

    if (global) 
      router.push("/config/dates")
    else 
      router.push(`/agency/${slug}/social/dates`)

  }

  useEffect(() => {
    const idParam= searchParams.get("id")
    if (idParam)
      setId(idParam)
    
    if (global) {
      form.setValue("clientId", undefined)
    } else {
      getClientIdBySlug(slug).then((clientId) => {
        if (!clientId) return
        form.setValue("clientId", clientId)
      })
    }

    if (idParam) {
      getDataFechaImportante(idParam).then((data) => {
        if (!data) return
        form.setValue("title", data.titulo)
        form.setValue("date", data.fecha)
        setStartMonth(data.fecha)
      })
    } else {
      setStartMonth(new Date())
    }
  
  }, [id, global, slug, form, searchParams])

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="max-w-lg p-4 py-4 space-y-8 bg-white w-96">
        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Fecha</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[240px] pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP", { locale: es })
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="w-4 h-4 ml-auto opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date < new Date("1900-01-01")
                    }
                    month={startMonth}
                    onMonthChange={setStartMonth}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center h-8 gap-4">
              <FormLabel>Título</FormLabel>
                <FormMessage />
              </div>
              <FormControl>
                <Input placeholder="Día del Tannat" {...field} />
              </FormControl>
            </FormItem>
          )}
        />


       <div className="flex justify-end">
          <Button onClick={() => router.back()} type="button" variant={"secondary"} className="w-32">Cancelar</Button>
          <Button type="submit" className="w-32 ml-2" >{loading ? <LoadingSpinnerChico /> : <p>Guardar</p>}</Button>
        </div>
      </form>
    </Form>
  )
}