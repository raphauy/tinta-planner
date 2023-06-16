"use client"

import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AiFillBug, AiFillCalendar, AiFillHome, AiFillInstagram, AiFillSetting, AiFillTool, AiOutlineBug, AiOutlineCalendar, AiOutlineHome, AiOutlineInstagram, AiOutlineSetting, AiOutlineTool } from "react-icons/ai";
import { BsHddStack, BsHddStackFill, BsStack } from "react-icons/bs";
import { FaRegUserCircle, FaUserCircle } from "react-icons/fa";
import LoadingSpinner from "@/components/LoadingSpinner";
import { Users2 } from "lucide-react";
import { Store } from "lucide-react";

export default function SuperSideBar() {
  const path= usePathname()
  if (!path) return <LoadingSpinner />
  
  const commonClasses= "flex gap-2 items-center py-1 mx-2 rounded hover:bg-gray-200"
  const selectedClasses= "font-bold bg-gray-200"

  const dashboardSelected= path.endsWith("super")
  const dashboard= clsx(commonClasses, dashboardSelected  && selectedClasses)

  const agencySelected= path.endsWith("agencies")
  const agencys= clsx(commonClasses, agencySelected && selectedClasses)

  const usersSelected= path.endsWith("users")
  const users= clsx(commonClasses, usersSelected && selectedClasses)

  const configSelected= path.endsWith("config")
  const config= clsx(commonClasses, configSelected && selectedClasses)

  const pClasses= "hidden sm:block lg:w-36"
  return (
    <>
      <section className="flex flex-col gap-3 py-4 border-r border-r-tinta-vino/50">
        <Link href={`/super`} className={dashboard}>
          {dashboardSelected ? <AiFillHome size={25} /> : <AiOutlineHome size={25}/>}          
          <p className={pClasses}>Dashboard</p>                  
        </Link>

        {divider()}

        <Link href={`/super/agencies`} className={agencys}>
          <Store />
          <p className={pClasses}>Agencies</p>
        </Link>
        <Link href={`/super/users`} className={users}>
          <Users2 />
          <p className={pClasses}>Users</p>
        </Link>        

        {divider()}

        <div className="flex flex-col justify-end flex-grow">

          <div className="">
            <Link href={`/super/config`} className={config}>
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
