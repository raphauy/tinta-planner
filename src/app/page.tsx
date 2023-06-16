
import Link from "next/link";
import getCurrentUser from "./(server-side)/services/getCurrentUser";
import NavBar from "./NavBar";
import AuthForm from "./auth/login/EmailForm";
import { redirect } from "next/navigation";
import LoadingSpinner from "@/components/LoadingSpinner";

export default async function HomePage() {

  const user = await getCurrentUser()
  const role= user?.role

  if (role === "agency")
    redirect("/admin/clients")

  if (role === "client")
    redirect("/cliente")

  redirect("/auth/login")
  
}
