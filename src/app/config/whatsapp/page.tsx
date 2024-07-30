import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import RefreshButton from "./refresh-button";
import QRButton from "./qr-button";
import { redirect } from "next/navigation";

export const dynamic= 'force-dynamic'

export default async function ComponentNamePage() {

  
  const whatsappEndpoint= process.env.TINTA_WHATSAPP_ENDPOINT
  const connectionStatusUrl= whatsappEndpoint + "/connection-status"
  const getQRUrl= whatsappEndpoint + "/get-qr"

  let statusResponse
  try {
    statusResponse= await fetch(connectionStatusUrl)
  } catch (error) {
    console.log("Error fetching connectionStatusUrl: " + error)
    return <div className="mt-10">Error al acceder a {connectionStatusUrl}</div>
  }
  const statusJson= await statusResponse.json()
  console.log("statusJson: " + JSON.stringify(statusJson))  
  const success= statusJson.success
  let label= "Whatsapp conectado"
  if (!success) {
    label= "Whatsapp desconectado"
  }

  const dataURL= `${process.env.NEXTAUTH_URL}/api/qr-creation-time`
  const qrInfoResponse= await fetch(dataURL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.CRON_SECRET}`
    },
    body: JSON.stringify({url: getQRUrl})
  })
  const qrInfoJson= await qrInfoResponse.json()
  const lastModified:Date= new Date(qrInfoJson.lastModified)
  const timeFromCreationDate= qrInfoJson.timeFromCreationDate

  async function generateQR() {
    "use server"
    console.log("generateQR...")
    const generateQRUrl= whatsappEndpoint + "/generate-qr"
    const response= await fetch(generateQRUrl)
    const json= await response.json()
    const success= json.success
    if (!success) {
      console.log("Error al generar QR")
    } else {
      console.log("QR generado")
      redirect("/config/whatsapp")
    }
  }

  return (
    <div className="flex flex-col items-center w-full space-y-4 mt-10">
      <Badge className={success ? "bg-green-500" : "bg-red-500"}>{label}</Badge>

      <div>
        <QRButton 
          qrURL={getQRUrl} 
          timeFromCreationDate={timeFromCreationDate} 
          lastModified={lastModified} 
          generateQR={generateQR} 
          status={success ? "CONNECTED" : "DISCONNECTED"}
        />
      </div>
    </div>
  );
}