"use client"

import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarTrigger } from "@/components/ui/menubar"
import { cn, getPostStatusColor } from "@/lib/utils"
import { updatePostStatusAction } from "./actions"
import toast from "react-hot-toast"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

interface Props {
  id: string
  status: string
  onPost?: (id: string) => void
}
export function PostStatusSelector({ id, status, onPost }: Props) {
  const [node, setNode] = useState<React.ReactNode>()  

  useEffect(() => {
    setNode(getNode(status))
  }, [status, id])
  

  function handleClick(status: string) {
    updatePostStatusAction(id, status)
    .then((res) => {
      if (res){
        toast.success("Estado actualizado", { duration: 4000 })
        setNode(getNode(status))
        onPost && onPost(id)
      } else toast.error("Error al actualizar el estado", { duration: 4000 })
    })    
  }
  return (
    <Menubar className="p-0 m-0 bg-transparent border-none">
      <MenubarMenu>
        <MenubarTrigger>
          {node}
        </MenubarTrigger>
        <MenubarContent>
          <MenubarItem onClick={() => handleClick("Draft")}>
            {getNode("Draft")}
          </MenubarItem>
          <MenubarItem onClick={() => handleClick("Revisado")}>
            {getNode("Revisado")}
          </MenubarItem>
          <MenubarItem onClick={() => handleClick("Aprobado")}>
            {getNode("Aprobado")}
          </MenubarItem>
          <MenubarItem onClick={() => handleClick("Programado")}>
            {getNode("Programado")}
          </MenubarItem>
          <MenubarItem onClick={() => handleClick("Publicado")}>
            {getNode("Publicado")}
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  )
}

export function getNode(status: string) {
  const lightColor= getPostStatusColor(status, "0.3")
  const darkColor= getPostStatusColor(status)

  const res= (
    <div className={cn("flex w-28 justify-center text-gray-700 font-bold items-center h-6 gap-1 rounded-2xl cursor-pointer")} style={{ backgroundColor: lightColor }}>
      <p className={cn("w-2 h-2 rounded-full")} style={{ backgroundColor: darkColor }}></p>
      <p>{status}</p>
    </div>
  )  
  return res
}

