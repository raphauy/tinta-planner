import { getClientBySlug } from "@/app/(server-side)/services/getClients"
import { create, update } from "@/app/config/dates/(crud)/actions"
import { FechaImportanteForm } from "@/app/config/dates/(crud)/fecha-importante-form"

interface Props {
  params: {
    slug: string
  }
}


export default async function FormPage({ params: { slug } }: Props) {
  
  const client= await getClientBySlug(slug)
  return (
    <div className="flex flex-col items-center gap-5 mt-5">
        <p className="text-2xl font-bold text-muted-foreground">Agregar Fecha Importante para {client?.name}</p>
        <FechaImportanteForm global={false} create={create} update={update}/>
    </div>
  )
}
