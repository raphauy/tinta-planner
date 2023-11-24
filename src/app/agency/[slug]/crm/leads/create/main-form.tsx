"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"

import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/components/ui/use-toast"
import { Lead } from "@prisma/client"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { DataLead, getDataLead } from "../(crud)/actions"
import { DataService } from "../../services/(crud)/actions"

export const types = ["Bodega", "Asociación", "Distribuidor", "Importador", "WSET", "Lector"]

const schema = z.object({
  company: z.string().nonempty({ message: "Campo obligatorio" }),
  value: z.string().refine((val) => !isNaN(Number(val)), { message: "(debe ser un número)" }).optional(),
  contactName: z.string().optional(),
  contactEmail: z.string().email("Revisa el formato del mail").optional(),
  contactPhone: z.string().optional(),
  serviceId: z.string(),
  website: z.string().optional(),
  linkedin: z.string().optional(),
  instagram: z.string().optional(),
  twitter: z.string().optional(),
  type: z.string().optional(),
})

export type LeadFormValues = z.infer<typeof schema>

const defaultValues: Partial<LeadFormValues> = {}

interface Props{
  id?: string
  services: DataService[]
  create: (json: LeadFormValues) => Promise<Lead | null>
  update: (id: string, json: LeadFormValues) => Promise<Lead | null>
  closeDialog?: () => void
}

export function CreateLeadForm({ id, services, create, update, closeDialog }: Props) {

  const form = useForm<LeadFormValues>({
    resolver: zodResolver(schema),
    defaultValues,
    mode: "onChange",
  })
  const { isSubmitting, isValid } = form.formState
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [leadToEdit, setLeadToEdit] = useState<DataLead>()

  async function onSubmit(data: LeadFormValues) {
    setLoading(true)
    let message= null
    if (id) {
      await update(id, data)
      message= "Lead editado"
    } else {
      await create(data)
      message= "Lead creado"
    }
    setLoading(false)
      
    toast({title: message })

    closeDialog && closeDialog()

  }

  useEffect(() => {
    if (id) {
      getDataLead(id).then((data) => {
        if (!data) return
        setLeadToEdit(data)
        form.setValue("company", data.company)
        form.setValue("value", data.value ? data.value.toString() : "")
        form.setValue("contactName", data.contactName)
        form.setValue("contactEmail", data.contactEmail)
        form.setValue("contactPhone", data.contactPhone)
        form.setValue("serviceId", data.serviceId)
        form.setValue("website", data.website)
        form.setValue("linkedin", data.linkedin)
        form.setValue("instagram", data.instagram)
        form.setValue("twitter", data.twitter)
        data.type && form.setValue("type", data.type)
      })
    }
  
  }, [form, id])


  return ( 
    <div className="flex max-w-5xl p-6 mx-auto bg-white border rounded-md md:items-center">
      <div className="">      
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="mt-8 space-y-8"
          >
            <FormField
              control={form.control}
              name="company"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>                    
                    Nombre del lead
                  </FormLabel>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="ej: Bodega Tannat"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Nombre de la compañía o persona que será el nuevo lead.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

        <p>Tipo</p>
        <Select
          onValueChange={(value:string)=> form.setValue("type", value)} 
        >
          <SelectTrigger>
            {
              leadToEdit ?               
            //@ts-ignore
            <SelectValue className="text-muted-foreground" placeholder={leadToEdit.type}/> :
              <SelectValue placeholder="Seleccionar tipo" />
            }                        
            
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {types.map(type => (
                <SelectItem key={type} value={type}>{type}</SelectItem>
              ))
              }
            </SelectGroup>
          </SelectContent>
        </Select>

        <p>Servicio</p>
        <Select
          onValueChange={(value:string)=> form.setValue("serviceId", value)} 
        >
          <SelectTrigger>
            {
              leadToEdit ?               
            //@ts-ignore
            <SelectValue className="text-muted-foreground" placeholder={leadToEdit.serviceName}/> :
              <SelectValue placeholder="Seleccionar servicio" />
            }                        
            
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {services.map(service => (
                <SelectItem key={service.id} value={service.id}>{service.name}</SelectItem>
              ))
              }
            </SelectGroup>
          </SelectContent>
        </Select>


            <div className="flex items-center gap-x-2">
              <Link href="/">
                <Button type="button" variant="ghost" onClick={() => router.back()}>
                  Cancel
                </Button>
              </Link>
              <Button
                type="submit"
                disabled={!isValid || isSubmitting}
              >
                Continuar
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
   );
}
 