"use client"

import { useSession } from "next-auth/react";
import Image from "next/image";
import Avatar from "react-avatar";
import PopOver from "../../components/modal/PopOver";
import PopOverUserHandler from "./PopOverUserHandler";
import { useEffect, useState } from "react";
import axios from "axios";
import { AdvancedImage } from "@cloudinary/react";
import Client from "../types/Client";
import { CloudinaryImage } from "@cloudinary/url-gen";
import LoadingSpinner, { LoadingSpinnerChico } from "@/components/LoadingSpinner";

export default function LoginComponent() {
    const [client, setClient] = useState<Client>();
    
    useEffect(() => {
      async function fetchClient() {
        const { data } = await axios.get(`/api/client`);
        return data.data;
      }
    
      fetchClient()
      .then((res) => setClient(res));
    }, []);

    const { data:session }= useSession()
    const user= session?.user

    if (!user) return <LoadingSpinner />
    if (!client) return <LoadingSpinnerChico />

    const avatarImage = new CloudinaryImage(client.image_insta.split("/").slice(-2).join("/"), {cloudName: 'dtm41dmrz'})

    const avatar= (
        <div>
            {user?.image ?             
            <Image className="rounded-full w-14" src={user?.image} width={116} height={35} alt="logo" /> : 
            <>
            { user.role === "agency" ?
            <Avatar name={user?.email || ""} round={true} size="50" color="#AF8928" className="font-bold cursor-pointer hover:opacity-80"/> :
            <div className="relative inline-block w-8 h-8 overflow-hidden border rounded-full md:h-14 md:w-14">
                <AdvancedImage cldImg={avatarImage} />
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
