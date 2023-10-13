"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { set, useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"

import { LoadingSpinnerChico } from "@/components/LoadingSpinner"
import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/use-toast"
import { getSlug } from "@/lib/utils"
import { Lead } from "@prisma/client"
import { usePathname, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { DataLead, getDataLead } from "../(crud)/actions"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DataService } from "../../services/(crud)/actions"
import Link from "next/link"
import { IconBadge } from "@/components/icon-badge"
import { LayoutDashboard, Pencil } from "lucide-react"

export const types = ["Bodega", "Distribuidor", "Importador", "WSET"]

const schema = z.object({
  title: z.string().nonempty({ message: "Campo obligatorio" }),
})

export type TitleFormValues = z.infer<typeof schema>

interface Props{
  id: string
  initialData: {
    title: string
  }
  update: (id: string, json: TitleFormValues) => Promise<boolean>
}

export function TitleForm({ id, initialData, update }: Props) {

  const form = useForm<TitleFormValues>({
    resolver: zodResolver(schema),
    defaultValues: initialData,
    mode: "onChange",
  })
  const { isSubmitting, isValid } = form.formState
  const [isEditing, setIsEditing] = useState(false)
  const toggleEdit = () => setIsEditing(!isEditing)

  const router = useRouter()
  const [loading, setLoading] = useState(false)

  async function onSubmit(data: TitleFormValues) {
    setLoading(true)
    const ok= await update(id, data)
    
    if (ok)
      toast({title: "Título editado" })
    else
      toast({title: "Error al editar la nota", variant: "destructive"})

    toggleEdit()

    router.refresh()

    setLoading(false)
    }


  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>

          <div className="flex items-center justify-between font-medium">
            {
              isEditing ? (
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input                   
                          className="bg-white"
                          autoFocus
                          disabled={isSubmitting}
                          placeholder="e.g. 'Advanced web development'"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                ) : (
                  <Button onClick={toggleEdit} variant="ghost" type="button" className="p-0 text-lg font-bold">
                    {initialData.title}
                  </Button>
                )
            }
            <Button onClick={toggleEdit} variant="ghost" type="button">
              {isEditing ? (
                <>Cancelar</>
              ) : (
                <>
                  <Pencil size={18}/>
                </>
              )}
            </Button>
          </div>

          <div className="flex items-center gap-x-2">
            <Button type="submit" className="hidden" >
              {loading ? <LoadingSpinnerChico /> : <p>Guardar</p>}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}