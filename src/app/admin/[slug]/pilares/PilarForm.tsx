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
import { Pilar } from '@/app/types/Pilar';
import Modal from '@/app/(client-side)/components/Modal';

interface ConfirmModalProps {
  isOpen?: boolean
  onClose: () => void
  toEdit: Pilar | null
}

export default function PilarFormModal({ isOpen, onClose, toEdit }: ConfirmModalProps) { 
  const [color, setColor] = useState('#DDBBC0');
  const params= useParams()
  const slug= params.slug

  const {register, handleSubmit, formState: {errors}, setValue }= useForm<FieldValues>({
    defaultValues: {
      name: "",
      description: "",
      color: "#DDBBC0",
    }
  });

  useEffect(() => {
    if (toEdit === null){
        setValue("name", "")
        setValue("description", "")
        setValue("color", "#DDBBC0")
        setColor("#DDBBC0")
    } else {
      setValue("name", toEdit.name)
      setValue("description", toEdit.description)
      setValue("color", toEdit.color)
      setColor(toEdit.color)
    }

  }, [toEdit, setValue]);

 
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log("onSubmit, slug: " + slug);

    if (toEdit === null) {
      console.log("guardar, slug: " + slug);
      
      //Guardar
      axios.post(`/api/pilars/${slug}/`, {
        ...data,
      })
      .then(() => {
        setValue("name", "")
        setValue("description", "")
        setValue("color", "#DDBBC0")
        setColor("#DDBBC0")
        toast.success("Pilar creado", { duration: 4000 })
        onClose()
      })      
      .catch((e) => {
        const error= e.response.data.error ? e.response.data.error : "Algo salió mal"
        toast.error(error, { duration: 5000 })        
      })

      return
    }

    // Editar
    axios.put(`/api/pilars/${slug}/${toEdit?.id}`, data)
    .then(() => {
      setValue("name", "")
      setValue("description", "")
      setValue("color", "#DDBBC0")
      setColor("#DDBBC0")
      toast.success("Usuario editado", { duration: 4000 })
      onClose()
    })      
    .catch((e) => {
      const error= e.response.data.error ? e.response.data.error : "Algo salió mal"
      toast.error(error, { duration: 5000 })        
    })
  }

  function handleColor(colChanged: string) {
    setValue("color", colChanged)
    setColor(colChanged)
  }
  

  return (
    <Modal isOpen={isOpen} onClose={onClose}>      
      <div className="sm:flex sm:items-start">
        <div className="flex items-center justify-center flex-shrink-0 w-12 h-12 mx-auto rounded-full bg-sky-100 sm:mx-0 sm:h-10 sm:w-10">
          <FiTrash2 className="w-6 h-6 text-sky-400" aria-hidden="true"/>
        </div>
        <div className="w-full mt-3 mr-8 text-center sm:ml-4 sm:mt-2 sm:text-left">
          <Dialog.Title  as="h3" className="text-xl font-semibold leading-6 text-gray-900">
            Pilar 
          </Dialog.Title>
          <div className="flex flex-col w-full mt-7">
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <Input required id="name" label="Nombre:" register={register} errors={errors}/>
            <Textarea required rows={7} id="description" label="Descripción:" register={register} errors={errors}></Textarea>

            <div className='flex items-center'>
              <p className='mt-3 text-sm font-medium leading-6 text-gray-900'>Color:</p>
              <input value={color} onChange={(e) => handleColor(e.target.value)} type={"color"} className={"rounded-xl w-20 mx-3 mt-3"}/>
              <div className='flex-grow'>
                <Input required id="color" label="" disabled={true} register={register} errors={errors}/>
              </div>              
            </div>

            <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                <button type='submit' className='flex justify-center px-3 py-2 text-sm font-semibold bg-green-400 border border-green-700 rounded-md w-36 hover:opacity-80 focus-visible:outline-tinta-marron focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2'>
                  Guardar
                </button>
                <Button secondary onClick={onClose}>
                  Cancelar
                </Button>
            </div>
          </form>
          </div>
        </div>
      </div>
    </Modal>
  )
}


