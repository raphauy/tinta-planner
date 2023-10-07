import { create, update } from "../(crud)/actions";
import { FechaImportanteForm } from "../(crud)/fecha-importante-form";

export default function FormPage() {
  
  return (
    <div className="flex flex-col items-center gap-5 mt-5">
        <p className="text-2xl font-bold text-muted-foreground">Agregar Fecha Importante Global</p>
        <FechaImportanteForm global={true} create={create} update={update}/>
    </div>
  )
}
