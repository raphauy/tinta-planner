import fetch from 'node-fetch';
import FormData from 'form-data';
import { Readable } from 'stream';
import { getMessageDAO } from '@/services/message-services';

export async function transcribeAudio(audioUrl: string): Promise<string> {
    const openaiApiKey = process.env.OPENAI_API_KEY;
    if (!openaiApiKey) {
        throw new Error('OpenAI API key not found');
    }

    try {
        // Descargar el archivo de audio en memoria
        const audioResponse = await fetch(audioUrl);
        if (!audioResponse.ok) throw new Error('No se pudo descargar el archivo de audio');
        const arrayBuffer = await audioResponse.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer); // Convertir ArrayBuffer a Buffer
        
        // Convertir Buffer a Stream
        const stream = Readable.from(buffer);
        
        // Preparar los datos para la solicitud a OpenAI
        const formData = new FormData();
        formData.append('file', stream, {
        filename: 'audio.mp3', // Asume un nombre de archivo genérico, ajusta según sea necesario
        contentType: 'audio/mp3', // Ajusta el tipo de contenido según sea necesario
        });
        formData.append('model', 'whisper-1');
        formData.append('response_format', 'text'); // Ajusta según tus preferencias

        // Realizar la solicitud de transcripción a OpenAI
        const openaiResponse = await fetch('https://api.openai.com/v1/audio/transcriptions', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${openaiApiKey}`,
            ...formData.getHeaders(),
        },
        body: formData,
        });

        if (!openaiResponse.ok) {
        throw new Error('Error en la respuesta de OpenAI');
        }

        const texto= await openaiResponse.text();
        console.log("texto:")
        console.log(texto)


        
        return texto;

    } catch (error) {
        console.error(error);
        throw new Error('Error al transcribir el audio');
    }
}
