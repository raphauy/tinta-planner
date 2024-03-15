import { enviarMensajeSlack } from "./slack-service"

async function main() {

    console.log("iniciando main")


    const mensaje= "Aquí aparecerán los mensajes que llegan al whatsapp de Tinta a modo de notificación."

    const res= await enviarMensajeSlack(mensaje)

}
  
//main()
