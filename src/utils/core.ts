import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export const classNames = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs))
}

export const pluralize = (word: string, length: number) => {
  return length === 1 ? word : `${word}s`
}
