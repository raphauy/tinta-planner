import Link from "next/link";
import LoginComponent from "./auth/login/LoginComponent";
import getCurrentUser from "./(server-side)/services/getCurrentUser";
import { Agency, Client, User } from "@prisma/client";
import { Button } from "@/components/ui/button";

export default async function NavBar() {

  const currentUser= await getCurrentUser()  

  if (!currentUser)
      return <div></div>
  
  const role= currentUser.role
  if (role === "super") {
    return superUserHeader()
  }
  const agency= currentUser.agency
  if (agency) {
    return agencyHeader(agency)
  }
  const client= currentUser.client
  if (client) {
    return clientHeader(client)
  }


  return (
    <header className="flex items-center px-8 py-2 border-b border-tinta-vino bg-tinta-natural" >
      <Link href={"/"}>
        <p className="text-3xl font-extrabold text-black ml-[2px] mt-[-7px]">Agency</p>
        <p className="text-2xl tracking-widest text-center ml-[2px] mt-[-7px] text-tinta-vino font-medium">planner</p>
      </Link>
      
      <LoginComponent />
    </header>
  )
}

function superUserHeader() {
  return (
    <header className="flex items-center px-8 py-2 border-b border-tinta-vino bg-tinta-natural" >
      <Link href={"/"}>
        <p className="text-3xl font-extrabold text-black ml-[2px] mt-[-7px]">Agency</p>
        <p className="text-2xl tracking-widest text-center ml-[2px] mt-[-7px] text-tinta-vino font-medium">planner</p>
      </Link>
      <p className="flex-1 ml-2 text-xl font-bold text-center">Super</p>
      
      <LoginComponent name="Super User" />
    </header>
  )
}

function agencyHeader(agency: Agency) {
  return (
    <header className="flex items-center px-8 py-2 border-b border-tinta-vino bg-tinta-natural" >
      <div className="flex items-center">
        <Link href={"/"}>
          <p className="text-3xl font-extrabold text-black ml-[2px] mt-[-7px]">Agency</p>
          <p className="text-2xl tracking-widest text-center ml-[2px] mt-[-7px] text-tinta-vino font-medium">planner</p>
        </Link>
        <Link href={"/admin/clients"}>
          <Button variant="link" className="text-tinta-marron">Clientes</Button>
        </Link>
        <Link href={"/admin/config"}>
          <Button variant="link" className="text-tinta-marron">Config</Button>
        </Link>
      </div>
      <p className="flex-1 ml-2 text-xl font-bold text-center"></p>
      
      <LoginComponent name={agency.name} />
    </header>
  )
}

function clientHeader(client: Client) {
  return (
    <header className="flex items-center px-8 py-2 border-b border-tinta-vino bg-tinta-natural" >
      <Link href={"/"}>
        <p className="text-3xl font-extrabold text-black ml-[2px] mt-[-7px]">Agency</p>
        <p className="text-2xl tracking-widest text-center ml-[2px] mt-[-7px] text-tinta-vino font-medium">planner</p>
      </Link>
      <p className="flex-1 ml-2 text-xl font-bold text-center">{client.name}</p>
      
      <LoginComponent clientImage={client.image_insta} />
    </header>
  )
}
