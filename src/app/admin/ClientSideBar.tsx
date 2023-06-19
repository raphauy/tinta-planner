"use client"

import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AiFillBug, AiFillCalendar, AiFillHome, AiFillInstagram, AiFillSetting, AiFillTool, AiOutlineBug, AiOutlineCalendar, AiOutlineHome, AiOutlineInstagram, AiOutlineSetting, AiOutlineTool } from "react-icons/ai";
import { BsHddStack, BsHddStackFill, BsStack } from "react-icons/bs";
import { FaRegUserCircle, FaUserCircle } from "react-icons/fa";
import LoadingSpinner from "@/components/LoadingSpinner";

export default function ClientSideBar() {
  const path= usePathname()
  if (!path) return <LoadingSpinner />
  
  const slug= getSlug(path)

  const commonClasses= "flex gap-2 items-center py-1 mx-2 rounded hover:bg-gray-200"
  const selectedClasses= "font-bold bg-gray-200"

  const dashboardSelected= path.endsWith(slug)
  const dashboard= clsx(commonClasses, dashboardSelected  && selectedClasses)

  const calendarSelected= path.endsWith("calendar")
  const calendar= clsx(commonClasses, calendarSelected && selectedClasses)

  const postsSelected= path.endsWith("posts")
  const posts= clsx(commonClasses, postsSelected && selectedClasses)

  const pilarsSelected= path.endsWith("pilares")
  const pilars= clsx(commonClasses, pilarsSelected && selectedClasses)

  const clientconfigSelected= path.endsWith("clientconfig")
  const clientconfig= clsx(commonClasses, clientconfigSelected && selectedClasses)

  const usersSelected= path.endsWith("usuarios")
  const users= clsx(commonClasses, usersSelected && selectedClasses)

  const configSelected= path.endsWith("config")
  const config= clsx(commonClasses, configSelected && selectedClasses)

  const reportSelected= path.endsWith("report")
  const report= clsx(commonClasses, reportSelected && selectedClasses)

  const pClasses= "hidden sm:block lg:w-36"
  return (
    <>
      <section className="flex flex-col gap-3 py-4 border-r border-r-tinta-vino/50">
        <Link href={`/admin/${slug}`} className={dashboard}>
          {dashboardSelected ? <AiFillHome size={25} /> : <AiOutlineHome size={25}/>}          
          <p className={pClasses}>Dashboard</p>                  
        </Link>

        {divider()}

        <Link href={`/admin/${slug}/calendar`} className={calendar}>
          {calendarSelected ? <AiFillCalendar size={25}/> : <AiOutlineCalendar size={25}/>}          
          <p className={pClasses}>Calendario</p>
        </Link>
        <Link href={`/admin/${slug}/posts`} className={posts}>
          {postsSelected ? <AiFillInstagram size={25}/> : <AiOutlineInstagram size={25}/>}          
          <p className={pClasses}>Posts</p>
        </Link>
        <Link href={`/admin/${slug}/pilares`} className={pilars}>
          {pilarsSelected ? <BsHddStackFill size={25}/> : <BsHddStack size={25}/>}
          <p className={pClasses}>Pilares</p>
        </Link>
        <Link href={`/admin/${slug}/usuarios`} className={users}>
          {usersSelected ? <FaUserCircle size={25}/> : <FaRegUserCircle size={25}/>}
          <p className={pClasses}>Usuarios</p>
        </Link>

        {divider()}
        <Link href={`/admin/${slug}/clientconfig`} className={clientconfig}>
          {clientconfigSelected ? <AiFillTool size={25}/> : <AiOutlineTool size={25}/>}
          <p className={pClasses}>Conf. Cliente</p>
        </Link>
        {divider()}

        <div className="flex flex-col justify-end flex-grow">

          <div className="">
            <Link href={`/admin/report`} className={report}>
              {reportSelected ? <AiFillBug size={25}/> : <AiOutlineBug size={25}/>}
              <p className={pClasses}>Report</p>            
            </Link>
          </div>
          <div className="">
            <Link href={`/admin/config?refresh=${new Date().getMilliseconds()}`} className={config}>
              {configSelected ? <AiFillSetting size={25}/> : <AiOutlineSetting size={25}/>}
              <p className={pClasses}>Config</p>            
            </Link>
          </div>
        </div>

      </section>
    </>
  );
}


function divider() {
  return <div className="mx-2 my-5 border-b border-b-tinta-vino/50" />
}

function getSlug(path: string) {
  const segments = path.split("/");
  const slug = segments[2];
  return slug;
}
