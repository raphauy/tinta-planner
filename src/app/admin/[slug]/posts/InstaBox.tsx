"use client"

import { Post } from '@/app/types/Post';
import LoadingSpinner from '@/components/LoadingSpinner';
import Input from '@/components/ui/Input'
import Textarea from '@/components/ui/Textarea';
import axios from 'axios';
import Image from 'next/image'
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { BsThreeDots } from 'react-icons/bs'
import PopOver from '../../../(client-side)/components/PopOver';
import PostHandler from './PopOverPostHandler';

function useInstaBox(postId: string) {
  const [loading, setLoading] = useState(true);
  const [post, setPost] = useState<Post>()
  const params= useParams()
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
}
export default function InstaBox({ postId, onDelete }: InstaBoxProps) {
  const { post, loading }= useInstaBox(postId)

  if (loading || !post)
    return <LoadingSpinner />

  return (
    <div className='p-4 m-4 bg-white border rounded-3xl w-96'>
        <div className='flex items-center'>
          <div className="relative inline-block w-8 h-8 overflow-hidden border rounded-full md:h-11 md:w-11">
            <Image fill src="/images/logo-traversa.jpeg" alt="Avatar"/>
          </div>
          <p className='pl-2 text-sm font-semibold'>familiatraversa</p>
          <div className='flex justify-end flex-grow'>
            <PopOver trigger={<BsThreeDots />} body={<PostHandler id={postId} onDelete={onDelete}/>} />
          </div>          
        </div>
        <div className='py-2 pl-1 '>
            <Image className='rounded-md' width={681} height={528} src={post.image} alt="post image" />
          </div>
          <div>
            <p>{post.title}</p>
            <p>{post.copy}</p>
            
          </div>
    </div>
  )
}
