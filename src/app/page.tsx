
import Link from "next/link";
import getCurrentUser from "./(server-side)/services/getCurrentUser";
import NavBar from "./NavBar";
import AuthForm from "./login/EmailForm";
import { redirect } from "next/navigation";
import LoadingSpinner from "@/components/LoadingSpinner";

export default async function HomePage() {

  const user = await getCurrentUser()
  const role= user?.role

  if (role === "agency" || role === "agency-admin" || role === "admin"){
    const clients= user?.clients
    if (!clients)
      redirect("/not-allowed?message=No tienes clientes asignados")

    if (clients?.length > 0){
      const client= clients[0]
      redirect(`/agency/${client.slug}/social`)
    } else redirect("/not-allowed?message=No tienes clientes asignados")
  }
    

  if (role === "client")
    redirect("/cliente")

  redirect("/login")
  
}
