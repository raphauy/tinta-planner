"use client"

import Image from "next/image";
import Link from "next/link";
import LoginComponent from "./login/LoginComponent";

export default function NavBar() {
  
  return (
    <header className="flex items-center justify-between px-8 py-2 border-b border-tinta-vino bg-tinta-natural" >
      <Link href={"/"}>
        <div>
          <Image src="/logo_tinta_web.png" width="0" height="0" alt="logo" sizes="100vw" priority
            className="h-[32px] w-auto" placeholder="blur" blurDataURL={'/logo_tinta_web.png'}/>
        </div>              
        <p className="text-2xl ml-1 mt-[-7px] text-tinta-vino font-medium">planner</p>
      </Link>

      <LoginComponent />
    </header>
  )
}
