"use client";

import Client from "@/app/types/Client";
import Button from "@/components/form/Button";
import Input from "@/components/form/Input";
import Textarea from "@/components/form/Textarea";
import axios from "axios";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { FiEdit } from "react-icons/fi";

function useClientConfigForm(slug: string, onChange: () => void) {
  const [loading, setLoading] = useState(true);
  const [toEdit, setToEdit] = useState<Client>();
  const [editMode, setEditMode] = useState(false);
  const {register, handleSubmit, formState: { errors }, setValue } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      description: "",
      brandVoice: "",
    },
  });

  async function onEdit() {
    const { data } = await axios.get(`/api/client/${slug}`);
    const client= data.data
    setToEdit(client);
    setValue("name", client.name)
    setValue("description", client.description)
    setValue("brandVoice", client.brandVoice)

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

  return {toEdit, editMode, onEdit, setEditMode, onSubmit, register, handleSubmit, errors  }
}

interface Props{
  slug: string
  onChange: () => void
}

export default function ClientConfigForm({ slug, onChange }: Props ) {

  const {toEdit, editMode, onEdit, setEditMode, onSubmit, register, handleSubmit, errors  } = useClientConfigForm(slug, onChange);

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
          ></Textarea>
          <Textarea
            required
            rows={7}
            id="brandVoice"
            label="Voz de Marca:"
            register={register}
            errors={errors}
          ></Textarea>
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
