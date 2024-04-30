import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

import { type units } from '~/server/db/schema'

export const classNames = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs))
}

export const convertUnits = ({ weight, unit }: { weight: number; unit: (typeof units)[number] }) => {
  if (unit === 'kgs') {
    return weight * 2.2
  }

  return weight
}
