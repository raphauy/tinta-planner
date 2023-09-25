"use client"

import LoadingSpinner from "@/components/LoadingSpinner";
import { getBasePath, getSlug } from "@/lib/utils";
import clsx from "clsx";
import { AreaChart } from "lucide-react";
import { ListChecks } from "lucide-react";
import { Wine } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AiFillCalendar, AiFillHome, AiFillInstagram, AiFillTool, AiOutlineCalendar, AiOutlineHome, AiOutlineInstagram, AiOutlineTool } from "react-icons/ai";
import { BsHddStack, BsHddStackFill } from "react-icons/bs";
import { FaRegUserCircle, FaUserCircle } from "react-icons/fa";

export default function SocialSideBar() {
  const path= usePathname()
  if (!path) return <LoadingSpinner />
  
  const slug= getSlug(path)
  const basePath= getBasePath(path)

  const commonClasses= "flex gap-2 items-center py-1 mx-2 rounded hover:bg-gray-200"
  const selectedClasses= "font-bold bg-gray-200"

  const dashboardSelected= path.endsWith("social")
  const dashboard= clsx(commonClasses, dashboardSelected  && selectedClasses)

  const calendarSelected= path.endsWith("calendar")
  const calendar= clsx(commonClasses, calendarSelected && selectedClasses)

  const postsSelected= path.endsWith("posts")
  const posts= clsx(commonClasses, postsSelected && selectedClasses)

  const pilarsSelected= path.endsWith("pilars")
  const pilars= clsx(commonClasses, pilarsSelected && selectedClasses)

  const clientconfigSelected= path.endsWith("config")
  const clientconfig= clsx(commonClasses, clientconfigSelected && selectedClasses)

  const usersSelected= path.endsWith("users")
  const users= clsx(commonClasses, usersSelected && selectedClasses)

  const winesSelected= path.endsWith("wines")
  const wines= clsx(commonClasses, winesSelected && selectedClasses)

  const informesSelected= path.endsWith("informes")
  const informes= clsx(commonClasses, informesSelected && selectedClasses)

  const gestionarSelected= path.endsWith("gestionar")
  const gestionar= clsx(commonClasses, gestionarSelected && selectedClasses)

  const pClasses= "hidden sm:block lg:w-36"
  return (
    <>
      <section className="flex flex-col gap-3">

        <Link href={`/${basePath}/${slug}/social`} className={dashboard}>
          {dashboardSelected ? <AiFillHome size={25} /> : <AiOutlineHome size={25}/>}          
          <p className={pClasses}>Dashboard</p>                  
        </Link>

        {divider()}

        <Link href={`/${basePath}/${slug}/social/calendar`} className={calendar}>
          {calendarSelected ? <AiFillCalendar size={25}/> : <AiOutlineCalendar size={25}/>}          
          <p className={pClasses}>Calendario</p>
        </Link>
        <Link href={`/${basePath}/${slug}/social/posts`} className={posts}>
          {postsSelected ? <AiFillInstagram size={25}/> : <AiOutlineInstagram size={25}/>}          
          <p className={pClasses}>Posts</p>
        </Link>
        <Link href={`/${basePath}/${slug}/social/pilars`} className={pilars}>
          {pilarsSelected ? <BsHddStackFill size={25}/> : <BsHddStack size={25}/>}
          <p className={pClasses}>Pilares</p>
        </Link>
        <Link href={`/${basePath}/${slug}/social/wines`} className={wines}>
          <Wine />
          <p className={pClasses}>Vinos</p>
        </Link>
        <Link href={`/${basePath}/${slug}/social/users`} className={users}>
          {usersSelected ? <FaUserCircle size={25}/> : <FaRegUserCircle size={25}/>}
          <p className={pClasses}>Usuarios</p>
        </Link>

        {divider()}

        <Link href={`/${basePath}/${slug}/social/informes`} className={informes}>
          <AreaChart />
          <p className={pClasses}>Informes</p>
        </Link>
        <Link href={`/${basePath}/${slug}/social/informes/gestionar`} className={gestionar}>
          <ListChecks />
          <p className={pClasses}>Gestionar</p>
        </Link>

        {divider()}

        <Link href={`/${basePath}/${slug}/social/config`} className={clientconfig}>
          {clientconfigSelected ? <AiFillTool size={25}/> : <AiOutlineTool size={25}/>}
          <p className={pClasses}>Configuración</p>
        </Link>
        
        {divider()}

      </section>
    </>
  );
}


function divider() {
  return <div className="mx-2 my-5 border-b border-b-tinta-vino/50" />
}

