"use client"

import Client from '@/app/types/Client';
import { Pilar } from '@/app/types/Pilar';
import { Post } from '@/app/types/Post';
import LoadingSpinner from '@/components/LoadingSpinner';
import { AdvancedImage } from '@cloudinary/react';
import { CloudinaryImage } from '@cloudinary/url-gen';
import axios from 'axios';
import { CldUploadButton } from 'next-cloudinary';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { BsUpload } from 'react-icons/bs';
import PostCarouselForm from './PostCarouselForm';

function usePostForm(onPost: (id: string) => void, postToEdit?: Post) {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<FormData>();
  const [loading, setLoading] = useState(true);
  const [images, setImages] = useState<string[]>([]);
  const [toEdit, setToEdit] = useState<Post>()
  const [pilars, setPilars] = useState<Pilar[]>([]);
  const params= useParams()
  if (!params)
    throw Error("useParams() is not working")

  const slug= params.slug


  function handleUpload(result: any) {
    const img: string = result.info.secure_url;
    if (images.length === 0)
      setImages((prevImages) => [...prevImages,img]) 
    else setImages((prevImages) => [...prevImages,","+img])
    setValue("image", [...images,img].join(","));
  }

  function onDeleteImage(toEliminate: string) {
    console.log("onDeleteImage: " + toEliminate);
    const newImages= images.filter((image) => image !== toEliminate)
    setImages(newImages)
    setValue("image", newImages.join(","));
  }
  

  useEffect(() => {

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

      const newImages= postToEdit.image.split(",")
      setImages(newImages)
    } 

    setLoading(false);

  }, [slug, postToEdit, setValue]);

  const onSubmit = (data: FormData) => {

    setValue("image", "")

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
    setImages([])
  };

  

  return { images, onSubmit, handleUpload, register, handleSubmit, errors, loading, pilars, toEdit, onDeleteImage }
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
  client: Client
}

export default function PostForm({ onPost, postToEdit, client }: PostFormProps) {
  const { images, onSubmit, handleUpload, register, handleSubmit, errors, loading, pilars, toEdit, onDeleteImage  }= usePostForm(onPost, postToEdit)
  

  if (loading) 
    return <LoadingSpinner />

  const hCarousel= images.length === 0 ? "h-[350px]" : "h-[500px]"

  const avatarImage = new CloudinaryImage(client.image_insta.split("/").slice(-2).join("/"), {cloudName: 'dtm41dmrz'})

  return (
    <div className='p-4 m-4 bg-white border rounded-3xl min-w-[380px] max-w-[500px]'>
        {/* Header */}
        <div className='flex items-center'>
          <div className="relative inline-block w-8 h-8 overflow-hidden border rounded-full md:h-11 md:w-11">
            <AdvancedImage cldImg={avatarImage} />
          </div>
          <p className='pl-2 text-sm font-semibold'>{client.handle_insta}</p>
        </div>

        <div className={`${hCarousel} my-2`}>          
          <PostCarouselForm images={images} onDelete={onDeleteImage} />
        </div>

        <div className="flex justify-center">
          <CldUploadButton
            options={{maxFiles: 1, tags: [`${client.slug}`]}}
            onUpload={handleUpload}
            uploadPreset="tinta-posts"
          >              
            <BsUpload size={30} className='w-32 h-10 p-2 bg-gray-200 border border-gray-500 rounded-md hover:bg-gray-300' />
            {/** imagePreviewUrl && (<Image className='rounded-md cursor-pointer' width={681} height={528} src={imagePreviewUrl} alt="post image" />) */}          
          </CldUploadButton>
        </div>

        <form className="mt-3 space-y-6" onSubmit={handleSubmit(onSubmit)}>
        
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
              <option key={1} value="Post">Post</option>
              <option key={2} value="Carrusel">Carrusel</option>
              <option key={3} value="Reel">Reel</option>
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
