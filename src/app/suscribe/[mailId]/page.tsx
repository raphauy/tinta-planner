import { Button } from "@/components/ui/button"
import { getContactDAOByEmail, setStatus } from "@/services/contact-services"
import { getEmailDAO } from "@/services/email-services"
import Link from "next/link"

type Props = {
  params: {
    mailId: string
  }
}

export default async function SuscribePage({ params }: Props) {
  const mailId= params.mailId
  console.log(`mailId: ${mailId}`)
  const mail= await getEmailDAO(mailId)
  if (mail) {
    const contact= await getContactDAOByEmail(mail.emailTo)
    if (contact) {
      await setStatus(contact.id, 'subscribed')
      console.log(`contact: ${contact.id} re-subscribed`);

      return (
        <div className="flex flex-col items-center justify-center w-full h-screen border rounded-lg shadow-lg">
          <h1 className="mb-5 text-2xl font-bold">Suscripción exitosa</h1>
          <p><span className="font-bold">{mail.emailTo}</span> ha sido suscrito nuevamente 😁</p>
        </div>
      )    
  
    } else {
      console.log('Contact not found')            
      return (
        <div className="flex flex-col items-center justify-center w-full h-screen border rounded-lg shadow-lg">
          <h1 className="mb-5 text-2xl font-bold">Error</h1>
          <p>el contacto con email {mail.emailTo} no ha sido encontrado</p>
        </div>
      )
    }

  }
}

