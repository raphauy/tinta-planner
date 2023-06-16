import { editClient, getClient } from "@/app/(server-side)/services/getClients"
import getCurrentUser from "@/app/(server-side)/services/getCurrentUser"
import NotAlowedPage from "@/app/auth/not-alowed/page"
import { Client } from "@prisma/client"
import { ClientForm, FormValues } from "../add/clientForm"
import { revalidatePath } from "next/cache"
import { Separator } from "@/components/ui/separator"

interface Props{
    searchParams: {
      id: string
    }
  }  
export default async function EditPage({ searchParams }: Props) {
    const id= searchParams.id

    const client= await getClient(parseInt(id))

    if (!client) return <div>No client found</div>
    
    const user= await getCurrentUser()

    {/* @ts-expect-error Server Component */}
    if (!user) return <NotAlowedPage message="Para acceder a esta página debes estar logueado." />
  
    const agencyId= user.agencyId
  
    if (!agencyId) return <div>El usuario no tiene una agencia asignada</div>
  
    async function editData(data: FormValues): Promise<Client | null> {
      "use server"

      const created= await editClient(parseInt(id), data)    
    
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
          
          <ClientForm client={client} processData={editData} />
          
        </div>
        
      </div>
    )
  }
  
  
  