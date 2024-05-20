import axios from 'axios';
import https from 'https';

export const maxDuration = 30; // This function can run for a maximum of 30 seconds

export async function sendWapMessage(phone: string, text: string, quotedMsgId?: string, mediaUrl?: string, mimeType?: string): Promise<string> {

  const tintaEndpoint= process.env.TINTA_WHATSAPP_ENDPOINT + '/send'

  if (!tintaEndpoint) throw new Error("tintaEndpoint not found")

  const headers = {
    'Content-Type': 'application/json',
  }
  const data = {
    phone,
    text,
    quotedMsgId,
    mediaUrl,
  } 

  const attempts= 3
  for (let i = 0; i < attempts; i++) {
    try {
      const response = await axios.post(tintaEndpoint, data, {
        headers: headers,
        httpsAgent: new https.Agent({
          rejectUnauthorized: false,
        }),
      });
      const wapId= response.data.response.key.id
      console.log('Whatsapp Success:' + wapId)
      return wapId
    } catch (error) {
      console.error('Error:', error);
    }
  }

  throw new Error("Error sending whatsapp message")
}
