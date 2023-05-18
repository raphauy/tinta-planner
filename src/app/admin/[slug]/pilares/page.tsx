"use client";

import axios from "axios";

import { toast } from "react-hot-toast";
import { useEffect, useState } from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import PilarFormModal from "./PilarForm";
import { GrAddCircle } from "react-icons/gr";
import { useParams } from "next/navigation";
import { Pilar } from "@/app/types/Pilar";
import LoadingSpinner from "@/components/LoadingSpinner";
import ConfirmModal from "@/app/(client-side)/components/ConfirmMoldal";

function usePilar() {
    const [pilars, setPilars] = useState<Pilar[]>([]);
    const [loading, setLoading] = useState(true);
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [formOpen, setFormOpen] = useState(false);
    const [idToDelete, setIdToDelete] = useState(0);
    const [pilarToEdit, setPilarToEdit] = useState(null);
    const [total, setTotal] = useState(0)
    const [clickeado, setClickeado] = useState("")
    const params= useParams()
    const slug= params.slug


    useEffect(() => {
      async function fetchPilars() {

        const { data } = await axios.get(`/api/pilars/${slug}/`);
        setPilars(data.data);
        setLoading(false);
      }
      fetchPilars();
    }, [slug, loading]);

    async function onAdd() {
  
      setPilarToEdit(null)
      setFormOpen(true)      
    }

    async function onEdit(id: number) {
  
      const { data }= await axios.get(`/api/pilars/${slug}/${id}`)      
      setPilarToEdit(data.data)
      setFormOpen(true)      
    }

    async function onConfirmDelete() {
      setConfirmOpen(false)
      setLoading(true)
  
      await axios.delete(`/api/pilars/${slug}/${idToDelete}`)
      .then(() => toast.success("Pilar eliminado", { duration: 4000 }))      
      .catch((e) => {
        const error= e.response.data.error ? e.response.data.error : "Algo salió mal"
        toast.error(error, { duration: 5000 })        
      })
  
      setIdToDelete(0)
      setClickeado("")
      setTotal(0)
    }
  
    async function onDelete(id: number, nombrePilar: string) {
      setIdToDelete(id)
      setClickeado(nombrePilar)
      setConfirmOpen(true)
    }
  
  
    return { setLoading, pilars, loading, onAdd, onDelete, onConfirmDelete, pilarToEdit, onEdit, formOpen, setFormOpen, confirmOpen, setConfirmOpen, total, setTotal, clickeado }
  }
  
export default function PilaresPage() {
    const { setLoading, pilars, loading, onAdd, onDelete, onConfirmDelete, pilarToEdit, onEdit, formOpen, setFormOpen, confirmOpen, setConfirmOpen, total, setTotal, clickeado }= usePilar()


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
                message={`Confirma que desea eliminar el pilar ${clickeado}?`}
            />
            <PilarFormModal 
              isOpen={formOpen}
              onClose={() => {
                setFormOpen(false)
                //setTotal(-1)
                setLoading(true);
              }}
              toEdit={pilarToEdit}
            />

            <div className="max-w-4xl p-5 mx-auto">
              <div className="p-5 bg-white border rounded-md">
                <table className="w-full">
                  <thead>
                    <tr className="h-12 font-medium text-left text-gray-700 align-middle bg-gray-100 border-b text-muted-foreground">
                      <th className="w-[50px] text-center"></th>
                      <th className="pl-3">Nombre</th>
                      <th className="">Descripción</th>
                      <th className="w-[50px]"></th>
                      <th className="w-[50px]"></th>
                    </tr>
                  </thead>
                  <tbody>
                  {
                  pilars.map((pilar) => (
                    <tr key={pilar.id} className="h-12 px-4 font-medium text-left align-middle border-b text-muted-foreground hover:bg-slate-100">
                        <td className="pl-2">
                          <p className="w-4 h-4 rounded-full" style={{ backgroundColor: pilar.color }}>
                            &nbsp;
                          </p>
                        </td>
                        <td className="pl-3 text-gray-600">{pilar.name}</td>
                        <td className="text-gray-600">{pilar.description}</td>
                        <td onClick={() => onEdit(pilar.id)}><FiEdit size={22} className="hover:cursor-pointer text-sky-400"/></td>
                        <td onClick={() => onDelete(pilar.id, pilar.name)}><FiTrash2 size={22} className="text-red-400 hover:cursor-pointer"/></td>
                    </tr>
                  ))
                  }
                  </tbody>
                </table>
              </div>
              <div className="flex justify-end my-5 text-lg font-semibold text-grey-800 ">
                <div onClick={() => onAdd()} className="flex items-center justify-center py-1 bg-green-400 border border-green-700 rounded-md cursor-pointer w-60 hover:opacity-80 focus-visible:outline-tinta-marron focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2">
                    <GrAddCircle size={22} className="mr-2"/><p>Agregar Pilar</p>
                </div>
              </div>
            </div>
        </>
    );
}
