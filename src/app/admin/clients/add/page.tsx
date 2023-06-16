import { Separator } from "@/components/ui/separator";
import React from "react";
import { revalidatePath } from "next/cache";
import { ClientForm, FormValues } from "./clientForm";
import { Client } from "@prisma/client";
import { createClient } from "@/app/(server-side)/services/getClients";
import getCurrentUser from "@/app/(server-side)/services/getCurrentUser";
import NotAlowedPage from "@/app/auth/not-alowed/page";

export const revalidate= 0

export default async function AddPage() {
  const user= await getCurrentUser()

  {/* @ts-expect-error Server Component */}
  if (!user) return <NotAlowedPage message="Para acceder a esta página debes estar logueado." />

  const agencyId= user.agencyId

  if (!agencyId) return <div>El usuario no tiene una agencia asignada</div>

  async function saveData(data: FormValues): Promise<Client | null> {
    "use server"
    
    const created= await createClient(data)    
  
    console.log(created);
    
    revalidatePath("/admin/clients")
    
    return created
  }
  
  return (
    <div className="flex flex-col items-center my-10 space-y-6">
      <div className="max-w-3xl">
        <h3 className="text-lg font-medium text-center">Crear Cliente</h3>
        <p className="text-sm text-center text-muted-foreground">
          Aquí es donde agregas un cliente a tu Agencia
        </p>

        <Separator className="my-5" />
        
        <ClientForm processData={saveData} />
        
      </div>
      
    </div>
  )
}


