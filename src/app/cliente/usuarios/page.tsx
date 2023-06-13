import { getClientOfCurrenUser } from '@/app/(server-side)/services/getClients';
import { User } from '@prisma/client';

export default async function UsuariosPage() {
  const client= await getClientOfCurrenUser()
  if (!client) return <div>Client not found</div>

  const users= client.users
  console.log("users: " + users.length);

  return (
    <div className="p-5 mx-auto md:w-2/3">
      <div className="p-5 bg-white border rounded-md">
        <table className="w-full">
          <thead>
            <tr className="h-12 font-medium text-left text-gray-700 align-middle bg-gray-100 brder-b text-muted-foreground">
              <th className="pl-3">Nombre</th>
              <th className="">Email</th>
            </tr>
          </thead>
          <tbody>
          {
          users.map((user: User) => (
            <tr key={user.id} className="h-12 px-4 font-medium text-left align-middle border-b text-muted-foreground hover:bg-slate-100">
                <td className="pl-3 text-gray-600">{user.name}</td>
                <td className="text-gray-600">{user.email}</td>
            </tr>
          ))
          }
          </tbody>
        </table>
      </div>
  </div>
  )
}
