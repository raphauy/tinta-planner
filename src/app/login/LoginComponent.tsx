import Image from "next/image";
import getCurrentUser from "../(server-side)/services/getCurrentUser";
import { getClientOfCurrenUser } from "../(server-side)/services/getClients";
import PopOverUserHandler from "./PopOverUserHandler";
import PopOver from "@/components/modal/PopOver";

export default async function LoginComponent() {

  const currentUser = await getCurrentUser()
  if (!currentUser)
    return <div>No session</div>

  let trigger= <EmailAvatar email={currentUser?.email} />
  const role = currentUser?.role
  if (role === "client"){
    const client= await getClientOfCurrenUser()
    if (!client)
      trigger= <div>No client</div>

    if (client && client.image_insta)
      trigger= <ImageAvatar src={client.image_insta} />
    else 
      trigger= <div>No image</div>
  }
    

  return (
    <section className="text-base text-gray-700 sm:flex sm:justify-between">
      <div className="flex items-center justify-between">
          <div className="px-3">
              <p>{currentUser.email}</p>                            
          </div>
          <PopOver trigger={trigger} body={<PopOverUserHandler />}  />

      </div>
    </section>    
  )
}

interface EmailProps{
  email: string
}
function EmailAvatar({ email }: EmailProps) { 
  return (
    <div>
      <p className="flex items-center justify-center w-12 h-12 text-2xl font-bold text-white rounded-full cursor-pointer bg-tinta-marron hover:opacity-80">{email.substring(0,1).toUpperCase()}</p>
      <span className="absolute block w-2 h-2 bg-green-500 rounded-full right-8 top-4 ring-2 ring-white md:h-3 md:w-3"></span>
    </div>
  )    
}

interface ImageProps{
  src: string
}
function ImageAvatar({ src }: ImageProps) {
  return (
    <div>
      <Image className="w-16 border rounded-full" src={src} width={116} height={35} alt="User image" />
      <span className="absolute block w-2 h-2 bg-green-500 rounded-full right-8 top-4 ring-2 ring-white md:h-3 md:w-3"></span>
    </div>
  )
}