import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function generateInviteCode (lenght:number){
  const character =
    "ABCDEFGHJKMLRTUYWQVXZOPSH0123456789abcdefghijklmnopqrstuvwxyz";

    let result = "";

    for (let i = 0; i < lenght; i++) {
      result += character.charAt(Math.floor(Math.random() * character.length));
    }
    return result;
}


export function snakeCaseToTitleCase(str:string){
  return str
    .toLowerCase()
    .replace(/_/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}