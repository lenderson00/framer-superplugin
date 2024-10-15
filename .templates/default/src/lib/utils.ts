import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const isLocal = () => window.location.hostname.includes("localhost");

export const API_BACKEND = isLocal()
  ? "http://localhost:8787/api/v1"
  : "https://plugins.cursodeframer.com.br/api/v1";
