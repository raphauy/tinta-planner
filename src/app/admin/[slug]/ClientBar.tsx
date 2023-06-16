"use client";

import { AiOutlineMenu, AiOutlinePlus } from "react-icons/ai";
import ClientBox from "./ClientBox";
import Client from "../../types/Client";
import { useState } from "react";
import useClient from "../../(client-side)/hooks/useClient";

interface ClientBarProps {
  clients: Client[];
}

export default function ClientBar({ clients }: ClientBarProps) {
  const [open, setOpen] = useState(false)
  const icon = AiOutlinePlus;
  const currentClient= useClient()

  return (
    <>
      <AiOutlineMenu size={30} className='block mt-1 ml-1 cursor-pointer sm:hidden' onClick={() => setOpen(!open)}/>

      <div className={`sm:flex sm:flex-row flex-col w-full bg-white border-b-[1px] border-b-tinta-vino ${!open && " hidden "}`}>
        {clients.map((client) => (
          <ClientBox
            key={client.id}
            href={`/admin/${client.slug}`}
            label={client.name}
            icon={icon}
            active={client.slug === currentClient.slug}
          />
        ))}
      </div>
    </>
  );
}
