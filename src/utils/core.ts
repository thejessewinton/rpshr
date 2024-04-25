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

interface Exercise {
  reps: number
  weight: number
  unit: (typeof units)[number]
}

const setSchema = z.object({
  reps: z.string().transform(Number),
  sets: z.string().transform(Number),
  weight: z.string().transform(Number),
  unit: z.enum(units),
  date: z.string(),
  notes: z.string().max(50).optional()
})

export const transformSetString = (input: string) => {
  const regex = /(\d+)x(\d+)@(\d+)(lbs|kgs)?\.?,?\s*/g
  const matches = input.match(regex)
  if (!matches) return null

  const excercises: Omit<z.infer<typeof setSchema>, 'sets' | 'date'>[] = []
  let note: string | null = null
  let date: string | null = null

  for (const match of matches) {
    const exerciseMatch = match.match(/(\d+)x(\d+)@(\d+)(lbs|kgs)?\.?/)
    if (exerciseMatch) {
      const [sets, reps, weight, unit, rawDate, notes] = exerciseMatch.slice(1)

      date = rawDate === 'Today' ? dayjs().format('YYYY-MM-DD') : dayjs(rawDate).format('YYYY-MM-DD')

      const data = setSchema.parse({
        reps,
        weight,
        sets,
        date,
        unit: unit ?? 'lbs',
        notes
      })

      Array.from({ length: data.sets }).forEach(() => {
        excercises.push({ reps: data.reps, weight: data.weight, unit: data.unit })
      })
    }
  }

  const notesMatch = input.match(/Today,?\s*(.*)/)
  if (notesMatch && notesMatch[1]) {
    note = notesMatch[1].trim()
  }

  return { sets: excercises, date, note }
}
