import { prisma } from "@/app/(server-side)/db"
import Newsletter from "@/components/email/newsletter"
import { Resend } from "resend"
import * as z from "zod"
import { getSubscribedContactsDAOByClientId } from "./contact-services"
import { EmailFormValues, createEmail, getPendingEmailsDAOByEnvioIdAndTake, setEmailStatus } from "./email-services"
import { NewsletterDAO } from "./newsletter-services"

export type EnvioDAO = {
	id: string
	status: string
	newsletterSubject: string | undefined
	createdAt: Date
	startedAt: Date | undefined
	sentByName: string | undefined
	newsletter: NewsletterDAO
	newsletterId: string
	emailFrom: string | undefined
	emailSubject: string | undefined
	emailsCount: number
  clientId: number
  clientSlug: string | undefined
}

export const envioSchema = z.object({
	newsletterId: z.string({required_error: "newsletterId is required."}),
	emailFrom: z.string({required_error: "emailFrom is required."}),
  clientId: z.number({required_error: "clientId is required."}),
})

export type EnvioFormValues = z.infer<typeof envioSchema>


export async function getEnviosDAOByClientId(clientId: number) {
  const found = await prisma.envio.findMany({
    where: {
      clientId
    },
    orderBy: {
      id: 'asc'
    },
    include: {
      newsletter: true,
      client: true      
    }
  })

  const contactsCount= await prisma.contact.count({
    where: {
      clientId,
      status: "subscribed"
    }
  })

  const res= found.map((envio) => {
    return {
      ...envio,
      newsletterSubject: envio.newsletter.name,
      emailsCount: contactsCount,
      clientSlug: envio.client.slug,
    }
  })

  //@ts-ignore
  return res as EnvioDAO[]

}

export async function getEnvioDAO(id: string) {
  const found = await prisma.envio.findUnique({
    where: {
      id
    },
    include: {
      newsletter: true,
      client: true
    }
  })

  const res= {
    ...found,
    newsletterSubject: found?.newsletter.name,
    clientSlug: found?.client.slug
  }

  return res as EnvioDAO
}
    
export async function createEnvio(data: EnvioFormValues) {
  const created = await prisma.envio.create({
    data
  })
  return created
}

export async function updateEnvio(id: string, data: EnvioFormValues) {
  const updated = await prisma.envio.update({
    where: {
      id
    },
    data
  })
  return updated
}

export async function setEnvioStatus(id: string, status: string) {
  const updated = await prisma.envio.update({
    where: {
      id
    },
    data: {
      status,
      startedAt: status==="sending" ? new Date() : undefined
    }
  })
  return updated
}

export async function setSentByName(id: string, sentByName: string) {
  const updated = await prisma.envio.update({
    where: {
      id
    },
    data: {
      sentByName
    }
  })
  return updated

}

export async function deleteEnvio(id: string) {
  const deleted = await prisma.envio.delete({
    where: {
      id
    },
  })
  return deleted
}
    

export async function sendTestEmail(envioId: string, emailTo: string, footerText: string, linkHref: string, linkText: string) {
  console.log("Sending test email to: ", emailTo);

  const envio = await getEnvioDAO(envioId)
  const newsletter= envio.newsletter
  if (!envio || !envio.emailFrom || !envio.newsletter || !envio.newsletter.name || !newsletter.contentHtml) { 
    console.log("Error sending test email, data validation failed.")    
    console.log("envio: ", envio)
    console.log("newsletter: ", newsletter)    
    
    throw new Error("Error sending test email")
  }

  const slug= envio.clientSlug || "newsletter"

  const resend = new Resend(process.env.RESEND_API_KEY);

  const mailId= "only-image"
  const BASE_URL = process.env.NEXTAUTH_URL || "http://localhost:3000"
  const banner = `${BASE_URL}/api/client/${slug}/banner/${mailId}`
  const linkUnsubscribe = `${BASE_URL}/api/client/${slug}/unsuscribe/${mailId}`

  const { data, error } = await resend.emails.send({
    from: envio.emailFrom,
    to: [emailTo],
    subject: newsletter.name,
    react: Newsletter({ content: newsletter.contentHtml, banner, footerText, linkHref, linkText, linkUnsubscribe }),
  });
 

  if (error) {
    console.log("Error sending test email")    
    console.log("error.name:", error.name)    
    console.log("error.message:", error.message)
    return false
  } else {
    console.log("email result: ", data)
  }

  return true
}

export async function sendEnvioToAllContacts(envioId: string, user: string) {
  const envio = await getEnvioDAO(envioId)
  const newsletter= envio.newsletter
  if (!envio || !envio.emailFrom || !envio.newsletter || !envio.newsletter.name) { 
    console.log("Error sending All emails, data validation failed.")    
    console.log("envio: ", envio)
    console.log("newsletter: ", newsletter)    
    throw new Error("Error sending test email")
  }

  await setEnvioStatus(envio.id, "pending")

  const content= newsletter.contentHtml
  if (!content) {
    console.log("Error sending emails")    
    throw new Error("Error sending emails")
  }
  const from= envio.emailFrom
  if (!from) {
    console.log("Error sending emails")    
    throw new Error("Error sending emails")
  }

  const contacts = await getSubscribedContactsDAOByClientId(envio.clientId)

  const emails = contacts.map((contact) => {
    return contact.email
  })

  for (const email of emails) {
    const emailForm: EmailFormValues = {
      status: "pending",
      envioId: envioId,
      emailTo: email,
      emailSubject: newsletter.name,
      clientId: envio.clientId
    }
    const created= await createEmail(emailForm)
    if (!created) {
      console.log("Error creating email")    
    }
  }

  await setSentByName(envioId, user)

  return true
}

type Summary = {
  newsletterCount: number
  enviosCount: number
  contactCount: number
  emailCount: number
}

export async function getSummary(clientId: number): Promise<Summary> {
  const newsletterCount= await prisma.newsletter.count({
    where: {
      clientId
    }
  })
  const enviosCount= await prisma.envio.count({
    where: {
      clientId
    }
  })
  const contactCount= await prisma.contact.count({
    where: {
      clientId
    }
  })
  const emailCount= await prisma.email.count({
    where: {
      clientId
    }
  })
  return {
      newsletterCount,
      enviosCount,
      contactCount,
      emailCount
  }
}

export async function processPending() {
  const envio = await getFirstEnvioPendingOrSending()
  if (!envio) {
    console.log("No pending envio")    
    return false    
  }

  // set envio status to "Sending"
  if (envio.status==="pending") {
    await setEnvioStatus(envio.id, "sending")
  }

  const emailsToSend= await getPendingEmailsDAOByEnvioIdAndTake(envio.id, 10)
  console.log(`pending emails to send: ${emailsToSend.length}`)
  

  if (emailsToSend.length===0 && envio.status==="sending") {
    console.log("No emails to send, finishing envio")
    await setEnvioStatus(envio.id, "sent")
    return true
  } else {
    console.log(`sending ${emailsToSend.length} emails`)    
  }

  const newsletter= envio.newsletter
  if (!envio || !envio.emailFrom || !envio.newsletter || !envio.newsletter.name) { 
    console.log("Error sending All emails, data validation failed.")    
    console.log("envio: ", envio)
    console.log("newsletter: ", newsletter)    
    throw new Error("Error sending test email")
  }

  const client = await prisma.client.findUnique({
    where: {
      id: envio.clientId
    },
  })
  if (!client) {
    throw new Error("Error getting client")
  }

  const footerText= client.footerText
  const linkHref= client.linkHref
  const linkText= client.linkText

  const content= newsletter.contentHtml
  if (!content) {
    console.log("Error sending emails")    
    throw new Error("Error sending emails")
  }
  const from= envio.emailFrom
  if (!from) {
    console.log("Error sending emails")    
    throw new Error("Error sending emails")
  }

  const slug= client.slug || "newsletter"
  const BASE_URL = "https://planner.tinta.wine"

  const resend = new Resend(process.env.RESEND_API_KEY);

  const arrayOfEmails = emailsToSend.map((email) => {
    const mailId= email.id
    const banner = `${BASE_URL}/api/client/${slug}/banner/${mailId}`
    const linkUnsubscribe = `${BASE_URL}/api/client/${slug}/unsuscribe/${mailId}`

    return {
      from,
      to: email.emailTo,
      subject: newsletter.name,
      react: Newsletter({ content, banner, footerText, linkHref, linkText, linkUnsubscribe }),
    }
  })

  const { data, error } = await resend.batch.send(arrayOfEmails)

  if (error) {
    console.log("Error sending email", error)    
    return false
  } else {
    console.log("success sending emails")
    // set all Emails status to "sent"
    for (const email of emailsToSend) {
      const updated= await setEmailStatus(email.id, "sent", true)
      if (!updated) {
        console.log("Error updating email status")    
      }
    }
  }

  return true

}

export async function getFirstEnvioPendingOrSending() {
  const envio = await prisma.envio.findFirst({
    where: {
      status: {
        in: ["pending", "sending"]
      }
    },
    include: {
      newsletter: true,
      client: true
    }
  })
  return envio
}