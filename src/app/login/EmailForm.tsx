'use client';

import { signIn, useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { useRouter } from "next/navigation";

import { toast } from "react-hot-toast";
import Input from '@/components/form/Input';
import Button from '@/components/form/Button';
import { LoadingSpinnerChico } from '@/components/LoadingSpinner';

export default function AuthForm() {
  const session = useSession();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (session?.status === 'authenticated') {
      router.push('/')
    }
  }, [session?.status, router]);

  const { register, handleSubmit, formState: { errors } } = useForm<FieldValues>({
    defaultValues: {
      name: '',
      email: '',
      password: ''
    }
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => { 
    
    setIsLoading(true);  
    console.log("data " + JSON.stringify(data));

    signIn('email', {...data, redirect: false })
    .then((callback) => {
      console.log(callback);

      if (callback?.error) {
        toast.error('Algo salió mal!');
      }

      if (callback?.ok) {
        router.push('/login-link')
      }
    })
    .finally(() => setIsLoading(false))
}

  return ( 
    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div 
        className="px-4 py-8 bg-white shadow sm:rounded-lg sm:px-10"
      >
        <form 
          className="space-y-6" 
          onSubmit={handleSubmit(onSubmit)}
        >
          <Input
            disabled={isLoading}
            register={register}
            errors={errors}
            required
            id="email" 
            label="Email"
            type="email"
          />
          <div>
            <Button disabled={isLoading} fullWidth type="submit">
              {isLoading ? <LoadingSpinnerChico /> : "Continuar"}
            </Button>
          </div>
        </form>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center " >
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 text-gray-500 bg-white">
                tinta.wine
              </span>
            </div>
          </div>

        </div>
        <div className="flex justify-center gap-2 px-2 mt-6 text-sm text-gray-500" >
        <div>
            Le enviaremos un link de acceso
          </div>
        </div>
      </div>
    </div>
  );
}
 
