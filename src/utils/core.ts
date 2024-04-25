import { clsx, type ClassValue } from 'clsx'
import dayjs, { type Dayjs } from 'dayjs'
import { twMerge } from 'tailwind-merge'
import { z } from 'zod'

import { units } from '~/server/db/schema'

export const classNames = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs))
}

export const getAllDaysInYear = () => {
  const year = dayjs().year()
  const currentDate = new Date(year, 0, 1)
  const daysArray: Array<{ date: Dayjs; isFirstOfMonth: boolean }> = []

  while (currentDate.getFullYear() === year) {
    daysArray.push({
      date: dayjs(currentDate),
      isFirstOfMonth: currentDate.getDate() === 1
    })
    currentDate.setDate(currentDate.getDate() + 1)
  }

  return daysArray
}
