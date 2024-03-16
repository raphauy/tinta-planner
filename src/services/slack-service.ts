
// Función para enviar un mensaje a Slack
export async function sendSlackMessage(mensaje: string, webhookUrl: string): Promise<boolean> {

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
      return true
    } else {
      console.error('Error al enviar mensaje a Slack', response.statusText);
      return false
    }
  } catch (error) {
    console.error('Error al enviar mensaje a Slack', error)
    return false
  }
}

export async function sendSlackGeneralMessage(mensaje: string): Promise<boolean> {
  const webhookUrl = process.env.GENERAL_SLACK_WEBHOOK_URL;
  if (!webhookUrl) {
    console.error('No se ha configurado el webhook de Slack');
    return false;
  }

  return sendSlackMessage(mensaje, webhookUrl);
}