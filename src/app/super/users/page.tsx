import { create, edit, getAll, getUser } from '@/app/(server-side)/services/userService';
import { User } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import Link from 'next/link';
import { FiEdit, FiTrash2 } from 'react-icons/fi';
import { FormValues, UserForm } from './form';
import { Link2, PlusCircle } from 'lucide-react';

interface Props{
  searchParams: {
    action: string
    id: string
  }
}  

export default async function UsuariosPage({ searchParams }: Props) {
  const action= searchParams.action
  const id= searchParams.id
  console.table({action, id})

  const user= id && await getUser(id)

  const users= await getAll()
  if (!users) return <div>No users</div>

  async function editData(data: FormValues): Promise<User | null> {
  "use server"
  
    const edited= await edit(id, data)
  
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
              <th className="">Email</th>
              <th className=""></th>
              <th className="w-[50px]"></th>
              <th className="w-[30px]"></th>
            </tr>
          </thead>
          <tbody>
          {
          users.map((user) => (
            <tr key={user.id} className="h-12 px-4 font-medium text-left border-b text-muted-foreground hover:bg-slate-100">
                <td className="pl-3 text-gray-600">{user.name}</td>
                <td className="text-gray-600">{user.email}</td>
                <td className="text-gray-600">
                  {
                    user.agency ? 
                    <p className='text-center text-green-500'>({user.agency.name})</p> :
                    <Link href={`/super/users/link?userId=${user.id}`}><Link2 className='w-full' /></Link>
                  }
                </td>
                <td><Link href={`/super/users?action=edit&id=${user.id}`}><FiEdit size={22} className="hover:cursor-pointer text-sky-400"/></Link></td>
                <td><Link href={`/super/users/delete?id=${user.id}`}><FiTrash2 size={22} className="text-red-400 hover:cursor-pointer"/></Link></td>
            </tr>
          ))
          }
          </tbody>
        </table>
      <div className="flex justify-end mt-2 mr-1 text-green-400"><Link href={`/super/users?action=add`}><PlusCircle /></Link></div>
    </div>
    {
      action === "add" &&
      <div><UserForm processData={saveData} /></div>
    }
    {
      action === "edit" && user &&
      <div><UserForm user={user} processData={editData} /></div>
    }
  </div>
  )
}

async function saveData(data: FormValues): Promise<User | null> {
  "use server"
  
    const created= await create(data)
  
    revalidatePath("/super")
  
    return created    
  }
  
  
  