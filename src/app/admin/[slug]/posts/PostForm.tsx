"use client"

import axios from 'axios';
import { CldUploadButton } from 'next-cloudinary';
import Image from 'next/image';
import { redirect, useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { Pilar } from '@/app/types/Pilar';
import LoadingSpinner from '@/components/LoadingSpinner';
import { Post } from '@/app/types/Post';

function usePostForm(onPost: (id: string) => void, postToEdit?: Post) {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<FormData>();
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string>('/images/Image-placeholder.svg');
  const [loading, setLoading] = useState(true);
  const [toEdit, setToEdit] = useState<Post>()
  const [pilars, setPilars] = useState<Pilar[]>([]);
  const params= useParams()
  const slug= params.slug

  useEffect(() => {
    console.log("usePostForm, slug: " + slug);

    async function fetchPilars() {
      const { data } = await axios.get(`/api/pilars/${slug}/`);
      setPilars(data.data);
    }
    fetchPilars();

    postToEdit && setToEdit(postToEdit)

    if (postToEdit) {
      setValue("pilarId", postToEdit.pilar.id)
      setValue("title", postToEdit.title)
      setValue("copy", postToEdit.copy)
      setValue("hashtags", postToEdit.hashtags)
      setValue("format", postToEdit.format)

      postToEdit.date && setValue("date", new Date(postToEdit.date).toISOString().split('T')[0])

      setValue("image", postToEdit.image)
      setImagePreviewUrl(postToEdit.image)
    } 

    setLoading(false);

  }, [slug, postToEdit, setValue]);


  const onSubmit = (data: FormData) => {
    console.log("onSubmit, slug: " + slug);
    console.log("data: " + data.image);

    if (!toEdit) {
      // Guardar
      axios.post(`/api/posts/${slug}/`, data)
      .then((res) => {
        const post= res.data.data
        onPost(post.id)
        toast.success("Post creado", { duration: 4000 })        
      })      
      .catch((e) => {
        const error= e.response.data.error ? e.response.data.error : "Algo salió mal"
        toast.error(error, { duration: 5000 })        
        return
      })
    } else {
      // Editar
      axios.put(`/api/posts/${slug}/${toEdit.id}`, data)
      .then((res) => {
        const post= res.data.data
        onPost(post.id)
        toast.success("Post editado", { duration: 4000 })
      })      
      .catch((e) => {
        const error= e.response.data.error ? e.response.data.error : "Algo salió mal"
        toast.error(error, { duration: 5000 })        
        return
      })
    }
    
    setValue("image", "")
    setValue("title", "")
    setValue("copy", "")
    setValue("hashtags", "")
    setValue("format", "")
    setValue("date", "")
    setImagePreviewUrl('/images/Image-placeholder.svg')

  };

  function handleUpload(result: any) {
    const img= result.info.secure_url
    setImagePreviewUrl(img)
    setValue("image", img)
  }

  return { onSubmit, handleUpload, imagePreviewUrl, register, handleSubmit, errors, loading, pilars, toEdit }
}

type FormData = {
  title: string
  copy: string
  image: string
  pilarId: number
  hashtags: string
  format: string
  date: string
};

interface PostFormProps {
  onPost: (id: string) => void
  postToEdit?: Post
}

export default function PostForm({ onPost, postToEdit }: PostFormProps) {
  const { onSubmit, handleUpload, imagePreviewUrl, register, handleSubmit, errors, loading, pilars, toEdit  }= usePostForm(onPost, postToEdit)

  if (loading) 
    return <LoadingSpinner />

  return (
    <div className='p-4 m-4 bg-white border h-fit rounded-3xl w-96'>
        <div className='flex items-center'>
          <div className="relative inline-block w-8 h-8 overflow-hidden border rounded-full md:h-11 md:w-11">
            <Image fill src="/images/logo-traversa.jpeg" alt="Avatar"/>
          </div>
          <p className='pl-2 text-sm font-semibold'>familiatraversa</p>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
        
          <div className="mt-2 mb-4">
            <CldUploadButton
              options={{ maxFiles: 1}}
              onUpload={handleUpload}
              uploadPreset="tinta-posts"
            >
              {imagePreviewUrl && (<Image className='rounded-md cursor-pointer' width={681} height={528} src={imagePreviewUrl} alt="post image" />)}          
            </CldUploadButton>
          </div>
          <input id="image" type="text" hidden
              {...register("image", { required: "Tines que cargar una imagen ☝️" })}
              className="w-full p-2 border border-gray-300 rounded"/>
            {errors.image && (<p className="mt-1 text-red-600">{errors.image.message}</p>)}

          <div className="mb-4">
            <select id='pilarId' {...register("pilarId", { required: 'El pilar es obligatorio' })} className="w-full p-2 border border-gray-300 rounded">              
              {!toEdit && <option value="">Pilar de contenido</option>}
              {pilars.map((pilar) => (
                <option key={pilar.id} value={pilar.id}>
                  {pilar.name}
                </option>
              ))}
            </select>
            {errors.pilarId && (<p className="mt-1 text-red-600">{errors.pilarId.message}</p>)}
          </div>

          <div className="mb-4">
            <input id="title" type="text" placeholder='Título'
              {...register("title", { required: "El título es obligatorio" })}
              className="w-full p-2 border border-gray-300 rounded"/>
            {errors.title && (<p className="mt-1 text-red-600">{errors.title.message}</p>)}
          </div>

          <div className="mb-4">
            <textarea id="copy" placeholder='Copy'
              {...register("copy", { required: "El copy es obligatorio" })}
              className="w-full h-32 p-2 border border-gray-300 rounded"
            ></textarea>
            {errors.copy && (<p className="mt-1 text-red-600">{errors.copy.message}</p>)}
          </div>

          <div className="mb-4">
            <textarea id="hashtags" placeholder='hashtags' {...register("hashtags")}
              className="w-full h-32 p-2 border border-gray-300 rounded"
            ></textarea>
            {errors.hashtags && (<p className="mt-1 text-red-600">{errors.hashtags.message}</p>)}
          </div>

          <div className="mb-4">
            <input id="date" type="date" {...register("date")}
              className="w-full p-2 border border-gray-300 rounded"/>
            {errors.date && (<p className="mt-1 text-red-600">{errors.date.message}</p>)}
          </div>

          <div className="flex items-center gap-2 mb-4">
            <label>Formato: </label>
            <select id='format' {...register("format")} className="w-full p-2 border border-gray-300 rounded">
              <option key={1} value="post">Post</option>
              <option key={2} value="post-grafico">Post Gráfico</option>
              <option key={3} value="historias">Historias</option>
              <option key={4} value="otro">Otro</option>
            </select>
            {errors.pilarId && (<p className="mt-1 text-red-600">{errors.pilarId.message}</p>)}
          </div>

          <div className="flex justify-end pb-1">
            <button type='submit' className='flex justify-center px-3 py-2 text-sm font-semibold bg-green-400 border border-green-700 rounded-md w-36 hover:opacity-80 focus-visible:outline-tinta-marron focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2'>
              Guardar
            </button>
          </div>
        </form>
    </div>
  )
}
