"use client"

import Client from '@/app/types/Client';
import { Post } from '@/app/types/Post';
import LoadingSpinner from '@/components/LoadingSpinner';
import { AdvancedImage } from '@cloudinary/react';
import { CloudinaryImage } from '@cloudinary/url-gen';
import axios from 'axios';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { AiOutlineHeart } from 'react-icons/ai';
import { BsBookmark, BsChat, BsThreeDots } from 'react-icons/bs';
import { IoPaperPlaneOutline } from 'react-icons/io5';
import PopOver from '../../../../components/modal/PopOver';
import PostHandler from './PopOverPostHandler';

function useInstaBox(postId: string, client: Client) {
  const [loading, setLoading] = useState(true);
  const [post, setPost] = useState<Post>()
  const params= useParams()
  if (!params)
    throw Error("useParams() is not working")

  const slug= params.slug

  useEffect(() => {
    async function fetch() {
      const { data } = await axios.get(`/api/posts/${slug}/${postId}/`);
      setPost(data.data)
      setLoading(false)      
    }
    fetch()

  }, [slug, postId]);

  return { post, loading }
}

interface InstaBoxProps {
  postId: string
  onDelete: () => void
  onEdit?: (id: string) => void
  client: Client
}
export default function InstaBox({ postId, onDelete, onEdit, client }: InstaBoxProps) {
  const { post, loading }= useInstaBox(postId, client)

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
              <AdvancedImage cldImg={avatarImage} />
            </div>
            <p className='pl-2 text-sm font-semibold'>{client.handle_insta}</p>
            <div className='flex justify-end flex-grow pr-1'>
              {onEdit && <PopOver trigger={<BsThreeDots />} body={<PostHandler id={postId} onDelete={onDelete} onEdit={onEdit}/>} />}
            </div>          
          </div>

          {/* Image */}
          <div className='object-cover w-full py-2 '>
              {/* <Image className='rounded-md' width={681} height={528} src={post.image} alt="post image" /> */}
            <AdvancedImage cldImg={cldImage} />
          </div>
          {/* Buttons */}
          <div className='flex justify-between px-3 pt-4'>
            <div className='flex space-x-4'>
              <AiOutlineHeart size={26} className='btn' />
              <BsChat size={24} className='btn' />
              <IoPaperPlaneOutline size={24} className='btn' />
            </div>
            <BsBookmark size={24} className='btn' />
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
      <div className='p-4 m-4 bg-white border rounded min-w-[380px] max-w-[500px]'>
        <p><span className='mr-1 font-bold'>Título: </span>{post.title}</p>      
        <p><span className='mr-1 font-bold'>Pilar: </span>{post.pilar.name}</p>
        <p><span className='mr-1 font-bold'>Formato: </span>{post.format}</p>
        <p><span className='mr-1 font-bold'>Fecha: </span>{post.date && new Date(post.date).toISOString().split('T')[0]}</p>
        <div>
          <p></p>
          <p></p>            
        </div>
      </div>

    </div>
  )
}
