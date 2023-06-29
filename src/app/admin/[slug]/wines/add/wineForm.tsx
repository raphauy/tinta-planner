"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { AdvancedImage } from "@cloudinary/react"
import { CloudinaryImage } from "@cloudinary/url-gen"
import { Wine } from "@prisma/client"
import { CldUploadButton } from 'next-cloudinary'
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { toast } from "react-hot-toast"

const formSchema = z.object({
  name: z.string()
    .min(2, { message: "Name must be at least 2 characters." }),
  description: z.string().optional(),
  notes: z.string().optional(),
  winery: z.string().optional(),
  winemaker: z.string().optional(),
  year: z.string({required_error: "Year is required."}),
  grape: z.string().optional(),
  image: z.string().optional(),
})

export type WineFormValues = z.infer<typeof formSchema>

// This can come from your database or API.
const defaultValues: Partial<WineFormValues> = {}

interface Props{
  wine?: Wine
  slug: string
  processData: (json: WineFormValues) => Promise<Wine | null>
}

export function WineForm({ wine, slug, processData }: Props) {
  const [placeHolderImageUrl, setPlaceHolderImageUrl] = useState("wines/wine-placeholder.jpg")
  const form = useForm<WineFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
    mode: "onChange",
  })
  const router= useRouter()

  const placeHolderImage = new CloudinaryImage(placeHolderImageUrl, {cloudName: 'dtm41dmrz'})

  async function onSubmit(data: WineFormValues) {
    
    const fresh= await processData(data)

    let message= "Vino creado 🏁"
    if (wine)
      message= "Vino editado 🏁"
      
    toast.success(message, { duration: 4000 })

    fresh && router.push(`/admin/${slug}/wines?refresh=${new Date().getMilliseconds()}`)
  }

  useEffect(() => {
    // set fields por edit mode
    if (wine) {
      
      form.setValue("name", wine.name)
      wine.description && form.setValue("description", wine.description)
      wine.notes && form.setValue("notes", wine.notes)
      wine.winery && form.setValue("winery", wine.winery)
      wine.winemaker && form.setValue("winemaker", wine.winemaker)
      form.setValue("year", wine.year+"")
      wine.grape && form.setValue("grape", wine.grape)
      wine.image && form.setValue("image", wine.image)
      wine.image && setPlaceHolderImageUrl(wine.image.split("/").slice(-2).join("/"))
    }
  
  }, [form, wine])

  function handleUpload(result: any) {
    const img: string = result.info.secure_url;
    form.setValue("image", img);
    setPlaceHolderImageUrl(img.split("/").slice(-2).join("/"))
  }


  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="p-4 space-y-8 bg-white border rounded-md">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre</FormLabel>
              <FormControl>
                <Input placeholder="Super Tannat" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="winery"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bodega</FormLabel>
              <FormControl>
                <Input placeholder="GZ Winery" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="winemaker"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Winemaker</FormLabel>
              <FormControl>
                <Input placeholder="El creador de vinos" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="year"          
          render={({ field }) => (
            <FormItem>
              <FormLabel>Año</FormLabel>
              <FormControl>
                <Input placeholder="2023" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="grape"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cepas</FormLabel>
              <FormControl>
                <Input placeholder="Tannat, Cabernet franc, Petit Verdot." {...field} />
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
              <FormLabel>Descipción</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Descipción del vino"                  
                  {...field}
                  rows={3}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        /> 
        <FormField
          control={form.control}
          name="notes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Notas de cata</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="En nariz..."                  
                  {...field}
                  rows={3}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        /> 
        <FormItem>
          <FormLabel>Imagen</FormLabel>
        </FormItem>
        <div className="flex justify-center w-40">
          <CldUploadButton
            options={{maxFiles: 1, tags: ["wine", `${slug}`]}}
            onUpload={handleUpload}
            uploadPreset="tinta-wines"
          >
            <AdvancedImage cldImg={placeHolderImage} />
          </CldUploadButton>
        </div>
        <div className="flex justify-end">
          <Button onClick={() => history.back()} type="button" variant={"secondary"} className="w-32">Cancel</Button>
          <Button type="submit" className="w-32 ml-2" >Save</Button>
        </div>
      </form>
    </Form>
  )
}