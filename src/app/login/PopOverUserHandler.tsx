"use client"

import axios from "axios";
import { signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { GrLogout } from "react-icons/gr";
import { IoIosWine } from "react-icons/io";
import { FaUserCircle } from "react-icons/fa";

import Client from "../types/Client";
import { BsAsterisk, BsPersonWorkspace } from "react-icons/bs";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { AiFillSetting, AiOutlineSetting } from "react-icons/ai";

function usePopOver(){
  const [client, setClient] = useState<Client>()
  const router= useRouter()

  useEffect(() => {
    async function fetch() {
      const { data } = await axios.get(`/api/client/`);
      return data.data;
    }
    fetch()
    .then((res) => setClient(res))
    .catch(error => console.log(error))


  }, []);

  function onLogout(){
    signOut({ callbackUrl: '/login' })    
  }

  return { client, onLogout }
}

export default function PopOverUserHandler() {
  const { client, onLogout }= usePopOver()
  const { data:session }= useSession()

  const user= session?.user

  if (!user)
      return <div></div>

  return (
    <>
      <nav className="flex flex-col gap-2 mt-1 text-sm text-gray-600 min-w-[230px]">
        <ul>
          <li className="flex items-center gap-2 p-1 ml-1">
            <FaUserCircle size={24} /> {user.email} 
          </li>
          <li className="flex items-center gap-2 pb-2 pl-1 ml-9">
            {user.role === "agency" ? user.role+"(admin)" : ""}
          </li>
          <li className="flex items-center gap-2 pb-2 pl-1 mb-3 border-b">            
            
          </li>
          {user.role === "agency" &&
            <li className="flex items-center gap-2 pb-3 pl-1 mb-2 border-b hover:bg-gray-100">
              <Link href={`/config?refresh=${new Date().getMilliseconds()}`} className="flex items-center gap-2">
                <AiFillSetting size={25}/> Cambiar Usuarios
              </Link>
            </li>
          }
          <li className="flex items-center w-full mt-10 rounded-md">
            <div onClick={onLogout} 
              className="flex items-center flex-grow px-1 py-3 mt-2 rounded-md cursor-pointer hover:border hover:border-gray-500 hover:bg-gray-200">
              <GrLogout size={20} className="mr-2" />Logout
            </div>
          </li>
        </ul>
      </nav>
    </>
  );
}
