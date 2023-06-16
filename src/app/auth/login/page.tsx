import React from "react";
import AuthForm from "./EmailForm";
import getCurrentUser from "../../(server-side)/services/getCurrentUser";
import { redirect } from "next/navigation";

export default async function loginPage() {
  
  const user = await getCurrentUser()
  const role= user?.role
  console.log("role: " + role);


  if (role === "client")
    redirect("/cliente")

  if (role === "agency")
    redirect("/admin/clients")

  if (role === "super")
    redirect("/super")

  return (
    <div className="flex items-center justify-center min-h-screen pb-20">
      <AuthForm />
    </div>
  );
}
