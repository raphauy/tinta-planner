import { Button } from "@/components/ui/button"
import { getEmailDAO } from "@/services/email-services"
import Link from "next/link"

type Props = {
  params: {
    mailId: string
  }
}

export default async function UnsuscribePage({ params }: Props) {
  const mailId= params.mailId
  console.log(`mailId: ${mailId}`)
  const mail= await getEmailDAO(mailId)
  if (mail) {
    console.log(`baja mailId: ${mailId}`);

    return (
      <div className="flex flex-col items-center justify-center w-full h-screen border rounded-lg shadow-lg">
        <h1 className="mb-5 text-2xl font-bold">Baja exitosa</h1>
        <p><span className="font-bold">{mail.emailTo}</span> ha sido dado de baja</p>
        <Link href={`/suscribe/${mailId}`} className="mt-10">
          <Button className="flex items-center gap-2 mt-5">Volver a suscribir <span className="font-bold">{mail.emailTo}</span></Button>
        </Link>
      </div>
    )    
  } else if (mailId === "only-image") {
    console.log('simulación de baja')
    return (
      <div className="flex flex-col items-center justify-center w-full h-screen border rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold">Baja exitosa</h1>
        <p>la simulación de baja ha sido exitosa</p>
      </div>
    )
  } else {
    console.log('Email not found')            
    return (
      <div className="flex flex-col items-center justify-center w-full h-screen border rounded-lg shadow-lg">
        <h1 className="mb-5 text-2xl font-bold">Error</h1>
        <p>el email con id {mailId} no ha sido encontrado</p>
      </div>
    )
  }
}
