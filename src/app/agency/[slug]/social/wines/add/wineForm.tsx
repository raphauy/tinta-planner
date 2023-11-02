"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { AdvancedImage } from "@cloudinary/react"
import { CloudinaryImage } from "@cloudinary/url-gen"
import { Wine } from "@prisma/client"
import { CldUploadButton } from 'next-cloudinary'
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { toast } from "react-hot-toast"

export const wineStyles= [
  "espumoso",
  "blanco",
  "naranja",
  "rosado",
  "tinto",
  "fortificado",
]

const formSchema = z.object({
  winery: z.string().min(2, { message: "Bodega debe tener al menos 2 caracteres." }),
  wine: z.string().min(2, { message: "Vino debe tener al menos 2 caracteres." }),
  winemaker: z.string().optional(),
  region: z.string().min(2, { message: "Región debe tener al menos 2 caracteres." }),
  vintage: z.string({required_error: "Añada es obligatorio."}),
  grapes: z.string().min(2, { message: "Cepas debe tener al menos 2 caracteres" }),
  style: z.string().optional(),
  notes: z.string().optional(),
  price: z.string().optional(),
  alcohol: z.string().optional(),
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

    fresh && router.push(`/agency/${slug}/social/wines?refresh=${new Date().getMilliseconds()}`)
  }

  useEffect(() => {
    // set fields por edit mode
    if (wine) {
      
      form.setValue("winery", wine.winery)
      form.setValue("wine", wine.wine)
      wine.winemaker && form.setValue("winemaker", wine.winemaker)
      form.setValue("region", wine.region)
      form.setValue("vintage", wine.vintage)
      form.setValue("grapes", wine.grapes)
      wine.style && form.setValue("style", wine.style)
      wine.notes && form.setValue("notes", wine.notes)
      wine.price && form.setValue("price", wine.price)
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
          name="winery"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bodega</FormLabel>
              <FormControl>
                <Input placeholder="Nombre de la bodega" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="wine"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Vino</FormLabel>
              <FormControl>
                <Input placeholder="Nombre del vino" {...field} />
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
                <Input placeholder="" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="region"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Región</FormLabel>
              <FormControl>
                <Input placeholder="Región vitivinícola" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="vintage"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Añada</FormLabel>
              <FormControl>
                <Input placeholder="Año de cosecha" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="grapes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cepas</FormLabel>
              <FormControl>
                <Input placeholder="Tannat, Cabernet franc, Petit Verdot..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="style"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tipo de vino</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    {
                      wine ? 
                      <SelectValue className="text-muted-foreground">{form.getValues("style")}</SelectValue> :
                      <SelectValue className="text-muted-foreground" placeholder="Seleccione el tipo de vino" />
                    }
                    
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {wineStyles.map(style => (
                    <SelectItem key={style} value={style}>{style}</SelectItem>
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
          name="price"          
          render={({ field }) => (
            <FormItem>
              <FormLabel>Precio</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="alcohol"          
          render={({ field }) => (
            <FormItem>
              <FormLabel>% Alcohol</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} />
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
                  placeholder=""                  
                  {...field}
                  rows={7}
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
            {/** @ts-ignore */}
            <AdvancedImage cldImg={placeHolderImage} />
          </CldUploadButton>
        </div>
        <div className="flex justify-end">
          <Button onClick={() => history.back()} type="button" variant={"secondary"} className="w-32">Cancelar</Button>
          <Button type="submit" className="w-32 ml-2" >Guardar</Button>
        </div>
      </form>
    </Form>
  )
}