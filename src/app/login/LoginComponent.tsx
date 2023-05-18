"use client"

import { useSession } from "next-auth/react";
import Image from "next/image";
import Avatar from "react-avatar";
import PopOver from "../(client-side)/components/PopOver";
import PopOverUserHandler from "./PopOverUserHandler";

export default function LoginComponent() {

    const { data:session }= useSession()

    const user= session?.user

    if (!user)
        return <div></div>

    const avatar= (
        <div>
            {user?.image ? 
            <Image className="rounded-full w-14" src={user?.image} width={116} height={35} alt="logo" /> : 
            <Avatar name={user?.email || ""} round={true} size="50" color="#AF8928" className="font-bold cursor-pointer hover:opacity-80"/>}
            <span className="absolute block w-2 h-2 bg-green-500 rounded-full right-8 top-4 ring-2 ring-white md:h-3 md:w-3"></span>
        </div>
    )

    return (
        <section className="text-base text-gray-700 sm:flex sm:justify-between">
            <div className="flex items-center justify-between">
                <div className="px-3">
                    <p>{user?.email}</p>                            
                </div>
                <PopOver trigger={avatar} body={<PopOverUserHandler />}  />

            </div>
        </section>
)
}
