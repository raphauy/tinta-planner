import { Post } from '@/app/types/Post'
import LoadingSpinner, { LoadingSpinnerChico } from '@/components/LoadingSpinner'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { AdvancedImage } from '@cloudinary/react';
import { CloudinaryImage } from '@cloudinary/url-gen';
import { fill } from '@cloudinary/url-gen/actions/resize';

interface PostBoxProps {
    post: Post
    onSelected?: () => void
}
export default function PostBox({ post, onSelected }: PostBoxProps) {
  const [clicked, setClicked] = useState(false)
  const [link, setLink] = useState("")
  const params= useParams()
  const slug= params.slug

  useEffect(() => {
        
    async function fetchClient() {
      slug ? setLink(`admin/${slug}/posts`) : setLink(`cliente/posts`)
    }
    fetchClient()
  }, [slug]);


  function handleClick() {
    setClicked(true)
    onSelected && onSelected()
    setTimeout(() => {
      setClicked(false)
    }, 1000);
  }

  if (clicked)
    return <LoadingSpinnerChico />
    
  const cldImage = new CloudinaryImage(post.image.split("/").slice(-2).join("/"), {cloudName: 'dtm41dmrz'}).resize(fill().width(155).height(135));

  return (
    <>
      <div className="min-h-[100px]">
          <div onClick={handleClick} className="relative h-full overflow-hidden transition bg-white border border-gray-300 rounded-md cursor-pointer hover:scale-110">
            <Link href={`${link}?id=${post.id}`}>
              <AdvancedImage cldImg={cldImage} />
            </Link>
          </div>
      </div>
    </>
    
  )
}
