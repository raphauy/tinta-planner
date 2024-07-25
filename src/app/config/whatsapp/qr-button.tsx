"use client"

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Loader } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

type Props= {
    status: "CONNECTED" | "DISCONNECTED"
    qrURL: string
    lastModified: Date
    timeFromCreationDate: number
    generateQR: () => void
}
export default function QRButton({ status,qrURL, lastModified, timeFromCreationDate, generateQR }: Props) {

    const [loading, setLoading] = useState(false)
    const [url, setUrl] = useState(qrURL)

    const router= useRouter()

    function handleClick() {
        setLoading(true)
        generateQR()
        setLoading(false)
    }

    return (
        <div className="mt-10 flex flex-col items-center justify-center">
            {
                status === "DISCONNECTED" && <Image src={qrURL} alt="QR code" width={400} height={400} />
            }
            <Card className="p-4 my-10">
                <p>QR generado hace {timeFromCreationDate} minutos</p>
                <p>Última actualización: {lastModified.toLocaleString()}</p>
                <p>URL: {url}</p>
            </Card>
            
            <Button onClick={handleClick} className="w-40" disabled={status === "CONNECTED"}>
                {
                    loading ? 
                    <Loader className="w-4 h-4 animate-spin" /> :
                    <span>Generar QR</span>
                }
            </Button>
        </div>
    );
}