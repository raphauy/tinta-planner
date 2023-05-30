"use client"

import PostCarouselForm from '../[slug]/posts/PostCarouselForm'
import { useState } from 'react';

export default function ReportPage() {
  const fakeImages: string[]= []
  const [images, setImages] = useState(fakeImages);

  return (
  <main className="w-full h-full md:flex">

    <div className="flex-grow w-full h-full ">            

      <div className='flex flex-col justify-center h-full w-96'>
        <div className='w-full h-full p-4 bg-white border'>
          <PostCarouselForm images={images} />
        </div>
        <button
          onClick={() => {
            const newImage = "tinta-posts/nge2dn8asukrjdnzb8gl.jpg"
            setImages((prevImages) => [...prevImages,newImage])
          }}
        >
          Add
        </button>
        <button
          onClick={() => {
            const newImage = "tinta-posts/kozrv6aucphrxepaw2mm.jpg"
            setImages((prevImages) => [...prevImages,newImage])
          }}
        >
          Add
        </button>

      </div>    

    </div>    

  </main>

  )
}
