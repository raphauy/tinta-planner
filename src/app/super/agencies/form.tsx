"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { Agency } from "@prisma/client"

const formSchema = z.object({
  name: z.string()
    .min(2, { message: "Name must be at least 2 characters." })
    .max(30,{ message: "Name must not be longer than 30 characters." }),
})

export type FormValues = z.infer<typeof formSchema>

// This can come from your database or API.
const defaultValues: Partial<FormValues> = {}

interface Props{
  agency?: Agency
  processData: (data: FormValues) => Promise<Agency | null>
}

export function AgencyForm({ agency, processData }: Props) {
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
            description: "No se pudo crear el módulo",
        })      
        return
    }

    let message= "Agency created 🏁"
    if (agency)
      message= "Agency edited 🏁"

    toast({
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <p className="text-xl text-white">{message}</p>
        </pre>
      ),
    })

    router.push(`/super/agencies?refresh=${new Date().getMilliseconds()}`)
  }

  useEffect(() => {
    // set fields por edit mode
    if (agency) {
      
      form.setValue("name", agency.name)
    }
  
  }, [form, agency])

  return (
    <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                    <Input placeholder="Agency ..." {...field} />
                    </FormControl>
                    <FormDescription>
                    This is the name of the Agency
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