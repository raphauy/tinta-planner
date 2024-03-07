import { reduceText } from "@/lib/utils"
import { ImagePlus, Mic, Video } from "lucide-react"
import { BsFilePdfFill } from "react-icons/bs"

type Props = {
    name: string
    replayText: string
    mimeType: string
    mediaUrl?: string
}
export default function QuotedBox({ name, replayText, mimeType, mediaUrl }: Props) {
    const fileName= mediaUrl && mediaUrl.split("_@_")[1]
    if (!mimeType) 
        mimeType= ""
    return (
        <div className="bg-[#f0f0f0] rounded-lg p-2 mt-1 border-l-4 border-l-rose-500">
            <p className="text-xs text-[#00a884]">{name}</p>
            {mimeType === "" && <p className="text-xs line-clamp-2">{replayText}</p> }
            {mimeType.startsWith("audio") && <div className="flex items-center gap-2 mt-2 text-muted-foreground"><Mic /> Audio</div>}
            {mimeType.startsWith("image") && <div className="flex items-center gap-2 mt-2 text-muted-foreground"><ImagePlus /> Imagen</div>}
            {mimeType.startsWith("video") && <div className="flex items-center gap-2 mt-2 text-muted-foreground"><Video /> Video</div>}
            {mimeType.includes("pdf") && <div className="flex items-center gap-2 mt-2 text-muted-foreground"><BsFilePdfFill size={25} className='text-red-500' /> {fileName ? reduceText(fileName, 35) : "Archivo PDF"}</div>}
        </div>
    )
}
