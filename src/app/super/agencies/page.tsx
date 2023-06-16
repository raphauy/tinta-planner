import { create, edit, getAgency, getAgencys } from '@/app/(server-side)/services/agencyService';
import { Agency, User } from '@prisma/client';
import { PlusCircle } from 'lucide-react';
import { revalidatePath } from 'next/cache';
import Link from 'next/link';
import { FiEdit, FiTrash2 } from 'react-icons/fi';
import { AgencyForm, FormValues } from './form';

interface Props{
  searchParams: {
    action: string
    id: string
  }
}  

export default async function AgencyPage({ searchParams }: Props) {
  const action= searchParams.action
  const id= searchParams.id

  const agency= id && await getAgency(parseInt(id))
  
  const agencys= await getAgencys()


  async function editData(data: FormValues): Promise<Agency | null> {
  "use server"
  
    const edited= await edit(parseInt(id), data)
  
    revalidatePath("/super")
  
    return edited
  }
    
  
  return (
    <div className="p-5 mx-auto md:w-2/3">
      <div className="p-5 bg-white border rounded-md">
        <table className="w-full">
          <thead>
            <tr className="h-12 font-medium text-left text-gray-700 align-middle bg-gray-100 brder-b text-muted-foreground">
              <th className="pl-3">Nombre</th>
              <th className="w-[50px]"></th>
              <th className="w-[30px]"></th>
            </tr>
          </thead>
          <tbody>
          {
          agencys.map((agency) => (
            <tr key={agency.id} className="h-12 px-4 font-medium text-left align-middle border-b text-muted-foreground hover:bg-slate-100">
                <td className="pl-3 text-gray-600">
                  <div>
                    <div className='flex'>{agency.name} (
                    {
                      agency.users.map((user: User) => (
                          <div key={user.id} className='flex items-center text-sm'>{user.email}
                          <Link href={`/super/users/link/disconnect?agencyId=${agency.id}&userId=${user.id}`}><FiTrash2 className="text-red-400 hover:cursor-pointer"/></Link>
                          </div>
                    ))
                    }
                    )</div>
                    <div>
                    {
                      agency.clients.map((client) => (
                        <div key={client.id} className='flex items-center'>
                          <p className='ml-5 text-sm'>{client.name}</p>                          
                        </div>
                    ))
                    }
                    </div>
                  </div>
                </td>
                <td><Link href={`/super/agencies?action=edit&id=${agency.id}`}><FiEdit size={22} className="hover:cursor-pointer text-sky-400"/></Link></td>
                <td><Link href={`/super/agencies/delete?id=${agency.id}`}><FiTrash2 size={22} className="text-red-400 hover:cursor-pointer"/></Link></td>
            </tr>
          ))
          }
          </tbody>
        </table>
        <div className="flex justify-end mt-2 mr-1 text-green-400"><Link href={`/super/agencies?action=add`}><PlusCircle /></Link></div>
      </div>
      {
        action === "add" &&
        <div><AgencyForm processData={saveData} /></div>
      }
      {
        action === "edit" && agency &&
        <div><AgencyForm agency={agency} processData={editData} /></div>
      }
  </div>
  )
}

async function saveData(data: FormValues): Promise<Agency | null> {
"use server"

  const created= await create(data)

  revalidatePath("/super")

  return created    
}

