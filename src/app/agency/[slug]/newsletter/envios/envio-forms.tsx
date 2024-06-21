"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "@/components/ui/use-toast"
import { useEffect, useState } from "react"
import { deleteEnvioAction, createOrUpdateEnvioAction, getEnvioDAOAction, getNewslettersDataSelectByClientId, sendTestEmailAction, sendEnvioToAllContactsAction } from "./envio-actions"
import { envioSchema, EnvioFormValues } from '@/services/envio-services'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Loader } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { z } from "zod"

export type DataSelect = {
  value: string
  label: string
}

type Props= {
  id?: string
  clientId: number
  closeDialog: () => void
}

export function EnvioForm({ id, clientId, closeDialog }: Props) {
  const form = useForm<EnvioFormValues>({
    resolver: zodResolver(envioSchema),
    defaultValues: {},
    mode: "onChange",
  })
  const [loading, setLoading] = useState(false)
  const [newsLetters, setNewsLetters] = useState<DataSelect[]>([])
  const [label, setLabel] = useState("Seleccionar Newsletter")

  useEffect(() => {
    setLoading(true)
    form.setValue("clientId", clientId)
    getNewslettersDataSelectByClientId(clientId)
    .then((data) => {
      setNewsLetters(data)
    })
    .catch((error) => {
      toast({title: "Error", description: error.message, variant: "destructive"})
    })
    .finally(() => {
      setLoading(false)
    })

  }, [clientId, form])
  


  const onSubmit = async (data: EnvioFormValues) => {
    setLoading(true)
    try {
      await createOrUpdateEnvioAction(id ? id : null, data)
      toast({ title: id ? "Envio updated" : "Envio created" })
      closeDialog()
    } catch (error: any) {
      toast({ title: "Error", description: error.message, variant: "destructive" })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (id) {
      getEnvioDAOAction(id).then((envioDAO) => {
        if (envioDAO) {
          form.reset(envioDAO)
          setLabel(newsLetters.find(data => data.value === envioDAO.newsletterId)?.label || "")
        }
        Object.keys(form.getValues()).forEach((key: any) => {
          if (form.getValues(key) === null) {
            form.setValue(key, "")
          }
        })
      })
    }
  }, [form, id, newsLetters])

  function handleNewsletterChange(value: string) {
    form.setValue("newsletterId", value);
    setLabel(newsLetters.find(data => data.value === value)?.label || "")
  }


  return (
    <div className="p-4 bg-white rounded-md">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          
            <FormDescription className="mb-10">Esta acción solamente crea un envío pero no envía ningún email aún.</FormDescription>
          
            <FormField
              control={form.control}
              name="newsletterId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Newsletter</FormLabel>
                  <Select onValueChange={handleNewsletterChange} defaultValue={field.value+""}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue className="text-muted-foreground">{label}</SelectValue>
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {newsLetters.map(data => (
                          <SelectItem key={data.value} value={data.value}>{data.label}</SelectItem>                      
                        ))
                      }
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

          <FormField
            control={form.control}
            name="emailFrom"
            render={({ field }) => (
              <FormItem>
                <FormLabel>EmailFrom</FormLabel>
                <FormControl>
                  <Input placeholder="Envio's emailFrom" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

        <div className="flex justify-end">
            <Button onClick={() => closeDialog()} type="button" variant={"secondary"} className="w-32">Cancel</Button>
            <Button variant="outline" type="submit" className="w-32 ml-2">
              {loading ? <Loader className="w-4 h-4 animate-spin" /> : <p>Save</p>}
            </Button>
          </div>
        </form>
      </Form>
    </div>     
  )
}

type DeleteProps= {
  id?: string
  closeDialog: () => void
}

export function DeleteEnvioForm({ id, closeDialog }: DeleteProps) {
  const [loading, setLoading] = useState(false)

  async function handleDelete() {
    if (!id) return
    setLoading(true)
    deleteEnvioAction(id)
    .then(() => {
      toast({title: "Envio deleted" })
    })
    .catch((error) => {
      toast({title: "Error", description: error.message, variant: "destructive"})
    })
    .finally(() => {
      setLoading(false)
      closeDialog && closeDialog()
    })
  }
  
  return (
    <div>
      <Button onClick={() => closeDialog && closeDialog()} type="button" variant={"secondary"} className="w-32">Cancel</Button>
      <Button onClick={handleDelete} variant="destructive" className="w-32 gap-1 ml-2">
        { loading && <Loader className="w-4 h-4 animate-spin" /> }
        Delete  
      </Button>
    </div>
  )
}

type TestProps= {
  envioId: string
  closeDialog: () => void
}

export function TestEnvioForm({ envioId, closeDialog }: TestProps) {
  const testEnvioSchema = z.object({
    mailTo: z.string().email({ message: "Invalid email" }),
  })
  
  type TestEnvioFormValues = z.infer<typeof testEnvioSchema>
  
  const form = useForm<TestEnvioFormValues>({
    resolver: zodResolver(testEnvioSchema),
    defaultValues: {},
    mode: "onChange",
  })
  const [loading, setLoading] = useState(false)


  const onSubmit = async (data: TestEnvioFormValues) => {
    setLoading(true)
    try {
      await sendTestEmailAction(envioId, data.mailTo)
      toast({ title: "Test Email sent" })
      closeDialog()
    } catch (error: any) {
      toast({ title: "Error", description: "Verifica que el Newsletter hasya sido guardado.", variant: "destructive" })
    } finally {
      setLoading(false)
    }
  }


  return (
    <div className="p-4 bg-white rounded-md">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          
          <FormField
            control={form.control}
            name="mailTo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email To</FormLabel>
                <FormControl>
                  <Input placeholder="Email To" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

        <div className="flex justify-end">
            <Button onClick={() => closeDialog()} type="button" variant={"secondary"} className="w-32">Cancel</Button>
            <Button variant="outline" type="submit" className="w-32 ml-2">
              {loading ? <Loader className="w-4 h-4 animate-spin" /> : <p>Send Email</p>}
            </Button>
          </div>
        </form>
      </Form>
    </div>     
  )
}


type SendToAllProps= {
  envioId: string
  closeDialog: () => void
}

export function SendToAllForm({ envioId, closeDialog }: SendToAllProps) {
  const [loading, setLoading] = useState(false)

  async function handleDelete() {
    setLoading(true)
    sendEnvioToAllContactsAction(envioId)
    .then(() => {
      toast({title: "Emails enviados" })
    })
    .catch((error) => {
      toast({title: "Error", description: error.message, variant: "destructive"})
    })
    .finally(() => {
      setLoading(false)
      closeDialog && closeDialog()
    })
  }
  
  return (
    <div>
      <Button onClick={() => closeDialog && closeDialog()} type="button" variant={"secondary"} className="w-32">Cancel</Button>
      <Button onClick={handleDelete} className="w-32 gap-1 ml-2">
        { loading && <Loader className="w-4 h-4 animate-spin" /> }
        Send to all  
      </Button>
    </div>
  )
}

