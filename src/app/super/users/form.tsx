"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/use-toast"
import { User } from "@prisma/client"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

const formSchema = z.object({
  name: z.string(),
  email: z.string().email()
})

export type FormValues = z.infer<typeof formSchema>

// This can come from your database or API.
const defaultValues: Partial<FormValues> = {}

interface Props{
  user?: User
  processData: (data: FormValues) => Promise<User | null>
}

export function UserForm({ user, processData }: Props) {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
    mode: "onChange",
  })
  const router= useRouter()

  async function onSubmit(data: FormValues) {
    const created= await processData(data)
    if (!created) {
        toast({
            variant: "destructive",
            title: "Algo salió mal!",
            description: "No se pudo crear el usuario",
        })      
        return
    }

    let message= "User created 🏁"
    if (user)
      message= "User edited 🏁"

    toast({
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <p className="text-xl text-white">{message}</p>
        </pre>
      ),
    })

    router.push(`/super/users?refresh=${new Date().getMilliseconds()}`)
  }

  useEffect(() => {
    // set fields por edit mode
    if (user) {
      
      user.name && form.setValue("name", user.name)
      user.email && form.setValue("email", user.email)
    }
  
  }, [form, user])

  return (
    <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                    <Input placeholder="Juan Pérez" {...field} />
                    </FormControl>
                    <FormDescription>
                    This is the user name
                    </FormDescription>
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
                    <Input placeholder="name@email.com" {...field} />
                    </FormControl>
                    <FormDescription>
                    This is the user email
                    </FormDescription>
                    <FormMessage />
                </FormItem>
                )}
            />
            <Button onClick={() => history.back()} type="button" variant={"secondary"} className="w-32">Cancel</Button>
            <Button type="submit" className="w-32 ml-2">Save</Button>
      </form>
    </Form>
  )
}