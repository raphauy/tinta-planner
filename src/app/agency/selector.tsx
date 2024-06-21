import { getSelectorData } from "../(server-side)/services/getClients"
import getCurrentUser from "../(server-side)/services/getCurrentUser"
import { ClientSelector } from "../client-selector"

export default async function Selector() {
  const currentUser = await getCurrentUser()
  if (!currentUser) {
    return <div>No current user found</div>
  }

  const selectorData= await getSelectorData(currentUser.id)

  return (
    <ClientSelector selectors={selectorData} />
  )
}
