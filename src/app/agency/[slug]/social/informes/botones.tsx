import { Button } from "@/components/ui/button";
import { DownloadCloud, UploadCloud } from "lucide-react";
import { FileDown } from "lucide-react";
import { draftInforme, getDataInforme, publishInforme } from "./gestionar/(crud)/actions";
import { revalidatePath } from "next/cache";
import PdfPage from "./pdf";

interface Props {
    informeId: string
    slug: string
}

export default async function Botones({ informeId, slug }: Props) {
    const informe= await getDataInforme(informeId)
    if (!informe) return <div></div>
  
    const draft= informe.status === "draft"

    async function handlePublish() {
        "use server"
        publishInforme(informeId)
        revalidatePath(`/agency/${slug}/social/informes/`)
    }

    async function handleDraft() {
        "use server"
        draftInforme(informeId)
        revalidatePath(`/agency/${slug}/social/informes/`)
    }

    return (
        <div className="flex gap-1 mb-1">
            <form action={handlePublish}>
                { draft && <Button className="w-32 h-8"><UploadCloud className="mr-2" />Publicar</Button> }
            </form>

            <form action={handleDraft}>
                { !draft && <Button variant="link" className="w-32 h-8"><DownloadCloud className="mr-2" />Draft</Button> }
            </form>

            <PdfPage pdfName={informe.name} />
        </div>
    )
}
