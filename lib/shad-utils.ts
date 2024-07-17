import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function cnc(toggle: boolean, ...inputs: string[]) {
	if (!toggle) return "";
	return inputs.join(" ");
}
