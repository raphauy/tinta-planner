"use client"

import { getBasePath, getSlug } from "@/lib/utils"
import clsx from "clsx"
import { GraduationCap, LayoutDashboard, ListFilter, Magnet, PlusCircle, Target } from "lucide-react"
import Link from "next/link"
import { usePathname, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { types } from "./leads/create/main-form"

export default function CRMSideBar() {
  const searchParams= useSearchParams()  

  const path= usePathname()
  if (!path) return <div>Path not found</div>

  
  const slug= getSlug(path)
  const basePath= getBasePath(path)

  const commonClasses= "flex gap-2 items-center py-1 mx-2 rounded hover:bg-gray-200"
  const selectedClasses= "font-bold bg-gray-200"

  const dashboardSelected= path.endsWith("crm")
  const dashboard= clsx(commonClasses, dashboardSelected  && selectedClasses)

  const servicesSelected= path.endsWith("services")
  const services= clsx(commonClasses, servicesSelected && selectedClasses)

  const leadsSelected= path.endsWith("leads") && searchParams.toString() === ""
  const leads= clsx(commonClasses, leadsSelected && selectedClasses)

  const potencialSelected= searchParams.get("status")?.includes("Potencial")
  const potencial= clsx(commonClasses, potencialSelected && selectedClasses)

  const visible= slug === "tinta" ? "visible" : "hidden"
  const wsetsSelected= path.endsWith("wsets")
  const wsets= clsx(commonClasses, wsetsSelected && selectedClasses , visible)

  const refresh= wsetsSelected ? `?refresh=${new Date().getMilliseconds()}` : ""
  const pClasses= "hidden sm:block lg:w-36"

  return (
    <>
      <section className="flex flex-col gap-3">

        <Link href={`/${basePath}/${slug}/crm`} className={dashboard}>
          <LayoutDashboard />
          <p className={pClasses}>Dashboard</p>                  
        </Link>

        {divider()}

        <Link href={`/${basePath}/${slug}/crm/services`} className={services}>
          <Target />
          <p className={pClasses}>Servicios</p>
        </Link>

        <Link href={`/${basePath}/${slug}/crm/leads${refresh}`} className={leads}>
          <Magnet />
          <p className={pClasses}>Leads</p>
        </Link>

        <div className="space-y-0">
          <Link href={`/${basePath}/${slug}/crm/leads?status=Potencial`} className={potencial}>
            <ListFilter />
            <p className={pClasses}>Potenciales:</p>
          </Link>

          {
            types.map((type) => {
              const selected= searchParams.get("types")?.includes(type)
              const classes= clsx(commonClasses, selected && selectedClasses, "pl-8")
              return (
                <Link key={type} href={`/${basePath}/${slug}/crm/leads?status=Potencial&types=${type}`} className={classes}>
                  <p className={pClasses}>{type}</p>
                </Link>
              )
            })
          }          
        </div>


        {divider()}

        <Link href={`/${basePath}/${slug}/crm/wsets`} className={wsets}>
          <GraduationCap />
          <p className={pClasses}>wsets</p>
        </Link>

      </section>
    </>
  );
}


function divider() {
  return <div className="mx-2 my-5 border-b border-b-tinta-vino/50" />
}

