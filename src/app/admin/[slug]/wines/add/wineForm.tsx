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
  "Fresh and usefull",
  "bold and structured"
]

const formSchema = z.object({
  winery: z.string()
    .min(2, { message: "Winery must be at least 2 characters." }),
  wine: z.string()
    .min(2, { message: "Name must be at least 2 characters." }),
  winemaker: z.string().optional(),
  region: z.string()
    .min(2, { message: "Region must be at least 2 characters." }),
  vintage: z.string({required_error: "Vintage is required."}),
  grapes: z.string()
    .min(2, { message: "Grapes must be at least 2 characters." }),
  style: z.string().optional(),
  notes: z.string().optional(),
  price: z.number().optional(),
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
              <FormLabel>Winery</FormLabel>
              <FormControl>
                <Input placeholder="Winery name" {...field} />
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
              <FormLabel>Wine</FormLabel>
              <FormControl>
                <Input placeholder="Wine name" {...field} />
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
                <Input placeholder="(optional)" {...field} />
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
              <FormLabel>Region</FormLabel>
              <FormControl>
                <Input placeholder="Region of the wine" {...field} />
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
              <FormLabel>Vintage</FormLabel>
              <FormControl>
                <Input placeholder="Vintage of the wine" {...field} />
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
              <FormLabel>Grapes</FormLabel>
              <FormControl>
                <Input placeholder="Tannat, Cabernet franc, Petit Verdot." {...field} />
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
              <FormLabel>Wine Style</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    {
                      wine ? 
                      <SelectValue className="text-muted-foreground">{form.getValues("style")}</SelectValue> :
                      <SelectValue className="text-muted-foreground" placeholder="Select a Wine Style (Optional)" />
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
          name="notes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tasting notes</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="(optional)"                  
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