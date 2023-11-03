"use client";

import Client from "@/app/types/Client";
import Button from "@/components/form/Button";
import Input from "@/components/form/Input";
import Textarea from "@/components/form/Textarea";
import axios from "axios";
import { CldUploadButton } from "next-cloudinary";
import Image from "next/image";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { BsUpload } from "react-icons/bs";
import { FiEdit } from "react-icons/fi";

function useClientConfigForm(slug: string, onChange: () => void) {
  const [loading, setLoading] = useState(true);
  const [toEdit, setToEdit] = useState<Client>();
  const [editMode, setEditMode] = useState(false);
  const [hrefImage, setHrefImage] = useState("/images/Image-placeholder.svg")
  const {register, handleSubmit, formState: { errors }, setValue, getValues } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      description: "",
      brandVoice: "",
      image_insta: "",
    },
  });

  function handleUpload(result: any) {
    const img: string = result.info.secure_url;
    console.log(img)
    setHrefImage(img)
    setValue("image_insta", img);
  }

  async function onEdit() {
    const { data } = await axios.get(`/api/client/${slug}`);
    const client= data.data
    setToEdit(client);
    setValue("name", client.name)
    setValue("description", client.description)
    setValue("brandVoice", client.brandVoice)
    setValue("image_insta", client.image_insta)
    setHrefImage(client.image_insta)

    setEditMode(true);
  }

  const onSubmit: SubmitHandler<FieldValues> = (data) => {

    // Editar
    axios
      .patch(`/api/client/${slug}/${toEdit?.id}`, data)
      .then(() => {
        setValue("name", "");
        setValue("description", "");
        setValue("brandVoice", "");
        setValue("image_insta", "");
        setEditMode(false)
        onChange()
        toast.success("Cliente editado", { duration: 4000 });
      })
      .catch((e) => {
        const error = e.response.data.error
          ? e.response.data.error
          : "Algo salió mal";
        toast.error(error, { duration: 5000 });
      });
  };

  return {toEdit, editMode, onEdit, setEditMode, onSubmit, register, handleSubmit, errors, handleUpload, hrefImage  }
}

interface Props{
  slug: string
  onChange: () => void
}

export default function ClientConfigForm({ slug, onChange }: Props ) {

  const {toEdit, editMode, onEdit, setEditMode, onSubmit, register, handleSubmit, errors, handleUpload, hrefImage} = useClientConfigForm(slug, onChange);

  if (!editMode) return buttons(onEdit);

  return (
    <>
      <section className="flex justify-center w-full">
        <form className="w-full space-y-6 lg:mx-10" onSubmit={handleSubmit(onSubmit)}>
          <Input
            required
            id="name"
            label="Nombre:"
            register={register}
            errors={errors}
          />
          <Textarea
            required
            rows={7}
            id="description"
            label="Descripción:"
            register={register}
            errors={errors}
          />
          <Textarea
            required
            rows={7}
            id="brandVoice"
            label="Voz de Marca:"
            register={register}
            errors={errors}
          />
          <div className="flex items-center gap-4 text-sm font-medium leading-6 text-gray-900">
            <p>Imagen del cliente:</p>
            <CldUploadButton
              options={{maxFiles: 1, tags: [`${slug}`, "client-image"]}}
              onUpload={handleUpload}
              uploadPreset="tinta-posts"
            >              
              <BsUpload size={30} className='w-32 h-10 p-2 bg-gray-200 border border-gray-500 rounded-md hover:bg-gray-300' />
            </CldUploadButton>
            <div className="relative inline-block w-12 h-12 overflow-hidden border rounded-full">
              <Image src={hrefImage} width={100} height={100} alt="Client image" />
            </div>
          </div>

          <div className="flex justify-end gap-2 mt-5 ">
            <Button secondary onClick={() => setEditMode(false)}>
              <p className="w-32">Cancelar</p>
            </Button>
            <Button colorOnPrimary="bg-green-400" type="submit">
              <p className="w-32">Guardar</p>
            </Button>
          </div>
        </form>
      </section>
    </>
  );
}

function buttons(onEdit: () => void) {
  return (
    <>
      <section className="flex justify-center">
        <div onClick={() => onEdit()}>
          <FiEdit size={22} className="hover:cursor-pointer text-sky-400" />
        </div>
      </section>
    </>
  );
}
