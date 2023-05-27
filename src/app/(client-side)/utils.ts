const options = {
    weekday: 'short' as const,
    hour: '2-digit' as const,
    minute: '2-digit' as const
  };

  // Crear el formateador de fecha y hora
  export const formatter = new Intl.DateTimeFormat('es', options);