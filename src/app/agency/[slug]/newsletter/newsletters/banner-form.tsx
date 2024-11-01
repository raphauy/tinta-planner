"use client"

import { toast } from "@/components/ui/use-toast"
import { Loader, Upload } from "lucide-react"
import { CldUploadButton } from "next-cloudinary"
import { useState } from "react"
import { setBannerAction } from "./newsletter-actions"

type Props= {
  slug: string
}

export function BannerForm({ slug }: Props) {
  const [loading, setLoading] = useState(false)

  function handleUpload(result: any) {
    const img: string = result.info.secure_url
    console.log(img)
    
    setLoading(true)
    setBannerAction(slug, img)
    .then((data) => {
      if (data) {
        toast({title: "Banner updated" })
      }
    })
    .catch((error) => {
      toast({title: "Error", description: error.message, variant: "destructive"})
    })
    .finally(() => {
      setLoading(false)
    })
  }

  return (
    <div>
      <CldUploadButton
        options={{maxFiles: 1, tags: [`banner`]}}
        onUpload={handleUpload}
        uploadPreset="tinta-posts"
        className="pt-2"
      >              
        
        {loading ? <Loader className="w-4 h-4 animate-spin" /> : <Upload />}
      </CldUploadButton>
    </div>
)
}

