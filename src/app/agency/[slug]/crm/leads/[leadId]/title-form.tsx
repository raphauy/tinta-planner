"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"

import { LoadingSpinnerChico } from "@/components/LoadingSpinner"
import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/use-toast"
import { Pencil } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"

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
      toast({title: "Error al editar el título", variant: "destructive"})

    toggleEdit()

    router.refresh()

    setLoading(false)
  }


  return (
    <div>

            {
              isEditing ? (

                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="flex items-center justify-between gap-1 font-medium">
                      <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              className="h-8 bg-white"
                              autoFocus
                              disabled={isSubmitting}
                              placeholder="ej: 'Primer contacto'"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                      />
                      <Button onClick={toggleEdit} variant="ghost" type="button">
                        <>Cancelar</>
                      </Button>
                      <Button type="submit" className="h-8" >
                        {loading ? <LoadingSpinnerChico /> : <p>Guardar</p>}
                      </Button>
                    </div>
                  </form>
                </Form>

              ) : (
                <Button onClick={toggleEdit} variant="ghost" type="button" className="p-0 text-lg font-bold">
                  {initialData.title}
                </Button>
              )
            }
    </div>
  )
}