"use client"

import { LoadingSpinnerChico } from "@/components/LoadingSpinner";
import { AdvancedImage } from "@cloudinary/react";
import { CloudinaryImage } from "@cloudinary/url-gen";
import axios from "axios";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import Avatar from "react-avatar";
import PopOver from "../../components/modal/PopOver";
import Client from "../types/Client";
import PopOverUserHandler from "./PopOverUserHandler";

export default function LoginComponentOld() {
    const [client, setClient] = useState<Client>();

    const { data:session }= useSession()
    const user= session?.user

    useEffect(() => {
      async function fetchClient() {
        const { data } = await axios.get(`/api/client`);
        return data.data;
      }
      if (user && user.role === "agency") {
        return
      }
  
      fetchClient()
      .then((res) => setClient(res))
      .catch(error => console.log(error))

    }, [user]);

    if (!user) return <LoadingSpinnerChico />

    const avatarImage = client && new CloudinaryImage(client.image_insta.split("/").slice(-2).join("/"), {cloudName: 'dtm41dmrz'})

    const avatar= (
        <div>
            {user?.image ?             
            <Image className="rounded-full w-14" src={user?.image} width={116} height={35} alt="logo" /> : 
            <>
            {/** @ts-ignore */ }
            { user.role === "client" ? <Avatar name={user?.email || ""} round={true} size="50" color="#AF8928" className="font-bold cursor-pointer hover:opacity-80"/> :
            <div className="relative inline-block w-8 h-8 overflow-hidden border rounded-full md:h-14 md:w-14">
            {/** @ts-ignore */ }
            {avatarImage && <AdvancedImage cldImg={avatarImage} />}
            </div>
            }
            <span className="absolute block w-2 h-2 bg-green-500 rounded-full right-8 top-4 ring-2 ring-white md:h-3 md:w-3"></span>
        </>        
        }
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
