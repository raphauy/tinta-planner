"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { LoadingSpinnerChico } from "@/components/LoadingSpinner"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/components/ui/use-toast"
import { useEffect, useState } from "react"
import { DataUser, getCurrentUserData, getUserData } from "./actions"

const formSchema = z.object({  
  name: z.string(),
  email: z.string().email(),    
  role: z.string({required_error: "Role is required."}),
})

export type UserFormValues = z.infer<typeof formSchema>

// This can come from your database or API.
const defaultValues: Partial<UserFormValues> = {}

interface Props{
  agencyId: number
  id?: string
  create: (agencyId: number, data: UserFormValues) => Promise<DataUser | null>
  update: (userId: string, json: UserFormValues) => Promise<DataUser | null>
  closeDialog: () => void
}

export function UserForm({ agencyId, id, create, update, closeDialog }: Props) {
  const form = useForm<UserFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
    mode: "onChange",
  })
  const [loading, setLoading] = useState(false)
  const [roles, setRoles] = useState<string[]>([])

  useEffect(() => {
    getCurrentUserData().then((currentUser) => {
      if(!currentUser) return null
      if(!currentUser.agencyId) return null
    
      const formRoles= ["client", "agency"]
      if (currentUser.rol === "agency-admin" || currentUser.rol === "admin") 
        formRoles.push("agency-admin")

      setRoles(formRoles)
    })

  }, [])
  

  async function onSubmit(data: UserFormValues) {

    setLoading(true)
    let message= null
    if (id) {
      await update(id, data)
      message= "Usuario editado"
    } else {
      await create(agencyId, data)
      message= "Usuario creado"
    }
    setLoading(false)
      
    toast({title: message })

    closeDialog && closeDialog()
  }

  useEffect(() => {

    if (id) {
      getUserData(id).then((data) => {
        if (!data) return
        data.nombre && form.setValue("name", data.nombre)
        form.setValue("email", data.email)
        form.setValue("role", data.rol)
      })
    }  
  }, [form, id])



  return (
    <div className="p-4 bg-white rounded-md">
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre</FormLabel>
              <FormControl>
                <Input placeholder="Nombre del usuario" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Email del usuario" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Rol</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    {
                      id ? 
                      <SelectValue className="text-muted-foreground">{form.getValues("role")}</SelectValue> :
                      <SelectValue className="text-muted-foreground" placeholder="Selecciona un Rol" />
                    }
                    
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {roles.map(role => (
                    <SelectItem key={role} value={role}>{role}</SelectItem>
                  ))
                  }
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      <div className="flex justify-end">
          <Button onClick={() => closeDialog()} type="button" variant={"secondary"} className="w-32">Cancelar</Button>
          <Button type="submit" className="w-32 ml-2" >{loading ? <LoadingSpinnerChico /> : <p>Guardar</p>}</Button>
        </div>
      </form>
    </Form>
   </div>
 )
}