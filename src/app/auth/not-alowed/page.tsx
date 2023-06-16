import getSession from '@/app/(server-side)/services/getSession'
import Link from 'next/link'
import React from 'react'

interface Props{
    message: string
}

export default async function NotAlowedPage({ message }: Props) {

  const session= await getSession()

 

  return (
    <>
        <section className="flex justify-center">
            <div className="flex flex-col items-center w-1/2 p-4 mt-10 bg-gray-200 border border-gray-300 rounded-xl">
                <p className="mt-10 text-3xl font-bold">No autorizado</p>
                <p className="mt-3 text-xl">{message}</p>
                {
                    session ? 
                    <Link href={"/"} className="px-5 py-1 mx-2 mt-20 text-center text-white w-36 bg-tinta-vino rounded-xl">
                        Home
                    </Link> :
                    <Link href={"/auth/login"} className="px-5 py-1 mx-2 mt-20 text-center text-white w-36 bg-tinta-vino rounded-xl">
                        Login
                    </Link>
            }
            </div>
        </section>
    </>
  )
}

