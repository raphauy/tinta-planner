import Link from 'next/link'
import React from 'react'

interface Props {
  searchParams?: {
    message: string
  }
};
function NotAlowedPage({ searchParams }: Props) {
  const message = searchParams?.message ?? ""
  return (
    <>
        <section className="flex flex-col items-center justify-center">
        <div className="flex flex-col items-center mt-10 text-3xl">
            <p>No autorizado</p>
        </div>
        <div className="flex flex-col items-center mt-10 text-2xl">
            <p>{message}</p>
        </div>
        <div className="flex justify-center w-1/2 p-4 mt-10 bg-gray-200 border border-gray-300 rounded-xl">
            <Link href={"/"} className="px-5 py-1 mx-2 text-center text-white w-36 bg-tinta-vino rounded-xl">
                Home
            </Link>
        </div>
        </section>
    </>
  )
}

export default NotAlowedPage