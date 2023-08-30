"use client"

import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarTrigger} from "@/components/ui/menubar"
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
  const lightColor= getLightColor(status)
  const darkColor= getDarkColor(status)
  const res= (
    <div className={`flex items-center h-6 gap-1 px-3 rounded-2xl cursor-pointer ${lightColor}`}>
      <p className={`w-2 h-2 rounded-full ${darkColor}`}></p>
      <p className="">{status}</p>
    </div>
  )  
  return res
}

function getLightColor(status: string) {
  switch (status) {
    case "Potencial":
      return "bg-pink-100"
    case "Calificado":
      return "bg-orange-100"
    case "Propuesta":
      return "bg-blue-100"
    case "Negociación":
      return "bg-purple-100"
    case "En Curso":
      return "bg-sky-100"
    case "Cerrado":
      return "bg-green-100"
      case "Perdido":
        return "bg-red-100"
      default:
      return "bg-gray-100"
  }  
}

function getDarkColor(status: string) {
  switch (status) {
    case "Potencial":
      return "bg-pink-400"
    case "Calificado":
      return "bg-orange-400"
    case "Propuesta":
      return "bg-blue-400"
    case "Negociación":
      return "bg-purple-400"
    case "En Curso":
      return "bg-sky-400"
    case "Cerrado":
      return "bg-green-400"
      case "Perdido":
        return "bg-red-400"
      default:
      return "bg-gray-400"
  }  
}