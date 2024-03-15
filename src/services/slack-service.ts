import fetch from 'node-fetch';

// Función para enviar un mensaje a Slack
export async function enviarMensajeSlack(mensaje: string): Promise<void> {
  const webhookUrl = process.env.SLACK_WEBHOOK_URL!;

  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text: mensaje, // El mensaje que quieres enviar
      }),
    });

    if (response.ok) {
      console.log('Mensaje enviado a Slack con éxito');
    } else {
      console.error('Error al enviar mensaje a Slack', response.statusText);
    }
  } catch (error) {
    console.error('Error al enviar mensaje a Slack', error);
  }
}
