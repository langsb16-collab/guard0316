import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatNumber(num: number) {
  return new Intl.NumberFormat().format(num);
}

export function getRiskColor(score: number) {
  if (score >= 70) return "text-red-500";
  if (score >= 40) return "text-orange-500";
  return "text-emerald-500";
}

export function getRiskBg(score: number) {
  if (score >= 70) return "bg-red-500/10 border-red-500/20";
  if (score >= 40) return "bg-orange-500/10 border-orange-500/20";
  return "bg-emerald-500/10 border-emerald-500/20";
}
