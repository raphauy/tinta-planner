"use client"

import { Button } from '@/components/ui/button'
import { Film, ImagePlus } from 'lucide-react'
import { CldUploadButton } from 'next-cloudinary'
import { BsFilePdfFill } from 'react-icons/bs'

export default function SendFiles() {
  return (
    <div className='space-y-3 text-muted-foreground'>
        <p>Comming soon...</p>
        <div className='flex items-center gap-2'>
            <ImagePlus className='text-blue-500' />
            {/* <div className="flex justify-center">
              <CldUploadButton
                options={{maxFiles: 1, tags: ["whatsapp-upload"]}}
                onUpload={handleUpload}
                uploadPreset="tinta-posts"
              >              
                <Button variant='link'>Enviar imagen</Button>
              </CldUploadButton>
            </div> */}
            <Button variant='link'>Enviar imagen</Button>

        </div>
        <div className='flex items-center gap-2'>
            <Film className='text-green-500' />
            <Button variant='link'>Enviar video</Button>
        </div>
        <div className='flex items-center gap-2'>
            <BsFilePdfFill size={25} className='text-red-500' />
            <Button variant='link'>Enviar pdf</Button>
        </div>
    </div>
  )
}
