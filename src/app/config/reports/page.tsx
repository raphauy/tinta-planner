
import { Button } from "@/components/ui/button"
import getReportDefinitions, { addIndicatorToReportDefinition, removeIndicatorFromReportDefinition } from "@/services/reportDefinitionService"
import { PlusCircle } from "lucide-react"
import { create, update } from "./(crud)/actions"
import { ReportDefinitionDialog } from "./(crud)/report-definition-dialog"
import { columns } from "./columns"
import { DataTable } from "./data-table"
 
interface Props{
  searchParams: {
      action: string
      reportId: string
      indicatorId: string
  },
}  

export default async function ReportDefinitionsPage({ searchParams }: Props) {

  const action= searchParams.action
  const reportId= searchParams.reportId
  const indicatorId= searchParams.indicatorId
  if (action && reportId && indicatorId) {
    if (action === "add") {
      await addIndicatorToReportDefinition(reportId, indicatorId)
    }
    if (action === "remove") {
      await removeIndicatorFromReportDefinition(reportId, indicatorId)
    }
  }

  const data= await getReportDefinitions()

  const addTrigger= (<Button><PlusCircle size={22} className="mr-2"/>Agregar</Button>)

  return (
    <div className="w-full px-2">      

      <div className="flex justify-end mx-auto my-2">
        <ReportDefinitionDialog create={create} update={update} title="Agregar Reporte" trigger={addTrigger}/>
      </div>

      <div className="p-3 mx-auto bg-white border rounded-md text-muted-foreground dark:text-white">
        <DataTable columns={columns} data={data} />      
      </div>
    </div>
)
}
