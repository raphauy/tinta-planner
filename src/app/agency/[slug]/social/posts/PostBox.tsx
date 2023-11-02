import { Post } from '@/app/types/Post'
import { LoadingSpinnerChico } from '@/components/LoadingSpinner'
import { cn } from '@/lib/utils'
import { AdvancedImage } from '@cloudinary/react'
import { CloudinaryImage } from '@cloudinary/url-gen'
import { fill } from '@cloudinary/url-gen/actions/resize'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { AiOutlineCalendar, AiOutlineCamera } from 'react-icons/ai'
import { GrStatusGoodSmall } from 'react-icons/gr'

interface PostBoxProps {
    post: Post
    onSelected?: () => void
}
export default function PostBox({ post, onSelected }: PostBoxProps) {
  const [clicked, setClicked] = useState(false)
  const [link, setLink] = useState("")
  const params= useParams()
  if (!params)
    throw Error("useParams() is not working")

  const slug= params.slug

  useEffect(() => {
        
    async function fetchClient() {
      slug ? setLink(`/agency/${slug}/social/posts`) : setLink(`/cliente/posts`)
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
  
  const portada= post.image.split(",")[0]
  const cldImage = new CloudinaryImage(portada.split("/").slice(-2).join("/"), {cloudName: 'dtm41dmrz'}).resize(fill().width(160).height(160));
  const images= post.image.split(",")

  const statusColor= post.status === "Aprobado" ? "text-green-500" : post.status === "Revisado" ? "text-orange-500" : "text-gray-500"
  const pastDate= post.date && post.date < new Date().toISOString().slice(0, 10)
  const show= !pastDate && post.status !== "Aprobado"

  return (
    <>
      <div className="min-h-[100px]">
          <div onClick={handleClick} className="relative h-full overflow-hidden transition bg-white border border-gray-300 cursor-pointer hover:scale-110">
            {!post.date && <AiOutlineCalendar className="absolute top-0 right-0 text-white bg-black rounded-md bg-opacity-30" size={23}/>}

            {show && <GrStatusGoodSmall className={cn("absolute bottom-0 right-0 text-orange-500 rounded-md", statusColor)} size={20}/>}

            {images.length > 1 && <div className="absolute top-0 left-0 flex gap-1 text-white bg-black rounded-md bg-opacity-30"><AiOutlineCamera  size={23}/>{images.length}</div>}
            
            <Link href={`${link}?id=${post.id}`}>
              {/** @ts-ignore */}
              <AdvancedImage cldImg={cldImage} />
            </Link>
          </div>
      </div>
    </>
    
  )
}
