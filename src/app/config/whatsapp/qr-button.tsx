"use client"

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Loader } from "lucide-react";
import { useEffect, useState } from "react";

type Props= {
    status: "CONNECTED" | "DISCONNECTED"
    qrURL: string
    lastModified: Date
    timeFromCreationDate: number
    generateQR: () => void
}
export default function QRButton({ status,qrURL, lastModified, timeFromCreationDate, generateQR }: Props) {

    const [loadingQR, setLoadingQR] = useState(false)
    const [loadingRefresh, setLoadingRefresh] = useState(false)    
    const [url, setUrl] = useState(qrURL)
    const [timeCount, setTimeCount] = useState(timeFromCreationDate)

    useEffect(() => {
        if (status === "CONNECTED") return

        if (timeCount > 60) {
            handleRefresh()
        }
        const interval = setInterval(() => {
            setTimeCount(timeCount + 1)
        }, 1000)
        return () => clearInterval(interval)
    }, [timeCount, status])

    function handleClick() {
        setLoadingQR(true)
        generateQR()
        handleRefresh()
        setLoadingQR(false)
    }

    function handleRefresh() {
        setLoadingRefresh(true)
        window.location.reload()
        setTimeout(() => {
            setLoadingRefresh(false)
        }, 2000)
    }

    return (
        <div className="mt-10 flex flex-col items-center justify-center">
            {
                status === "DISCONNECTED" && 
                <>                
                    <img src={qrURL} alt="QR code" width={400} height={400} />
                    <p>QR generado hace {timeCount} segundos</p>
                    <Button onClick={handleRefresh} className="w-40">
                        {
                            loadingRefresh ?
                            <Loader className="w-4 h-4 animate-spin" /> :
                            <span>Refresh</span>
                        }
                    </Button>
                </>
    
            }
            <Card className="p-4 my-10">
                <p>Última actualización: {lastModified.toLocaleString()}</p>
                <p>URL: {url}</p>
            </Card>
            
            <Button onClick={handleClick} className="w-40" disabled={status === "CONNECTED" || timeCount < 59}>
                {
                    loadingQR ? 
                    <Loader className="w-4 h-4 animate-spin" /> :
                    <span>Generar QR</span>
                }
            </Button>
        </div>
    );
}