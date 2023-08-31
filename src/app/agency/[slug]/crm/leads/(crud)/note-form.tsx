"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"

import { LoadingSpinnerChico } from "@/components/LoadingSpinner"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"
import { useEffect, useState } from "react"
import { DataNote, getDataNoteAction } from "./actions"
import { utcToZonedTime } from "date-fns-tz"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import { Note } from "@prisma/client"
import { Input } from "@/components/ui/input"

const schema = z.object({
  title: z.string().nonempty({ message: "Campo obligatorio" }),
  text: z.string().optional(),
  leadId: z.string(),
})

export type NoteFormValues = z.infer<typeof schema>

const defaultValues: Partial<NoteFormValues> = {}

interface Props{
  id?: string
  leadId: string
  create: (json: NoteFormValues) => Promise<Note | null>
  update: (id: string, json: NoteFormValues) => Promise<Note | null>
  closeDialog?: () => void
}

export function NoteForm({ id, leadId, create, update, closeDialog }: Props) {

  const form = useForm<NoteFormValues>({
    resolver: zodResolver(schema),
    defaultValues,
    mode: "onChange",
  })
  const [loading, setLoading] = useState(false)
  const [noteToEdit, setNoteToEdit] = useState<DataNote>()
  const [noteDate, setNoteDate] = useState("")

  async function onSubmit(data: NoteFormValues) {
    setLoading(true)
    let message= null
    if (id) {
      await update(id, data)
      message= "Nota editada"
    } else {
      await create(data)
      message= "Nota creada"
    }
    setLoading(false)
      
    toast({title: message })

    closeDialog && closeDialog()

  }

  useEffect(() => {
    form.setValue("leadId", leadId)
    let date= new Date()

    if (id) {
      getDataNoteAction(id).then((data) => {
        if (!data) return
        setNoteToEdit(data)
        form.setValue("title", data.title)
        form.setValue("text", data.text || "")
        date= new Date(data.createdAt)
      })      
    }
    const now = utcToZonedTime(date, 'America/Montevideo')
    const formattedDate= format(now, "MMMM dd, yyyy", { locale: es })
    setNoteDate(formattedDate)
  
  }, [form, id, noteToEdit, leadId])


  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="py-2 space-y-2 bg-white ">


        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex justify-between">
                <p>Título</p>
                <p>{noteDate}</p>                
              </FormLabel>
              <FormControl>
                <Input placeholder="Nombre de la compañía" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="text"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Texto</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Texto de la nota"                  
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