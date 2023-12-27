import { ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getSlug(path: string) {
  
  const segments = path.split("/");
  const slug = segments[2];
  return slug;
}

export function getBasePath(path: string) {
  const segments = path.split("/");
  const slug = segments[1];
  return slug;
}


// returns the colors in rgba format
export function getStatusColor(status: string, opacity?: string) {

  switch (status) {
    case "Potencial":
      return `rgba(252, 165, 165, ${opacity || 1})`; // pink
    case "Calificado":
      return `rgba(51, 153, 255, ${opacity || 1})`; // sky
    case "Propuesta":
      return `rgba(255, 140, 0, ${opacity || 1})`; // orange
    case "Negociación":
    case "Negociacion":
      return `rgba(0, 0, 255, ${opacity || 1})`; // blue
    case "En Curso":
      return `rgba(163, 155, 254, ${opacity || 1})`; // purple
    case "Ganado":
      return `rgba(0, 128, 0, ${opacity || 1})`; // green
    case "Perdido":
      return `rgba(255, 0, 0, ${opacity || 1})`; // red
    default:
      return `rgba(156, 163, 175, ${opacity || 1})`; // gray
  }
}

export function getPostStatusColor(status: string, opacity?: string) {
  switch (status) {
    case "Draft":
      return `rgba(156, 163, 175, ${opacity || 1})`; // gray
    case "Revisado":
      return `rgba(255, 140, 0, ${opacity || 1})`; // orange
    case "Aprobado":
      return `rgba(0, 128, 0, ${opacity || 1})`; // green
    case "Programado":
      return `rgba(51, 153, 255, ${opacity || 1})`; // sky
    default:
      return `rgba(156, 163, 175, ${opacity || 1})`; // gray
    }
}
  