import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import Link from "next/link";
import ContentViewer from "./content-viewer";
import { getNewsletterDAO } from "@/services/newsletter-services";
import { EditNewsletterDialog } from "../../newsletter-dialogs";
import Image from "next/image";
import { redirect } from "next/navigation";
import { getClientBySlug } from "@/app/(server-side)/services/getClients";

type Props = {
    params: {
        slug: string
        newsletterId: string
    }
}
export default async function ArticlePreview({ params }: Props) {
    const newsletterId = params.newsletterId
    const slug= params.slug

    const newsletter = await getNewsletterDAO(newsletterId)
    if (!newsletter) {
        return <div>Newsletter not found</div>
    }

    let content= newsletter.contentJson
    if (!content) {
        content= JSON.stringify("")
    }

    if (newsletter.clientSlug !== slug) {
        redirect(`/agency/${slug}/newsletter/newsletters`)
    }

    const client= await getClientBySlug(slug)
    if (!client) {
        return <div>Client not found</div>
    }

    return (
        <div className="flex flex-col items-center p-1 md:p-4 xl:p-8">

            <p className="mb-4 text-3xl font-bold">{newsletter.name}</p>

            <Image className="rounded-t-md" src={`${client?.banner}`} width={1200} height={400} alt="Banner" />

            <ContentViewer content={content} />

            <div className="w-full p-4 bg-white rounded-md">
                <div className="mx-3">
                    <p className="mb-5 whitespace-pre-line">{client.footerText}</p>
                    <a href={client.linkHref} target="_blank" className="text-blue-500">{client.linkText}</a>
                </div>
            </div>

        </div>
  )
}
