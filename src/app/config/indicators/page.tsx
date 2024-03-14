import { Button } from "@/components/ui/button"
import getIndicators from "@/services/indicatorService"
import { PlusCircle } from "lucide-react"
import { IndicatorDialog } from "./(crud)/indicator-dialog"
import { create, update } from "./(crud)/actions"
import { DataTable } from "./data-table"
import { columns } from "./columns"
 

export default async function IndicatorsPage() {

  const indicators= await getIndicators()

  const addTrigger= (<Button><PlusCircle size={22} className="mr-2"/>Agregar</Button>)

  return (
    <div className="w-full px-2">      

      <div className="flex justify-end mx-auto my-2">
        <IndicatorDialog create={create} update={update} title="Agregar Indicador" trigger={addTrigger}/>
      </div>

      <div className="p-3 mx-auto bg-white border rounded-md text-muted-foreground dark:text-white">
        <DataTable columns={columns} data={indicators} />      
      </div>
    </div>
)
}
