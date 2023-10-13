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
import { Textarea } from "@/components/ui/textarea"
import { Preview } from "@/components/preview"
import { Editor } from "@/components/editor"

export const types = ["Bodega", "Distribuidor", "Importador", "WSET"]

const schema = z.object({
  description: z.string(),
})

export type DescriptionFormValues = z.infer<typeof schema>

interface Props{
  id: string
  initialData: {
    description: string
  }
  update: (id: string, json: DescriptionFormValues) => Promise<boolean>
}

export function DescriptionForm({ id, initialData, update }: Props) {

  const form = useForm<DescriptionFormValues>({
    resolver: zodResolver(schema),
    defaultValues: initialData,
    mode: "onChange",
  })
  const { isSubmitting, isValid } = form.formState
  const [isEditing, setIsEditing] = useState(false)
  const toggleEdit = () => setIsEditing(!isEditing)

  const router = useRouter()
  const [loading, setLoading] = useState(false)

  async function onSubmit(data: DescriptionFormValues) {
    setLoading(true)
    const ok= await update(id, data)
    
    if (ok)
      toast({title: "Descripción editada" })
    else
      toast({title: "Error al editar la descripción", variant: "destructive"})

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
              <div className="flex flex-col gap-1">
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Editor                        
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex">
                  <Button onClick={toggleEdit} type="button" variant={"secondary"}>Cancelar</Button>
                  <Button type="submit" className="w-32 h-8 ml-2" >{loading ? <LoadingSpinnerChico /> : <p>Guardar</p>}</Button>
                </div>
              </div>
            </form>
          </Form>
        ) : (
          <div className="flex items-end justify-between">
            <Preview
              value={initialData.description}
            />
            <Button onClick={toggleEdit} type="button" variant="ghost"><Pencil size={18}/></Button>
          </div>
        )
      }
    </div>
  )
}