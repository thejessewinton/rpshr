import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs))
}

export const pluralize = (count: number, word: string) => {
  return `${word}${count !== 1 ? 's' : ''}`
}
