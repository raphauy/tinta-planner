import { enviarMensajeSlack } from "./slack-service"

async function main() {

    console.log("iniciando main")


    const mensaje= "Ping!"

    const res= await enviarMensajeSlack(mensaje)

}
  
main()
