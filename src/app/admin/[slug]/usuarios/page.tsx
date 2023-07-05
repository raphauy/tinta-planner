"use client";

import axios from "axios";

import { toast } from "react-hot-toast";
import { useEffect, useState } from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { AiOutlineUserSwitch } from "react-icons/ai";
import { GrAddCircle } from "react-icons/gr";
import { useParams } from "next/navigation";
import UserFormModal from "./UserForm";
import LoadingSpinner from "@/components/LoadingSpinner";
import User from "@/app/types/User";
import ConfirmModal from "@/components/modal/ConfirmMoldal";
import UserConfigForm from "../../config/UserConfForm";
import Client from "@/app/types/Client";

function useUsuario(slug: string) {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [formOpen, setFormOpen] = useState(false);
    const [idToDelete, setIdToDelete] = useState("");
    const [toEdit, setToEdit] = useState(null);
    const [clickeado, setClickeado] = useState("")
    const [idToSwitch, setIdToSwitch] = useState("");
    const [clients, setClients] = useState<Client[]>([]);


    async function onAdd() {
  
      setToEdit(null)
      setFormOpen(true)      
    }

    async function onEdit(id: string) {
      const { data }= await axios.get(`/api/users/${slug}/${id}`)
      setToEdit(data.data)
      setFormOpen(true)      
    }

    async function onConfirmDelete() {
      setConfirmOpen(false)
      setLoading(true)
  
      await axios.delete(`/api/users/${slug}/${idToDelete}`)
      .then(() => toast.success("Usuario eliminado", { duration: 4000 }))      
      .catch((e) => {
        const error= e.response.data.error ? e.response.data.error : "Algo salió mal"
        toast.error(error, { duration: 5000 })        
      })
  
      setClickeado("")
      setIdToDelete("")
    }
  
    async function onDelete(id: string, email: string) {
      setIdToDelete(id)
      setClickeado(email)
      setConfirmOpen(true)
    }

    function onSwitch() {
      setIdToSwitch("")
      setLoading(true)
    }
  
  
    useEffect(() => {
      async function fetch() {
  
        const { data } = await axios.get(`/api/users/${slug}/`);
        const users= data.data
        setUsers(users);
        setLoading(false);
      }
      fetch();
      async function fetchClients() {
        const { data } = await axios.get(`/api/agency/clients`);
        const resClients= data.data
        setClients(resClients)
      }
      fetchClients()

    }, [slug, loading]);
  
    return { setLoading, users, loading, onAdd, onDelete, onConfirmDelete, toEdit, onEdit, formOpen, setFormOpen, confirmOpen, setConfirmOpen, clickeado, idToSwitch, setIdToSwitch, clients, onSwitch }
  }
  
export default function UserPage({ params }: { params: { slug: string } }) {

  const { slug }= params
  const { setLoading, users, loading, onAdd, onDelete, onConfirmDelete, toEdit, onEdit, formOpen, setFormOpen, confirmOpen, setConfirmOpen, clickeado, idToSwitch, setIdToSwitch, clients, onSwitch }= useUsuario(slug)

    if (loading) 
        return <LoadingSpinner />
      
    return (
        <>
            <ConfirmModal
                isOpen={confirmOpen}
                isDangerStile
                onClose={() => setConfirmOpen(false)}
                onConfirm={onConfirmDelete}        
                title="Eliminar Pilar"
                message={`Confirma que desea eliminar el usuario ${clickeado}?`}
            />
            <UserFormModal
              isOpen={formOpen}
              onClose={() => {
                setFormOpen(false)
                setLoading(true);
              }}
              toEdit={toEdit}
            />

            <div className="max-w-4xl p-5 mx-auto">
                <div className="p-5 bg-white border rounded-md">
                  <table className="w-full">
                    <thead>
                      <tr className="h-12 font-medium text-left text-gray-700 align-middle bg-gray-100 brder-b text-muted-foreground">
                        <th className="pl-3">Nombre</th>
                        <th className="">Email</th>
                        <th className="w-[50px]"></th>
                        <th className="w-[50px]"></th>
                        <th className="w-[50px]"></th>
                      </tr>
                    </thead>
                    <tbody>
                    {
                    users.map((user) => (
                      <tr key={user.id} className="h-12 px-4 font-medium text-left align-middle border-b text-muted-foreground hover:bg-slate-100">
                          <td className="pl-3 text-gray-600">{user.name}</td>
                          <td className="text-gray-600">{user.email}</td>
                          <td onClick={() => onEdit(user.id)}><FiEdit size={22} className="hover:cursor-pointer text-sky-400"/></td>
                          <td onClick={() => onDelete(user.id, user.email)}><FiTrash2 size={22} className="text-red-400 hover:cursor-pointer"/></td>
                          <td onClick={() => setIdToSwitch(user.id)}><AiOutlineUserSwitch size={22} className="hover:cursor-pointer"/></td>
                      </tr>
                    ))
                    }
                    </tbody>
                  </table>
                </div>
                <div className="flex justify-end my-5 text-lg font-semibold text-grey-800 ">
                  <div onClick={() => onAdd()} className="flex items-center justify-center py-1 bg-green-400 border border-green-700 rounded-md cursor-pointer w-60 hover:opacity-80 focus-visible:outline-tinta-marron focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2">
                      <GrAddCircle size={22} className="mr-2"/><p>Agregar Usuario</p>
                  </div>
                </div>
            </div>
            <section>
              {idToSwitch && <UserConfigForm userId={idToSwitch} clients={clients} onCancel={() => setIdToSwitch("")} onSave={() => onSwitch()} />}        
            </section>

        </>
    );
}
