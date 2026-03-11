import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


const formatDateUtc = (value?: string) => {
  if (!value) return "—";
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(value));
};

const getInitials = (value: string) => {
  if (!value || !value.trim()) return "AP";
  return value.trim().slice(0, 2).toUpperCase();
};

export { formatDateUtc, getInitials };