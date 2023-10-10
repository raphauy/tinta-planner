"use client"

import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarTrigger } from "@/components/ui/menubar"
import { cn, getStatusColor } from "@/lib/utils"
import { updateStatusAction } from "./(crud)/actions"

interface Props {
  id: string
  status: string
}
export function MenubarDemo({ id, status }: Props) {
  const node= getNode(status)

  function handleClick(status: string) {
    updateStatusAction(id, status)
  }
  return (
    <Menubar className="p-0 m-0 bg-transparent border-none">
      <MenubarMenu>
        <MenubarTrigger>
          {node}
        </MenubarTrigger>
        <MenubarContent>
          <MenubarItem onClick={() => handleClick("Potencial")}>
            {getNode("Potencial")}
          </MenubarItem>
          <MenubarItem onClick={() => handleClick("Calificado")}>
            {getNode("Calificado")}
          </MenubarItem>
          <MenubarItem onClick={() => handleClick("Propuesta")}>
            {getNode("Propuesta")}
          </MenubarItem>
          <MenubarItem onClick={() => handleClick("Negociación")}>
            {getNode("Negociación")}
          </MenubarItem>
          <MenubarItem onClick={() => handleClick("Ganado")}>
            {getNode("Ganado")}
          </MenubarItem>
          <MenubarItem onClick={() => handleClick("Perdido")}>
            {getNode("Perdido")}
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  )
}

function getNode(status: string) {
  const lightColor= getStatusColor(status, "0.3")
  const darkColor= getStatusColor(status)

  const res= (
    <div className={cn("flex w-28 justify-center text-gray-700 font-bold items-center h-6 gap-1 rounded-2xl cursor-pointer")} style={{ backgroundColor: lightColor }}>
      <p className={cn("w-2 h-2 rounded-full")} style={{ backgroundColor: darkColor }}></p>
      <p>{status}</p>
    </div>
  )  
  return res
}

