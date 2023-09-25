"use client"

import LoadingSpinner from "@/components/LoadingSpinner";
import { getBasePath, getSlug } from "@/lib/utils";
import clsx from "clsx";
import { AreaChart, Gauge, Home, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AiFillHome, AiOutlineHome } from "react-icons/ai";

export default function ConfigSideBar() {
  const path= usePathname()
  if (!path) return <LoadingSpinner />
  
  const commonClasses= "flex gap-2 items-center py-1 mx-2 rounded hover:bg-gray-200"
  const selectedClasses= "font-bold bg-gray-200"

  const dashboardSelected= path.endsWith("config")
  const dashboard= clsx(commonClasses, dashboardSelected  && selectedClasses)

  const indicatorSelected= path.endsWith("indicators")
  const indicator= clsx(commonClasses, indicatorSelected && selectedClasses)

  const reportSelected= path.endsWith("reports")
  const report= clsx(commonClasses, reportSelected && selectedClasses)

  const usersSelected= path.endsWith("users")
  const users= clsx(commonClasses, usersSelected && selectedClasses)

  const pClasses= "hidden sm:block lg:w-36"
  return (
    <>
      <section className="flex flex-col gap-3 mt-6">

        <Link href={`/config`} className={dashboard}>
          <Home />
          <p className={pClasses}>Dashboard</p>                  
        </Link>

        {divider()}

        <Link href={`/config/reports`} className={report}>
          <AreaChart size={25}/>
          <p className={pClasses}>Reportes</p>
        </Link>
        <Link href={`/config/indicators`} className={indicator}>
          <Gauge size={25}/>
          <p className={pClasses}>Indicadores</p>
        </Link>

        {divider()}

        <Link href={`/config/users`} className={users}>
          <User size={25}/>
          <p className={pClasses}>Usuarios</p>
        </Link>

        {divider()}

      </section>
    </>
  );
}


function divider() {
  return <div className="mx-2 my-5 border-b border-b-tinta-vino/50" />
}

