import React from 'react';

interface VCardProps {
  vCardContent: string;
}

export default function VCardDisplay({ vCardContent }: VCardProps) {

    let vCardObj: VCardData;
    try {
        vCardObj = parseVCard(vCardContent)
    } catch (error) {
        console.error('Error parsing vCard:', error);
        return <p>Error al parsear la vCard.</p>;
    }

    if (!vCardObj) {
        return <p>No se pudo parsear la vCard.</p>;
    }

    // Extraer información básica de manera segura
    const fullName = vCardObj.fullName
    const email = vCardObj.email
    const tel = vCardObj.phoneNumbers?.join(', ')

  return (
    <div>
      <h3>Información de Contacto</h3>
      <p>Nombre: {fullName}</p>
      <p>Teléfonos: {tel}</p>
      <p>Email: {email}</p>
    </div>
  );
}

interface VCardData {
    fullName: string | null;
    phoneNumbers: string[] | null;
    email: string | null;
  }
  
  function parseVCard(vCardContent: string): VCardData {
    const lines = vCardContent.split(/\r\n|\r|\n/);
    let fullName: string | null = null;
    let email: string | null = null;
    const phoneNumbers: string[] = [];
  
    lines.forEach(line => {
      if (line.startsWith('FN:')) {
        fullName = line.substring(3).trim();
      } else if (line.startsWith('TEL;')) {
        // Ajustamos esta expresión regular para capturar el número después de "waid="
        const phoneMatch = line.match(/waid=\d+:(\+?\d+ \d+ \d+ \d+)/);
        if (phoneMatch && phoneMatch[1]) {
          phoneNumbers.push(phoneMatch[1].trim());
        }
      } else if (line.startsWith('EMAIL;')) {
        const emailMatch = line.match(/EMAIL;[^:]+:(\S+)/);
        if (emailMatch && emailMatch[1]) {
          email = emailMatch[1].trim();
        }
      }
    });
  
    return {
      fullName,
      phoneNumbers: phoneNumbers.length > 0 ? phoneNumbers : null,
      email,
    };
  }  