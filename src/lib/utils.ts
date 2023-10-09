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


export function getStatusLightColor(status: string) {
  switch (status) {
    case "Potencial":
      return "bg-pink-100"
    case "Calificado":
      return "bg-orange-100"
    case "Propuesta":
      return "bg-blue-100"
    case "Negociación" || "Negociacion":
      return "bg-purple-100"
    case "En Curso":
      return "bg-sky-100"
    case "Cerrado":
      return "bg-green-100"
      case "Perdido":
        return "bg-red-100"
      default:
      return "bg-gray-100"
  }  
}

export function getStatusDarkColor(status: string) {
  
  switch (status) {
    case "Potencial":
      return "bg-pink-400"
    case "Calificado":
      return "bg-orange-400"
    case "Propuesta":
      return "bg-blue-400"
    case "Negociación" || "Negociacion":
      return "bg-purple-400"
    case "En Curso":
      return "bg-sky-400"
    case "Cerrado":
      return "bg-green-400"
    case "Perdido":
        return "bg-red-400"
    default:
      return "bg-gray-400"
  }  
}