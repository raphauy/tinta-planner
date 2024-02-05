import { getNewsletterDAO } from "@/services/newsletter-services";
import NovelOnClient from "./editor-on-client";
import { EditNewsletterDialog } from "../newsletter-dialogs";
import Image from "next/image";
import { redirect } from "next/navigation";

type Props = {
    params: {
        slug: string
        newsletterId: string
    }
}
export default async function Novel({ params }: Props) {
    const { slug, newsletterId } = params
    const newsletter= await getNewsletterDAO(newsletterId)
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
        <div className="flex flex-col w-full p-1 md:p-4 xl:p-8">
            <div className="flex items-center justify-center gap-4 mb-4">
                <p className="text-3xl font-bold">{newsletter.name}</p>
                <EditNewsletterDialog id={newsletter.id} />
            </div>

            <Image className="rounded-t-md" src={`${baseUrl}/api/client/${newsletter.clientSlug}/banner/only-image`} width={1200} height={400} alt="Newsletter" />

            <NovelOnClient newsletterId={newsletterId} initialContent={content} slug={newsletter.clientSlug} />

        </div>
    )
}

export const defaultEditorContent = {
    type: "doc",
    content: [
      {
        type: "heading",
        attrs: { level: 2 },
        content: [{ type: "text", text: "Soy un título 2" }],
      },
      {
        type: "paragraph",
        content: [
            {
                type: "text",
                text: "Este es un editor al estilo de Notion con autocompletado impulsado por IA.",
            },
        ],
      },
      {
        type: "paragraph",
        content: [
            {
                type: "text",
                text: "Prueba digitando la barra diagonal / al inicio de un párrafo para ver las opciones de autocompletado. También puedes escribir ++ para que la IA te complete una frase.",
            },
        ],
      },    ],
  };