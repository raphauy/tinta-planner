import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import Link from "next/link";
import ContentViewer from "./content-viewer";
import { getNewsletterDAO } from "@/services/newsletter-services";
import { defaultEditorContent } from "../page";
import { EditNewsletterDialog } from "../../newsletter-dialogs";
import Image from "next/image";
import { redirect } from "next/navigation";

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
        content= JSON.stringify(defaultEditorContent)
    }

    if (newsletter.clientSlug !== slug) {
        redirect(`/agency/${slug}/newsletter/newsletters`)
    }

    const baseUrl = process.env.NEXTAUTH_URL

    return (
        <div className="flex flex-col items-center p-1 md:p-4 xl:p-8">

            <p className="mb-4 text-3xl font-bold">{newsletter.name}</p>

            <Image className="rounded-t-md" src={`${baseUrl}/api/client/${newsletter.clientSlug}/banner/only-image`} width={1200} height={400} alt="Newsletter" />

            <ContentViewer content={content} />

        </div>
  )
}
