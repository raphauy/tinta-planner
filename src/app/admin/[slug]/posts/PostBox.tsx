import { Post } from '@/app/types/Post'
import LoadingSpinner, { LoadingSpinnerChico } from '@/components/LoadingSpinner'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import ToolTip from './ToolTip'
import { useParams } from 'next/navigation'

interface PostBoxProps {
    post: Post
    onSelected: () => void
}
export default function PostBox({ post, onSelected }: PostBoxProps) {
  const [clicked, setClicked] = useState(false)
  const params= useParams()
  const slug= params.slug

  function handleClick() {
    setClicked(true)
    onSelected()
    setTimeout(() => {
      setClicked(false)
    }, 1000);
  }

  if (clicked)
    return <LoadingSpinnerChico />
  
  return (
    <>
      <div className="min-h-[100px]">
          <div onClick={handleClick} className="relative h-full overflow-hidden transition bg-white border border-gray-300 rounded-md cursor-pointer hover:scale-110">
            <Link href={`admin/${slug}/posts?id=${post.id}`}>
              <Image
                src={post.image || '/images/Image-placeholder.svg'}
                width={600}
                height={600}
                alt="feed image"
                className="absolute object-cover transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
              />
            </Link>
          </div>
      </div>
    </>
    
  )
}
