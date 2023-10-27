"use client";

import Client from "@/app/types/Client";
import User from "@/app/types/User";
import { LoadingSpinnerChico } from "@/components/LoadingSpinner";
import Button from "@/components/form/Button";
import Input from "@/components/form/Input";
import Textarea from "@/components/form/Textarea";
import axios from "axios";
import { useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { FiEdit } from "react-icons/fi";

function useUserConfigForm({ userId, onSave }: Props ) {
  const [loading, setLoading] = useState(true);
  const [toEdit, setToEdit] = useState<User>();
  const {register, handleSubmit, formState: { errors }, setValue } = useForm<FieldValues>({
    defaultValues: {
      clientId: "",
    },
  });

  useEffect(() => {
        
    async function fetch() {
        const { data } = await axios.get(`/api/users/cambiar/${userId}`);
        const user= data.data
        setToEdit(user);
        setValue("clientId", user.clientId)
    }

    fetch()
    setLoading(false);
  }, [setValue, userId]);


  const onSubmit: SubmitHandler<FieldValues> = (data) => {

    // Editar
    axios
      .patch(`/api/users/cambiar/${toEdit?.id}`, data)
      .then(() => {
        setValue("clientId", "");
        onSave()
        toast.success("Cliente cambiado", { duration: 4000 });
      })
      .catch((e) => {
        const error = e.response.data.error
          ? e.response.data.error
          : "Algo salió mal";
        toast.error(error, { duration: 5000 });
      });
  };

  return {toEdit, onSubmit, register, handleSubmit, errors  }
}

interface Props{
  userId: string
  clients: Client[];
  onSave: () => void
  onCancel: () => void
}

export default function UserConfigForm({ userId, clients, onSave, onCancel }: Props ) {

  const {toEdit, onSubmit, register, handleSubmit, errors  } = useUserConfigForm({ userId, clients, onSave, onCancel });

  if (!toEdit) return <LoadingSpinnerChico />

  return (
    <>
      <section className="flex flex-col items-center mt-5">
        <div className="flex justify-between w-1/2 gap-3 my-3">
            <div>{toEdit.name}</div>
            <div className="">{toEdit.email}</div>
        </div>
        <form className="w-1/2 space-y-6 " onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
            <select id='clientId' {...register("clientId", { required: 'El cliente es obligatorio' })} className="w-full p-2 border border-gray-300 rounded">              
                {
                    clients.map((client) => (
                        <option key={client.id} value={client.id}>
                            {client.name}
                        </option>          
                    ))
                }
            </select>
          </div>
          <div className="flex justify-end gap-2 mt-5 ">
            <Button secondary onClick={() => onCancel()}>
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
