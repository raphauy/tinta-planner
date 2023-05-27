"use client"

import { useEffect, useState } from "react";
import UserConfigForm from "./UserConfForm";
import Client from "@/app/types/Client";
import axios from "axios";
import User from "@/app/types/User";
import LoadingSpinner, { LoadingSpinnerChico } from "@/components/LoadingSpinner";
import { FiEdit } from "react-icons/fi";
import { CloudinaryImage } from "@cloudinary/url-gen";
import { AdvancedImage } from "@cloudinary/react";

function useConfigPage() {
  const [loading, setLoading] = useState(true);
  const [clients, setClients] = useState<Client[]>([]);
  const [users, setUsers] = useState<User[]>();
  const [userIdToEdit, setIdUserToEdit] = useState("");
  const [total, setTotal] = useState(0)

  useEffect(() => {
        
    async function fetchClients() {
      const { data } = await axios.get(`/api/client/all`);
      const resClients= data.data
      setClients(resClients)
      
    }
    async function fetchUsers() {
      const { data } = await axios.get(`/api/users`);
      const resUsers= data.data
      
      setUsers(resUsers)
    }

    fetchClients()
    fetchUsers()
    setLoading(false);
  }, [total]);

  function onChange() {
    setTotal(total+1)
    setIdUserToEdit("")
  }

  return { loading, total, onChange, clients, userIdToEdit, setIdUserToEdit, users }
}

export default function ClientConfigPage() {

  const { loading, total, onChange, clients, userIdToEdit, setIdUserToEdit, users }= useConfigPage()

  if (loading) return <LoadingSpinner />

  if (!users) return <LoadingSpinner />

  return (
    <>
      <section>
        <div className="max-w-4xl p-5 mx-auto">
          <div className="p-5 bg-white border rounded-md">
            <table className="w-full">
              <thead>
                <tr className="h-12 font-medium text-left text-gray-700 align-middle bg-gray-100 brder-b text-muted-foreground">
                  <th className="pl-3">Nombre</th>
                  <th className="">Email</th>
                  <th className="w-[70px]"></th>
                  <th className=""></th>
                  <th className="w-[50px]"></th>
                </tr>
              </thead>
              <tbody>

              {
              users.map((user) => {
                const client= user.client
                const avatarImage = new CloudinaryImage(client.image_insta.split("/").slice(-2).join("/"), {cloudName: 'dtm41dmrz'})
                return (
                <tr key={user.id} className="h-12 px-4 font-medium text-left align-middle border-b text-muted-foreground hover:bg-slate-100">
                  <td className="pl-3 text-gray-600">{user.name}</td>
                  <td className="text-gray-600">{user.email}</td>
                  <td className="flex items-center justify-center">
                    <div className="relative inline-block w-8 h-8 overflow-hidden border rounded-full md:h-11 md:w-11">
                      <AdvancedImage cldImg={avatarImage} />
                    </div>
                  </td>
                  <td className="text-gray-600">{client.name}</td>                  
                  <td onClick={() => setIdUserToEdit(user.id)}><FiEdit size={26} className="hover:cursor-pointer text-sky-400"/></td>
                </tr>

                )
              })
              }
              </tbody>
            </table>
            <div className="hidden mt-3 mr-5 text-right text-gray-500">Total: {total}</div>
          </div>
      </div>
    </section>
    <section>
        {userIdToEdit && <UserConfigForm userId={userIdToEdit} clients={clients} onCancel={() => setIdUserToEdit("")} onSave={() => onChange()} />}        
      </section>
    </>
  );
}

