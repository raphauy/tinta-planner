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
    const [timeCount, setTimeCount] = useState(timeFromCreationDate > 59 ? 0 : timeFromCreationDate)
    const [timeFromCrationCounter, setTimeFromCrationCounter] = useState(timeFromCreationDate)

    useEffect(() => {
        if (status === "CONNECTED") return

        setTimeFromCrationCounter(timeFromCrationCounter + 1)

        if (timeCount > 60) {
            setTimeCount(0)
            handleRefresh()
        }
        const interval = setInterval(() => {
            setTimeCount(timeCount + 1)
        }, 1000)
        return () => clearInterval(interval)
    }, [timeCount, status, timeFromCreationDate])

    function handleRefresh() {
        setLoadingRefresh(true)
        console.log("handleRefresh...")
        window.location.reload()
        setTimeout(() => {
            setLoadingRefresh(false)
        }, 2000)
    }

    function handleGenerateQR() {
        setLoadingQR(true)
        console.log("handleGenerateQR...")        
        generateQR()
        handleRefresh()
        setLoadingQR(false)
    }

    return (
        <div className="mt-10 flex flex-col items-center justify-center">
            {
                status === "DISCONNECTED" && 
                <>
                    {
                        timeFromCreationDate < 60 &&
                        <img src={qrURL} alt="QR code" width={400} height={400} />
                    }
                    
                    {
                        loadingRefresh ?
                        <Loader className="w-4 h-4 animate-spin" /> :
                        <p>QR generado hace {timeFromCrationCounter} segundos</p>
                    }
                    <Button onClick={handleRefresh} className="w-40" disabled={timeFromCrationCounter < 59}>
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
            
            <Button onClick={handleGenerateQR} className="w-40" disabled={status === "CONNECTED" || timeFromCreationDate < 59}>
                {
                    loadingQR ? 
                    <Loader className="w-4 h-4 animate-spin" /> :
                    <span>Generar QR</span>
                }
            </Button>
        </div>
    );
}