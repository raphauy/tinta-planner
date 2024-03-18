"use client"

import { Button } from '@/components/ui/button'
import { Film, ImagePlus } from 'lucide-react'
import { BsFilePdfFill } from 'react-icons/bs'

type Props = {
  showCloudinaryButton: (type: string) => void
}

export default function SendFiles({ showCloudinaryButton }: Props) {

  return (
    <div className='space-y-3 text-muted-foreground'>
        <div className='flex items-center gap-2'>
            <ImagePlus className='text-blue-500' />
            <Button variant='link' onClick={() => showCloudinaryButton('image')}>
              Enviar imagen
            </Button>
        </div>
        <div className='flex items-center gap-2'>
            <Film className='text-green-500' />
            <Button variant='link' onClick={() => showCloudinaryButton('video')}>
              Enviar video
            </Button>
        </div>
        <div className='flex items-center gap-2'>
            <BsFilePdfFill size={25} className='text-red-500' />
            <Button variant='link' onClick={() => showCloudinaryButton('pdf')}>
              Enviar pdf
            </Button>
        </div>
    </div>
  )
}
