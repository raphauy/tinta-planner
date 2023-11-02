"use client"

import { AdvancedImage } from "@cloudinary/react";
import { CloudinaryImage } from "@cloudinary/url-gen";
import { fill } from "@cloudinary/url-gen/actions/resize";
import Link from "next/link";

export default function Logo() {
    const logo = new CloudinaryImage("tinta-posts/cgpnyn6rzcmoembmxpcx.png", {cloudName: 'dtm41dmrz'}).resize(fill().width(90).height(33));  

  return (
    <Link href={"/"}>
        <div>
        {/** @ts-ignore */}
        <AdvancedImage cldImg={logo} />
        {/* <Image src="/logo_tinta_web.png" width="0" height="0" alt="logo" sizes="100vw" priority
            className="h-[32px] w-auto" placeholder="blur" blurDataURL={'/logo_tinta_web.png'}/> */}          
        </div>              
        <p className="text-2xl ml-[2px] mt-[-7px] text-tinta-vino font-medium">planner</p>
    </Link>
  )
}
