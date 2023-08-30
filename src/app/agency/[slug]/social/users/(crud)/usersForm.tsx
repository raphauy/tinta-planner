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
import { User } from "@prisma/client"
import { usePathname, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { getDataUser } from "./actions"


const schema = z.object({
  name: z.string().min(2, { message: "(debe tener al menos 2 caracteres)" }),
  email: z.string().email({ message: "(inválido)" }),
})

export type UserFormValues = z.infer<typeof schema>

const defaultValues: Partial<UserFormValues> = {}

interface Props{
  id?: string
  create: (slug: string, json: UserFormValues) => Promise<User | null>
  update: (slug: string, userId: string, json: UserFormValues) => Promise<User | null>
  closeDialog?: () => void
}

export function UserForm({ id, create, update, closeDialog }: Props) {
  const form = useForm<UserFormValues>({
    resolver: zodResolver(schema),
    defaultValues,
    mode: "onChange",
  })
  const [loading, setLoading] = useState(false)
  const path= usePathname()
  const slug= getSlug(path)

  async function onSubmit(data: UserFormValues) {
    setLoading(true)
    let message= null
    if (id) {
      await update(slug, id, data)
      message= "Usuario editado 🏁"
    } else {
      await create(slug, data)
      message= "Usuario creado 🏁"
    }
    setLoading(false)
      
    toast({title: message })

    closeDialog && closeDialog()

  }

  useEffect(() => {
    if (id) {
      getDataUser(id).then((data) => {
        if (!data) return
        form.setValue("name", data.name || "")
        form.setValue("email", data.email || "")
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
                <Input placeholder="User name" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center h-8 gap-4">
                <FormLabel>Email</FormLabel>
                <FormMessage />
              </div>
              <FormControl>
                <Input placeholder="User email" {...field} />
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