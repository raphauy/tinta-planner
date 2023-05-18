// components/PostForm.tsx
import Image from "next/image";
import React, { ChangeEvent, useState } from "react";
import { useForm } from "react-hook-form";

type FormData = {
  title: string;
  content: string;
  image: FileList;
};

export default function SamplePostForm() {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);

  const onSubmit = (data: FormData) => {
    console.log(data);
    // Aquí puedes manejar el envío de los datos del formulario
  };

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => setImagePreviewUrl(e.target?.result as string);
      reader.readAsDataURL(event.target.files[0]);
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <h1 className="mb-4 text-xl font-semibold">Crear nuevo Post</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label htmlFor="title" className="block mb-2">
            Título
          </label>
          <input
            id="title"
            type="text"
            {...register("title", { required: "Este campo es obligatorio" })}
            className="w-full p-2 border border-gray-300 rounded"
          />
          {errors.title && (
            <p className="mt-1 text-red-600">{errors.title.message}</p>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="content" className="block mb-2">
            Contenido
          </label>
          <textarea
            id="content"
            {...register("content", { required: "Este campo es obligatorio" })}
            className="w-full h-32 p-2 border border-gray-300 rounded"
          ></textarea>
          {errors.content && (
            <p className="mt-1 text-red-600">{errors.content.message}</p>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="image" className="block mb-2">
            Imagen
          </label>
          <input
            id="image"
            type="file"
            {...register("image", { required: "Este campo es obligatorio" })}
            className="w-full p-2 border border-gray-300 rounded"
            onChange={handleImageChange}
          />
          {errors.image && (
            <p className="mt-1 text-red-600">{errors.image.message}</p>
          )}
        </div>

        {imagePreviewUrl && (
          <div className="mb-4">
            <Image className='rounded-md' width={681} height={528} src={imagePreviewUrl} alt="post image" />
          </div>
        )}

        <button
          type="submit"
          className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
        >
          Guardar
        </button>
      </form>
</div>
);
};
