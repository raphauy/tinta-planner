'use client';

import React, { useEffect, useState } from 'react'
import { Dialog } from '@headlessui/react'
import { toast } from 'react-hot-toast';
import Input from '@/components/form/Input';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import axios from 'axios';
import { FiTrash2 } from 'react-icons/fi';
import { useParams } from 'next/navigation';
import User from '@/app/types/User';
import Button from '@/components/form/Button';
import Modal from '@/components/modal/Modal';

interface ConfirmModalProps {
  isOpen?: boolean
  onClose: () => void
  toEdit: User | null
}

export default function UserFormModal({ isOpen, onClose, toEdit }: ConfirmModalProps) { 
  const params= useParams()
  if (!params)
    throw Error("useParams() is not working")

  const slug= params.slug

  const {register, handleSubmit, formState: {errors}, setValue }= useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
    }
  });

  useEffect(() => {
    if (toEdit === null){
        setValue("name", "")
        setValue("email", "")
      } else {
      setValue("name", toEdit.name)
      setValue("email", toEdit.email)
    }

  }, [toEdit, setValue]);

 
  const onSubmit: SubmitHandler<FieldValues> = (data) => {

    if (toEdit === null) {
      //Guardar
      axios.post(`/api/users/${slug}/`, {
        ...data,
      })
      .then(() => {
        toast.success("Usuario creado", { duration: 4000 })
      })      
      .catch((e) => {
        const error= e.response.data.error ? e.response.data.error : "Algo salió mal"
        toast.error(error, { duration: 5000 })
        return
      })

    } else {
      // Editar
      axios.put(`/api/users/${slug}/${toEdit?.id}`, data)
      .then(() => {
        toast.success("Usuario editado", { duration: 4000 })
      })      
      .catch((e) => {
        const error= e.response.data.error ? e.response.data.error : "Algo salió mal"
        toast.error(error, { duration: 5000 })        
        return
      })
    }

    setValue("name", "")
    setValue("email", "")
    onClose()
}

  const title= toEdit === null ? "Crear usuario" : "Editar usuario"

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="sm:flex sm:items-start">
        <div className="flex items-center justify-center flex-shrink-0 w-12 h-12 mx-auto rounded-full bg-sky-100 sm:mx-0 sm:h-10 sm:w-10">
          <FiTrash2 className="w-6 h-6 text-sky-400" aria-hidden="true"/>
        </div>
        <div className="w-full mt-3 mr-8 text-center sm:ml-4 sm:mt-2 sm:text-left">
          <Dialog.Title  as="h3" className="text-xl font-semibold leading-6 text-gray-900">
            {title}
          </Dialog.Title>
          <div className="flex flex-col w-full mt-7">
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <Input id="name" label="Nombre:" register={register} errors={errors}/>
            <Input required id="email" type="email" label="Email:" register={register} errors={errors}/>

            <div className="flex justify-end gap-2 mt-5">
              <Button secondary onClick={onClose}>
                <p className="w-32">Cancelar</p>
              </Button>
              <Button colorOnPrimary="bg-green-400" type='submit'>
                <p className="w-32">Guardar</p>
              </Button>
            </div>
          </form>
          </div>
        </div>
      </div>
    </Modal>
  )
}
