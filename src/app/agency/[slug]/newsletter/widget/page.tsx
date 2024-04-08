
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import 'highlight.js/styles/github-dark.css'; // Asegúrate de elegir un estilo que prefieras
import { getClientBySlug } from "@/app/(server-side)/services/getClients";
import CopyBox from "./copy-box";

type Props= {
    params: {
        slug: string
    }
}
export default async function WidgetPage({ params }: Props) {
    const slug= params.slug
    const client= await getClientBySlug(slug)
    if (!client){
        return <div>Cliente no encontrado</div>
    }
    return (
        <div className="mt-10">
            <p>Código para el head:</p>
            <div className="flex items-center">
                <ReactMarkdown
                    rehypePlugins={[rehypeHighlight]}
                >            
                    {
                        "\`\`\`html" + "\n" +
                        headStr + "\n" +
                        "\`\`\`"
                    }
                </ReactMarkdown>
                <CopyBox initialText={headStr} />
            </div>

            <p className="mt-10">Código para el body:</p>
            <div className="flex items-center">
                <ReactMarkdown
                    rehypePlugins={[rehypeHighlight]}
                >
                    {
                        "\`\`\`html" + "\n" +
                        getBodyHtml(client.id) + "\n" +
                        "\`\`\`"
                    }
                </ReactMarkdown>
                <CopyBox initialText={getBodyHtml(client.id)} />
            </div>

            <p className="mt-10">Ejemplo:</p>
            <ReactMarkdown
                rehypePlugins={[rehypeHighlight]}
            >            
                {getExampleHtml(client.id)}
            </ReactMarkdown>
        </div>
    );
}


const headStr= `
<link rel="stylesheet" href="https://subscriber.tinta.wine/style.css">
<script type="module" src="https://subscriber.tinta.wine/widget.js" defer></script>
`


function getBodyHtml(clientId: number) {
    return `<div data-client-id="${clientId}"/>`
}


function getExampleHtml(clientId: number) {
const htmlExample = `
\`\`\`html
<html lang="es">
    <head>
        <!-- Resto del código de tu head -->

        <link rel="stylesheet" href="https://subscriber.tinta.wine/style.css">
        <script type="module" src="https://subscriber.tinta.wine/widget.js" defer></script>
    </head>
    <body>
        <!-- Inicio del código de tu body -->
        <div data-client-id="${clientId}"/>
        <!-- Resto del código de tu body -->
    </body>
</html>
\`\`\`
`
    return htmlExample
}