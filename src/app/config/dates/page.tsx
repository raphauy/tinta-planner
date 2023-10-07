
import { Button } from "@/components/ui/button"
import { getGlobalFechasImportantes } from "@/services/fechaImportanteService"
import { PlusCircle } from "lucide-react"
import Link from "next/link"
import { columns } from "./columns"
import { DataTable } from "./data-table"
 

export default async function FechaImportantesPage() {

  const data= await getGlobalFechasImportantes()

  return (
    <div className="w-full px-2">
      <div>
        <p className="mt-3 text-2xl font-bold text-center text-muted-foreground">Fechas Importantes Globales</p>
      </div>
      
      <div className="flex justify-end mx-auto my-2">
        <Link href="/config/dates/add"><Button><PlusCircle size={22} className="mr-2"/>Agregar</Button></Link>
      </div>

      <div className="p-3 mx-auto bg-white border rounded-md text-muted-foreground dark:text-white">
        <DataTable columns={columns} data={data} />      
      </div>

    </div>
)
}
