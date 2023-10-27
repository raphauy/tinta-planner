"use client"

import clsx from "clsx"
import { LayoutDashboard, User } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

export default function AdminSideBar() {

  const path= usePathname()
  if (!path) return <div>Path not found</div>
  
  const commonClasses= "flex gap-2 items-center py-1 mx-2 rounded hover:bg-gray-200"
  const selectedClasses= "font-bold bg-gray-200"

  const dashboardSelected= path.endsWith("admin")
  const dashboard= clsx(commonClasses, dashboardSelected  && selectedClasses)

  const usersSelected= path.endsWith("users")
  const users= clsx(commonClasses, usersSelected && selectedClasses)

  const pClasses= "hidden sm:block lg:w-36"

  return (
    <>
      <section className="flex flex-col gap-3">

        <Link href="/admin" className={dashboard}>
          <LayoutDashboard />
          <p className={pClasses}>Dashboard</p>                  
        </Link>

        {divider()}

        <Link href="/admin/users" className={users}>
          <User />
          <p className={pClasses}>Users</p>
        </Link>

        {divider()}

      </section>
    </>
  );
}


function divider() {
  return <div className="mx-2 my-5 border-b border-b-tinta-vino/50" />
}

