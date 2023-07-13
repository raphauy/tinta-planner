import React from "react";
import AuthForm from "./EmailForm";
import getCurrentUser from "../(server-side)/services/getCurrentUser";
import { redirect } from "next/navigation";

export default async function loginPage() {
  
  const user = await getCurrentUser()
  const role= user?.role

  if (role === "agency")
  redirect("/admin/tinta")

  if (role === "client")
    redirect("/cliente")

  return (
    <div className="flex items-center justify-center min-h-screen pb-20">
      <AuthForm />
    </div>
  );
}
