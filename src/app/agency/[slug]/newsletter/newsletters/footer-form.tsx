"use client"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/use-toast"
import { zodResolver } from "@hookform/resolvers/zod"
import { Loader } from "lucide-react"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { setFooterAction } from "./newsletter-actions"
import Link from "next/link"
import { Textarea } from "@/components/ui/textarea"

type Props= {
  slug: string
  footerText: string
  linkHref: string
  linkText: string
}

const schema = z.object({
  footerText: z.string({required_error: "footerText is required."}),
	linkHref: z.string({required_error: "hrefLink is required."}),
	linkText: z.string({required_error: "hrefText is required."}),
})

type FormValues = z.infer<typeof schema>

export function FooterForm({ slug, footerText, linkHref, linkText }: Props) {
  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      footerText,
      linkHref,
      linkText
    },
    mode: "onChange",
  })
  const [loading, setLoading] = useState(false)
  const [editMode, setEditMode] = useState(false)

  const onSubmit = async (data: FormValues) => {
    setLoading(true)
    setFooterAction(slug, data.footerText, data.linkHref, data.linkText)
    .then(() => {
      toast({title: "Footer updated" })
    })
    .catch((error) => {
      toast({title: "Error", description: error.message, variant: "destructive"})
    })
    .finally(() => {
      setLoading(false)
      setEditMode(false)
    })
  }

  if (!editMode) {
    return (
      <div className="p-4 bg-white rounded-md">
        <div className="flex justify-between mx-3">
          <div>
            <p className="mb-5 whitespace-pre-line">{footerText}</p>
            <a href={linkHref} target="_blank" className="text-blue-500">{linkText}</a>
          </div>
          <Button variant="outline" onClick={() => setEditMode(true)}>Edit</Button>
        </div>
      </div>
    )
  }


  return (
    <div className="p-4 bg-white rounded-md">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">

          <FormField
            control={form.control}
            name="footerText"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Footer Text</FormLabel>
                <FormControl>
                  <Textarea rows={5} placeholder="Footer Text" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="linkHref"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Link Href</FormLabel>
                <FormControl>
                  <Input placeholder="Link Href" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="linkText"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Link Text</FormLabel>
                <FormControl>
                  <Input placeholder="Link Text" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

        <div className="flex justify-end">
            <Button variant="outline" type="submit" className="w-32 ml-2">
              {loading ? <Loader className="w-4 h-4 animate-spin" /> : <p>Save Footer</p>}
            </Button>
          </div>
        </form>
      </Form>
    </div>     
  )
}

