"use client"

import ConfirmModal from "@/components/modal/ConfirmMoldal";
import ToolTip from "@/components/modal/ToolTip";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { FiEdit, FiTrash2 } from "react-icons/fi";

function usePostHandler(id: string, onDelete: () => void) {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const router= useRouter()
  const params= useParams()
  if (!params)
    throw Error("useParams() is not working")

  const slug= params.slug

  async function onConfirmDelete() {
    setConfirmOpen(false)

    await axios.delete(`/api/posts/${slug}/${id}`)
    .then(() => {
        toast.success("Post eliminado", { duration: 4000 })
        onDelete()
        router.push(`/agency/${slug}/social/posts`)
    })    
    .catch((e) => {
      const error= e.response.data.error ? e.response.data.error : "Algo salió mal"
      toast.error(error, { duration: 5000 })        
    })
    
  }

  return { confirmOpen, setConfirmOpen, onConfirmDelete };
}

interface PostHandlerProps {
  id: string;
  onDelete: () => void
  onEdit: (id: string) => void
}

export default function PostHandler({ id, onDelete, onEdit }: PostHandlerProps) {
  const { confirmOpen, setConfirmOpen, onConfirmDelete } = usePostHandler(id, onDelete);

  return (
    <>
      <ConfirmModal
        isOpen={confirmOpen}
        isDangerStile
        onClose={() => setConfirmOpen(false)}
        onConfirm={onConfirmDelete}
        title="Eliminar Post"
        message={`Confirma que desea eliminar este post?`}
      />

      <nav className="flex flex-col gap-2 p-1 mt-1 min-w-[200px]">
        <ul>
          <li className="mb-5 border-b">            
            Acciones:
          </li>
          <li className="flex items-center px-1 py-3 mb-5 rounded-md cursor-pointer hover:border hover:border-gray-500 hover:bg-gray-200" 
            onClick={() => onEdit(id)}>
            <FiEdit size={23} className="mr-2 text-sky-400" />            
            <ToolTip text="Comming soon gatucha">
              <p>Editar</p>
            </ToolTip>            
          </li>
          <li className="flex items-center px-1 py-3 mb-5 rounded-md cursor-pointer hover:border hover:border-gray-500 hover:bg-gray-200" 
            onClick={() => setConfirmOpen(true)}>
            <FiTrash2 size={23} className="mr-2 text-red-400" />
            Eliminar
          </li>
        </ul>
      </nav>
    </>
  );
}
