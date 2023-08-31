
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import { columns } from "./columns"
import { DataTable } from "./data-table"
import { getAllDataWsets } from "./(crud)/actions"
 
interface Props{
  params: {
    slug: string
  },
}

export default async function WsetsPage({ params }: Props) {

  const slug= params.slug
  
  const wsets= await getAllDataWsets()

  return (
    <div className="w-full px-2 mt-2">      

      <div className="mx-auto my-4 text-center">
        <p className="text-2xl font-bold">WSET data</p>
      </div>

      <div className="p-3 mx-auto bg-white border rounded-md text-muted-foreground dark:text-white">
        <DataTable columns={columns} data={wsets}/>      
      </div>
    </div>
)
}
