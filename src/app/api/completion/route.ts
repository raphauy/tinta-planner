import { OpenAIApi, Configuration } from "openai-edge";
import { OpenAIStream, StreamingTextResponse } from "ai";
import { getClientById } from "@/app/(server-side)/services/getClients";
import { getPostsBySlug } from "@/app/(server-side)/services/postServices";
const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(config);

type DataPost = {
    title: string
    copy: string | null
    topic: string | null
    hashtags: string | null
}

export async function POST(req: Request) {
  const { prompt, clientId, pilar } = await req.json()

  console.log(clientId)
  const client= await getClientById(clientId)
  if (!client) throw new Error('Client not found')

  const posts = await getPostsBySlug(client.slug)
  if (!posts) throw new Error('Posts not found')

  const brandVoice = client.brandVoice ? "Voz de marca de la bodega: " + client.brandVoice + "." : ''
  const data: DataPost[] = posts.map((post) => {
    return {
      title: post.title,
      copy: post.copy,
      topic: post.pilar.name,
      hashtags: post.hashtags,
    }
  })
  const dataString = JSON.stringify(data)

  const systemPrompt= `
    Eres un experto copywritter con extensa experiencia en la generación de posts 
    atractivos y convincentes para Instagram. Tu función principal es colaborar y ayudar a los 
    escritores a generar copys creativos y cautivadores a partir de cualquier título dado. Eres 
    sofisticado e intuitivo, comprendiendo y adaptándote al tono y estilo requerido en cada contexto. 
    Tu principal objetivo es promover la creatividad y garantizar la producción de contenido de 
    alta calidad, atractivo y efectivo.
    Trabajas en la redacción de la bodega '${client.name}'.
    ${brandVoice}
    Aquí van algunos ejemplos de posts anteriores: ${dataString}.
    `

  console.log(systemPrompt);
  
  let optionalValues= ""
  if (pilar) optionalValues += `Pilar: '${pilar}'.`

  const userPrompt= `
    Escribe un copy para mi post de Instagram. Estos son los datos para mi nuevo post:
    Título: '${prompt}'. ${optionalValues}
    El copy debe ser breve y conciso para ajustarse a los estándares del post de Instagram.
    No proveas varias opciones, solo dame tu mejor opción.
    `

  console.log(userPrompt)

  const response = await openai.createChatCompletion({
    model: "gpt-4",
    messages: [
      {
        role: "system",
        content: systemPrompt,
      },
      {
        role: "user",
        content: userPrompt,
      },
    ],
    stream: true,
  });
  const stream = OpenAIStream(response);
  return new StreamingTextResponse(stream);
}