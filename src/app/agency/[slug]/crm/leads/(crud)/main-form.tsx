"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"

import { LoadingSpinnerChico } from "@/components/LoadingSpinner"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/components/ui/use-toast"
import { Lead } from "@prisma/client"
import { useEffect, useState } from "react"
import { DataService } from "../../services/(crud)/actions"
import { DataLead, getDataLead } from "./actions"
import { types } from "../create/main-form"

const schema = z.object({
  company: z.string().nonempty({ message: "Campo obligatorio" }),
  value: z.string().refine((val) => !isNaN(Number(val)), { message: "(debe ser un número)" }).optional(),
  contactName: z.string().optional(),
  contactEmail: z.string().optional(),
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

export function LeadForm({ id, services, create, update, closeDialog }: Props) {

  const form = useForm<LeadFormValues>({
    resolver: zodResolver(schema),
    defaultValues,
    mode: "onChange",
  })
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
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="py-2 space-y-2 bg-white ">
      <FormField
          control={form.control}
          name="company"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center h-8 gap-4">
              <FormLabel>Compañía</FormLabel>
                <FormMessage />
              </div>
              <FormControl>
                <Input placeholder="Nombre de la compañía" {...field} />
              </FormControl>
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

        <FormField
          control={form.control}
          name="contactName"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center h-8 gap-4">
                <FormLabel>Nombre contacto</FormLabel>
                <FormMessage />
              </div>
              <FormControl>
                <Input placeholder="Nombre del contacto" {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <div className="flex items-center gap-1">

          <FormField
            control={form.control}
            name="contactEmail"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center h-8 gap-4">
                  <FormLabel>Email contacto</FormLabel>
                  <FormMessage />
                </div>
                <FormControl>
                  <Input placeholder="Email del contacto" {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="contactPhone"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center h-8 gap-4">
                  <FormLabel>Teléfono contacto</FormLabel>
                  <FormMessage />
                </div>
                <FormControl>
                  <Input placeholder="Teléfono del contacto" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="value"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center h-8 gap-4">
                <FormLabel>Valor</FormLabel>                
                <FormMessage />
              </div>
              <FormControl>                
                <Input placeholder="" {...field} />
              </FormControl>              
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="website"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center h-8 gap-4">
              <FormLabel>Sitio Web</FormLabel>
                <FormMessage />
              </div>
              <FormControl>
                <Input placeholder="https://gabizimmer.com" {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <div className="flex items-center gap-1">

          <FormField
            control={form.control}
            name="linkedin"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center h-8 gap-4">
                <FormLabel>Linkedin</FormLabel>
                  <FormMessage />
                </div>
                <FormControl>
                  <Input placeholder="ej: gabizimmeruy" {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="instagram"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center h-8 gap-4">
                <FormLabel>Instagram</FormLabel>
                  <FormMessage />
                </div>
                <FormControl>
                  <Input placeholder="ej: gabizimmeruy" {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="twitter"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center h-8 gap-4">
                <FormLabel>Twitter</FormLabel>
                  <FormMessage />
                </div>
                <FormControl>
                  <Input placeholder="ej: gabizimmeruy" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        <div className="flex justify-end">
          <Button onClick={() => closeDialog && closeDialog()} type="button" variant={"secondary"} className="w-32">Cancelar</Button>
          <Button type="submit" className="w-32 ml-2" >{loading ? <LoadingSpinnerChico /> : <p>Guardar</p>}</Button>
        </div>
      </form>
    </Form>
  )
}