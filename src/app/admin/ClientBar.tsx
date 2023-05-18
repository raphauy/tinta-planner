"use client";

import { AiOutlinePlus } from "react-icons/ai";
import ClientBox from "./ClientBox";
import Client from "../types/Client";
import useClient from "../(client-side)/hooks/useClient";

interface ClientBarProps {
  clients: Client[];
}

export default function ClientBar({ clients }: ClientBarProps) {
  const icon = AiOutlinePlus;
  const currentClient= useClient()

  function handleClick() {
    console.log("handleClick");    
  }

  return (
    <div className="flex items-center w-full bg-white border-b-[1px] border-b-tinta-vino">
      {clients.map((client) => (
        <ClientBox
          key={client.id}
          href={`/admin/${client.slug}`}
          label={client.name}
          onClick={handleClick}
          icon={icon}
          active={client.slug === currentClient.slug}
        />
      ))}
    </div>
  );
}
