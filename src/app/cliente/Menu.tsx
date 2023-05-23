"use client"

import { useParams, usePathname } from 'next/navigation'

import { AiFillCalendar, AiFillInstagram, AiOutlineCalendar, AiOutlineInstagram, AiOutlineMenu } from 'react-icons/ai'
import ClientBox from '../admin/ClientBox'
import { BsFillHddStackFill, BsHddStack, BsHddStackFill } from 'react-icons/bs'
import { useState } from 'react'

console.log("render menú...");


export default function Menu() {
  const [open, setOpen] = useState(false)
  const path= usePathname()

  const calendarActive= path.endsWith("calendario")
  const calendarIcon= calendarActive ? AiFillCalendar : AiOutlineCalendar
  const postsActive= path.endsWith("posts")
  const postsIcon= postsActive ? AiFillInstagram : AiOutlineInstagram
  const pilaresActive= path.endsWith("pilares")
  const pilaresIcon= pilaresActive ? BsHddStackFill : BsHddStack

  return (
    <>
      <AiOutlineMenu size={30} className='block cursor-pointer sm:hidden' onClick={() => setOpen(!open)}/>
      <div className={`sm:flex sm:flex-row flex-col w-full bg-white border-b-[1px] border-b-tinta-vino ${!open && " hidden "}`}>
          <ClientBox label='Calendario' href='/cliente/calendario' active={calendarActive} icon={calendarIcon}/>
          <ClientBox label='Posts' href='/cliente/posts' active={postsActive} icon={postsIcon}/>
          <ClientBox label='Pilares de contenido' href='/cliente/pilares' active={pilaresActive} icon={pilaresIcon}/>
      </div>
    </>
  )
}
