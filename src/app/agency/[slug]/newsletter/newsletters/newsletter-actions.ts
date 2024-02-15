"use server"
  
import getClients, { getClientById, getClientBySlug, getClientLightBySlug, setBanner, setFooter } from "@/app/(server-side)/services/getClients"
import { NewsletterDAO, NewsletterFormValues, createNewsletter, deleteNewsletter, getNewsletterDAO, updateContent, updateNewsletter } from "@/services/newsletter-services"
import { revalidatePath } from "next/cache"
    

export async function getNewsletterDAOAction(id: string): Promise<NewsletterDAO | null> {
    return getNewsletterDAO(id)
}

export async function createOrUpdateNewsletterAction(id: string | null, data: NewsletterFormValues): Promise<NewsletterDAO | null> {       
    let updated= null
    if (id) {
        updated= await updateNewsletter(id, data)
    } else {
        updated= await createNewsletter(data)
    }     

    revalidatePath("/newsletter/newsletters")

    return updated as NewsletterDAO
}

export async function deleteNewsletterAction(id: string): Promise<NewsletterDAO | null> {    
    const deleted= await deleteNewsletter(id)

    revalidatePath("/newsletter/newsletters")

    return deleted as NewsletterDAO
}
    
export async function updateContentAction(id: string, contentHtml: string, contentJson: string): Promise<NewsletterDAO | null> {
    
const updated= await updateContent(id, contentHtml, contentJson)

revalidatePath("/newsletter/newsletters")

return updated as NewsletterDAO
}


export async function getClientLightBySlugAction(slug: string) {
return getClientLightBySlug(slug)
}

export async function setBannerAction(slug: string, banner: string) {
const client= await getClientBySlug(slug)
if (!client) {
    return null
}
const updated= await setBanner(client.id, banner)
revalidatePath(`/agency/${slug}/newsletter/newsletters`)
return updated
}

export async function setFooterAction(slug: string, footerText: string, linkHref: string, linkText: string) {
    const client= await getClientBySlug(slug)
    if (!client) {
        return null
    }

    const updated= await setFooter(client.id, footerText, linkHref, linkText)

    revalidatePath(`/agency/${slug}/newsletter/newsletters`)

    return updated
}