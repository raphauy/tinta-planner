"use client"

import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarTrigger} from "@/components/ui/menubar"
import { updateStatusAction } from "./(crud)/actions"
import { getStatusDarkColor, getStatusLightColor } from "@/lib/utils"

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
          <MenubarItem onClick={() => handleClick("En Curso")}>
            {getNode("En Curso")}
          </MenubarItem>
          <MenubarItem onClick={() => handleClick("Cerrado")}>
            {getNode("Cerrado")}
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
  const lightColor= getStatusLightColor(status)
  const darkColor= getStatusDarkColor(status)
  const res= (
    <div className={`flex w-28 justify-center items-center h-6 gap-1 rounded-2xl cursor-pointer ${lightColor}`}>
      <p className={`w-2 h-2 rounded-full ${darkColor}`}></p>
      <p className="">{status}</p>
    </div>
  )  
  return res
}

