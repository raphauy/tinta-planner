"use client"

import axios from "axios";
import { signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { GrLogout } from "react-icons/gr";
import { IoIosWine } from "react-icons/io";

import { BsAsterisk } from "react-icons/bs";
import Client from "../../types/Client";
import Link from "next/link";


export default function PopOverUserHandler() {
  const { data:session }= useSession()

  const user= session?.user

  if (!user)
      return <div></div>

  function onLogout(){
    signOut({ callbackUrl: '/auth/login' })    
  }
      
  return (
    <>
      <nav className="flex flex-col gap-2 mt-1 text-sm text-gray-600 min-w-[230px]">
        <ul>
          <li className="flex items-center gap-2 p-1 mb-5 ml-1 border-b">            
            <FaUserCircle size={24} /> {user.email} 
          </li>
            {user.role === "agency" && 
            <li className="flex items-center py-2 pl-1 rounded hover:bg-gray-100">                        
              <Link href="/admin/clients" className="w-full">Clientes</Link>
            </li>
            }          
          <li className="flex items-center w-full mt-16 border-t rounded-md">
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

