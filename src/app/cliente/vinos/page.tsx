import { getClientOfCurrenUser } from '@/app/(server-side)/services/getClients';
import getClientWines from '@/app/(server-side)/services/getWines';
import { columns } from './columns';
import { DataTable } from '@/app/admin/[slug]/wines/data-table';

export default async function ClientWinesPage() {
    const client= await getClientOfCurrenUser()
    if (!client) return <div>Client not found</div>
  
    const wines= await getClientWines(client.id)
    const wineNames= Array.from(new Set(wines.map(wine => wine.wine)))
    const regions= Array.from(new Set(wines.map(wine => wine.region)))
    const vintages= Array.from(new Set(wines.map(wine => wine.vintage)))
  
    return (
      <div className="w-full p-5">      
 
        <div className="container p-3 py-4 mx-auto bg-white border rounded-md">
          <DataTable columns={columns} data={wines} wineNames={wineNames} regions={regions} vintages={vintages} />      
        </div>
      </div>
  )
  }
  