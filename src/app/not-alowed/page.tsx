import Link from 'next/link'
import React from 'react'

function NotAlowedPage() {
  return (
    <>
        <section className="flex flex-col items-center justify-center">
        <div className="flex flex-col items-center mt-10 text-3xl">
            <p>No autorizado</p>
        </div>
        <div className="flex justify-center w-1/2 p-4 mt-10 bg-gray-200 border border-gray-300 rounded-xl">
            <Link href={"/"} className="px-5 py-1 mx-2 text-center text-white w-36 bg-tinta-vino rounded-xl">
                Home
            </Link>
            <Link href={"/dashboard"} className="px-5 py-1 mx-2 text-center text-white w-36 bg-tinta-vino rounded-xl">
                Dashboard
            </Link>
            <Link href={"/client"} className="px-5 py-1 mx-2 text-center text-white w-36 bg-tinta-vino rounded-xl">
                Client page
            </Link>
        </div>
        </section>
    </>
  )
}

export default NotAlowedPage