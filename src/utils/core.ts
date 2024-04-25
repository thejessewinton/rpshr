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

const setSchema = z.object({
  reps: z.string().transform(Number),
  sets: z.string().transform(Number),
  weight: z.string().transform(Number),
  unit: z.enum(units),
  date: z.string(),
  notes: z.string().max(50).optional()
})

export const transformSetString = (input: string) => {
  const regex =
    /(\d+)x(\d+)@(\d+)(lbs|kgs)?\.?,?\s*((?:Today|(?:0?[1-9]|1[0-2])[- /.](?:0?[1-9]|[12][0-9]|3[01])[- /.](?:19|20)\d\d)?)(?:,\s*([\w\s]*))?/g

  const matches = input.matchAll(regex)
  if (!matches) return null

  const exercises: Omit<z.infer<typeof setSchema>, 'sets' | 'date'>[] = []
  let note: string | null = null
  let date: string | null = null

  for (const match of matches) {
    const [, sets, reps, weight, unit, dateString, notes] = match
    console.log('notes', notes, dateString)
    date = dateString === 'Today' ? dayjs().format('YYYY-MM-DD') : dayjs(dateString).format('YYYY-MM-DD')
    note = notes ? notes.trim() : null

    const data = setSchema.parse({
      reps,
      weight,
      sets,
      date,
      unit: unit ?? 'lbs'
    })

    Array.from({ length: Number(data.sets) }).forEach(() => {
      exercises.push({ reps: data.reps, weight: data.weight, unit: data.unit })
    })
  }

  return { sets: exercises, date, note }
}
