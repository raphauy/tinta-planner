import { getSelectorData } from "../(server-side)/services/getClients"
import { ClientSelector } from "../client-selector"

export default async function Selector() {
  const selectorData= await getSelectorData()

  return (
    <ClientSelector selectors={selectorData} />
  )
}
