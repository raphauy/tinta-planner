"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"
import { AdvancedImage } from "@cloudinary/react"
import { CloudinaryImage } from "@cloudinary/url-gen"
import { CldUploadButton } from 'next-cloudinary'
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import slugify from "slugify"
import { Client } from "@prisma/client"
import { Upload } from "lucide-react"

const formSchema = z.object({
  name: z.string()
    .min(2, { message: "Title must be at least 2 characters." })
    .max(60,{ message: "Title must not be longer than 60 characters." }),
  slug: z.string().optional(),
  description: z.string().optional(),
  handle_insta: z.string()
    .min(2, { message: "Title must be at least 2 characters." })
    .max(60,{ message: "Title must not be longer than 60 characters." }),
  image_insta: z.string({required_error: "Thumbnail image is required."}),
  agencyId: z.number().optional(),
})

export type FormValues = z.infer<typeof formSchema>

// This can come from your database or API.
const defaultValues: Partial<FormValues> = {
  image_insta: "https://res.cloudinary.com/dtm41dmrz/image/upload/v1686837323/tinta-posts/tnadxcapxms8ojboohax.webp",
}

interface Props{
  client?: Client
  processData: (data: FormValues) => Promise<Client | null>
}

export function ClientForm({ client, processData }: Props) {
  const [placeHolderImageUrl, setPlaceHolderImageUrl] = useState("tinta-posts/tnadxcapxms8ojboohax.webp")
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
    mode: "onChange",
  })
  
  const router= useRouter()

  const placeHolderImage = new CloudinaryImage(placeHolderImageUrl, {cloudName: 'dtm41dmrz'})

  async function onSubmit(data: FormValues) {

    const fresh= await processData(data)

    let message= "Cliente creado 🏁"
    if (client)
      message= "Cliente editado 🏁"

    toast({
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <p className="text-xl text-white">{message}</p>
        </pre>
      ),
    })

    fresh && router.push(`/admin/clients?refresh=${new Date().getMilliseconds()}`)
  }

  useEffect(() => {
    // set fields por edit mode
    if (client) {      
      form.setValue("name", client.name)
      form.setValue("slug", client.slug)
      form.setValue("handle_insta", client.handle_insta)
      form.setValue("image_insta", client.image_insta)
      setPlaceHolderImageUrl(client.image_insta.split("/").slice(-2).join("/"))
      client.description && form.setValue("description", client.description)
    }
  
  }, [form, client])

  function handleUpload(result: any) {
    const img: string = result.info.secure_url;
    form.setValue("image_insta", img);
    setPlaceHolderImageUrl(img.split("/").slice(-2).join("/"))
  }


  return (
    <div className="p-4 bg-white rounded-md">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nombre</FormLabel>
                <FormControl>
                  <Input placeholder="Bodega Tannat" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Descripción</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Descripción del cliente"                  
                    {...field}
                    rows={5}
                  />
                </FormControl>
                <FormDescription className="mx-1">
                  Este campo se usa para mostrar una descripción del cliente en el Dashboard del cliente, la
                  primera pantalla que el cliente ve cuando se loguea
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          /> 
          <FormField
            control={form.control}
            name="handle_insta"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Handle Instagram</FormLabel>
                <FormControl>
                  <Input placeholder="gabizimmeruy" {...field} />
                </FormControl>
                <FormDescription className="mx-1">
                  Este es el handle de instagram del cliente (sin el @), si es @gabizimmeruy en este
                  campo va gabizimmeruy. Este valor es meramente visual, solo se utilizará para mostrar el post
                  lo más parecido posible a como se ve en Instagram                
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="image_insta"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Imagen Instagram</FormLabel>
                <div className="flex justify-center">
                  <CldUploadButton
                    options={{maxFiles: 1, tags: [`${form.getValues("name")}`, "agency-planner"]}}
                    onUpload={handleUpload}
                    uploadPreset="tinta-posts"
                  >
                    <div className="flex flex-col items-center w-28">
                      <AdvancedImage cldImg={placeHolderImage} />
                      <Upload />
                    </div>                                        
                  </CldUploadButton>
                  <FormDescription className="pt-5 mx-8">
                    Este es el handle de instagram del cliente (sin el @), si es @gabizimmeruy en este
                    campo va gabizimmeruy. Este valor es meramente visual, solo se utilizará para mostrar el post
                    lo más parecido posible a como se ve en Instagram                
                  </FormDescription>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button onClick={() => history.back()} type="button" variant={"secondary"} className="w-32">Cancel</Button>
          <Button type="submit" className="w-32 ml-2">Guardar</Button>
        </form>
      </Form>     
    </div>
 )
}