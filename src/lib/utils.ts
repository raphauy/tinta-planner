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
