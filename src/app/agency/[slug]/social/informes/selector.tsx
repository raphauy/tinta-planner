import { getSelectorData } from "@/services/informeService"
import { InformeSelector } from "./informe-selector"

interface Props{
  clientId: number
}

export default async function Selector({ clientId }: Props) {
  const selectorData= await getSelectorData(clientId)

  return (
    <InformeSelector selectors={selectorData} />
  )
}
