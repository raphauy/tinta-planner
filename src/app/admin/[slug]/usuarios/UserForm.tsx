'use client';

import React, { useEffect, useState } from 'react'
import { Dialog } from '@headlessui/react'
import { toast } from 'react-hot-toast';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Textarea from '@/components/ui/Textarea';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import axios from 'axios';
import { FiTrash2 } from 'react-icons/fi';
import { useParams } from 'next/navigation';
import User from '@/app/types/User';
import Modal from '@/app/(client-side)/components/Modal';

interface ConfirmModalProps {
  isOpen?: boolean
  onClose: () => void
  toEdit: User | null
}

export default function UserFormModal({ isOpen, onClose, toEdit }: ConfirmModalProps) { 
  const params= useParams()
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
        setValue("name", "")
        setValue("email", "")
        onClose()
      })      
      .catch((e) => {
        const error= e.response.data.error ? e.response.data.error : "Algo salió mal"
        toast.error(error, { duration: 5000 })        
      })

      return
    }

    // Editar
    axios.put(`/api/users/${slug}/${toEdit?.id}`, data)
    .then(() => {
      toast.success("Usuario editado", { duration: 4000 })
      setValue("name", "")
      setValue("email", "")
      onClose()
    })      
    .catch((e) => {
      const error= e.response.data.error ? e.response.data.error : "Algo salió mal"
      toast.error(error, { duration: 5000 })        
    })


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

            <div className="gap-2 mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                <button type='submit' className='flex justify-center px-3 py-2 text-sm font-semibold bg-green-400 border border-green-700 rounded-md w-36 hover:opacity-80 focus-visible:outline-tinta-marron focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2'>
                  Guardar
                </button>
                <Button secondary onClick={onClose}>
                  <p className='w-32'>Cancelar</p>                  
                </Button>
            </div>
          </form>
          </div>
        </div>
      </div>
    </Modal>
  )
}


type NamedColor = 'red' | 'green' | 'yellow' | 'blue' | 'black' | 'white' | 'purple' | 'orange' | 'cyan' | 'magenta';

function toHexColor(color: string): string {
  const namedColors: Record<NamedColor, string> = {
    red: '#FF0000',
    green: '#00FF00',
    yellow: '#FFFF00',
    blue: '#0000FF',
    black: '#000000',
    white: '#FFFFFF',
    purple: '#800080',
    orange: '#FFA500',
    cyan: '#00FFFF',
    magenta: '#FF00FF',
  };

  if (/^#[0-9A-Fa-f]{6}$/.test(color)) {
    return color.toUpperCase();
  }

  const namedColor = color.toLowerCase() as NamedColor;
  return namedColors[namedColor] || '';
}

