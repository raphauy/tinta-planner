import { AdvancedImage } from "@cloudinary/react"
import { CloudinaryImage } from "@cloudinary/url-gen"
import { Client } from "@prisma/client"
import { Instagram } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { FiEdit, FiTrash2 } from "react-icons/fi"

interface Props{
    client: Client
}
export default function ClientBox({ client }: Props) {
    
  return (
    <div className="flex w-full gap-2 p-2 px-4 border rounded-md shadow-lg text-muted-foreground">
    <div>
        <div className="w-40 h-40">
            <Link href={`/admin/${client.slug}`}>
                <Image src={client.image_insta} width={600} height={600} alt={client.name}/>
            </Link>
        </div>
    </div>
    <div className="flex flex-col w-full ml-3 text-3xl">
        <div className="flex items-center justify-between mb-2">
            <Link href={`/admin/${client.slug}`} className="">
                <p>{client.name}</p>
            </Link>
            <p className="flex gap-2 ml-5 text-base">@{client.handle_insta}<Instagram /></p>
        </div>
        <p className="flex-1 text-xl">{client.description}</p>
        <div className="flex justify-end gap-3 p-1">
            <Link href={`/admin/clients/edit?id=${client.id}`}><FiEdit size={23} className="text-sky-400"/></Link>
            <Link href={`/admin/clients/delete?id=${client.id}`}><FiTrash2 size={23} className="text-red-400"/></Link>
        </div>
    </div>
</div>
  )
}
