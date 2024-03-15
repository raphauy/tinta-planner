"use client"

import useCopyToClipboard from '@/app/(client-side)/hooks/useCopyToClipboard';
import Client from '@/app/types/Client';
import { Post } from '@/app/types/Post';
import LoadingSpinner from '@/components/LoadingSpinner';
import { AdvancedImage } from '@cloudinary/react';
import { CloudinaryImage } from '@cloudinary/url-gen';
import { fill } from '@cloudinary/url-gen/actions/resize';
import axios from 'axios';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { AiOutlineDownload, AiOutlineHeart } from 'react-icons/ai';
import { BsChat, BsThreeDots } from 'react-icons/bs';
import { FiCopy } from 'react-icons/fi';
import { IoPaperPlaneOutline } from 'react-icons/io5';
import PopOver from '@/components/modal/PopOver';
import PostHandler from './PopOverPostHandler';
import PostCarouselForm from './PostCarouselForm';
import slugify from 'slugify'
import { PostStatusSelector } from './post-status-selector';
import { useSession } from 'next-auth/react';
import { format, subDays } from 'date-fns';

function useInstaBox(postId: string, client: Client) {
  const [value, copy] = useCopyToClipboard()
  const [loading, setLoading] = useState(true);
  const [post, setPost] = useState<Post>()
  const [images, setImages] = useState<string[]>([]);
  const [isAgency, setIsAgency] = useState(false)
  const { data }= useSession()
  const params= useParams()
  if (!params)
    throw Error("useParams() is not working")

  const slug= params.slug

  useEffect(() => {
    const userRole= data?.user?.role
    if (userRole?.includes("admin") || userRole?.includes("agency"))
      setIsAgency(true)
    else
      setIsAgency(false)

  }, [data]);

  useEffect(() => {
    async function fetch() {
      const { data } = await axios.get(`/api/posts/${slug}/${postId}/`);
      const resPost= data.data
      setPost(resPost)
      const newImages= resPost.image.split(",")
      setImages(newImages)
      }
    fetch()      
  
    setLoading(false)      

  }, [slug, postId]);

  function copyToClipboard(){

    if (!post) return

    let texto= post.copy
    if (post.hashtags)
      texto= texto + "\n\n" + post.hashtags

    copy(texto)

    toast.success("Texto copiado 👌")
  }
  

  return { post, images, loading, copyToClipboard, isAgency }
}

interface InstaBoxProps {
  postId: string
  onDelete: () => void
  onEdit?: (id: string) => void
  onPost?: (id: string) => void
  client: Client
}
export default function InstaBox({ postId, onDelete, onEdit, onPost, client }: InstaBoxProps) {
  const { post, images, loading, copyToClipboard, isAgency }= useInstaBox(postId, client)

  if (loading || !post)
    return <LoadingSpinner />

  const cldImage = new CloudinaryImage(post.image.split("/").slice(-2).join("/"), {cloudName: 'dtm41dmrz'})
  const avatarImage = new CloudinaryImage(client.image_insta.split("/").slice(-2).join("/"), {cloudName: 'dtm41dmrz'})


  return (
    <div>
      <div className='p-4 m-4 bg-white border rounded-3xl min-w-[380px] max-w-[500px]'>
          {/* Header */}
          <div className='flex items-center'>
            <div className="relative inline-block w-8 h-8 overflow-hidden border rounded-full md:h-11 md:w-11">
              {/** @ts-ignore */}
              <AdvancedImage cldImg={avatarImage} />
            </div>
            <p className='pl-2 text-sm font-semibold'>{client.handle_insta}</p>
            <div className='flex justify-end flex-grow pr-1'>
              {onEdit && <PopOver trigger={<BsThreeDots />} body={<PostHandler id={postId} onDelete={onDelete} onEdit={onEdit}/>} />}
            </div>          
          </div>

          {/* Image */}
          <div className='w-full py-2 h-[562px]'>
              {/* <Image className='rounded-md' width={681} height={528} src={post.image} alt="post image" /> */}
              {/** @ts-ignore */}
              {images.length < 1 && <AdvancedImage cldImg={cldImage} />}
            {images.length > 0 && <PostCarouselForm images={images} />}
          </div>
          {/* Buttons */}
          <div className='flex justify-between px-3 pt-4'>
            <div className='flex space-x-4'>
              <AiOutlineHeart size={26} className='btn' />
              <BsChat size={24} className='btn' />
              <IoPaperPlaneOutline size={24} className='btn' />
            </div>
            <FiCopy onClick={copyToClipboard} size={25} className='btn' />
          </div>

          {/* Title */}
          <p className='p-3 whitespace-pre-line'>
            <span className='mr-1 font-bold'>{client.handle_insta} </span>
            {post.copy}            
          </p>
          <p className='p-3 font-bold'>
            {post.hashtags}
          </p>


      </div>
      <div className='p-4 flex justify-between m-4 bg-white border rounded min-w-[380px] max-w-[500px]'>
        <div className='grid grid-cols-[111px,1fr]'>
          <p className='font-bold'>Título:</p>      
          <div className='flex justify-between'>
            <p>{post.title}</p>      
            <div>
              {onPost && <PostStatusSelector id={postId} status={post.status} onPost={onPost} />}
            </div>
          </div>
          <p className='font-bold'>Pilar:</p>      
          <p>{post.pilar.name}</p>      
          <p className='font-bold'>Formato:</p>
          <p>{post.format}</p>
          <p className='font-bold '>Fecha:</p>
          <p>{post.date && format(new Date(post.date), "yyyy-MM-dd")}</p>
          {
            isAgency && (
              <div className='w-full col-span-2'>
                <p className='font-bold'>Comentarios:</p>
                <p className='break-words whitespace-pre-line'>{post.comments}</p>              
              </div>
            )
          }
        </div>
      </div>
      <div className='p-4 m-4 bg-white border rounded min-w-[400px] max-w-[500px] grid-cols-2 xl:grid-cols-3 grid gap-4'>
        {images.map((url) => {
          const short= url.split("/").slice(-2).join("/")
          const image = new CloudinaryImage(short, {cloudName: 'dtm41dmrz'}).resize(fill().width(100))
          const title= post.title.replace(/\+/g, " ")

          return (
            <button key={short}
              className='flex items-center gap-1 p-1 border rounded' 
              onClick={() => {
                const link = document.createElement('a');
                link.href = `https://res.cloudinary.com/dtm41dmrz/image/upload/fl_attachment:${slugify(title, { replacement: "_", lower: true })}/${short}`;
                link.click();
              }}
            >
              {/** @ts-ignore */}
              <AdvancedImage cldImg={image} />
              <AiOutlineDownload size={30} className='text-gray-600'/>
            </button>
          )
        })}
      </div>

    </div>
  )
}
