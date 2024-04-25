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
    /(\d+)x(\d+)@(\d+)(lbs|kgs)?\.?,?\s*((?:Today|(?:0?[1-9]|1[0-2])[- /.](?:0?[1-9]|[12][0-9]|3[01])[- /.](?:19|20)\d\d|(?:January|February|March|April|May|June|July|August|September|October|November|December)\s(?:0?[1-9]|[12][0-9]|3[01])(?:st|nd|rd|th)?,\s\d{4}))(?:,\s*(.*))?/g

  let match
  const exercises: Omit<
    {
      date: string
      unit: 'kgs' | 'lbs'
      sets: number
      reps: number
      weight: number
      notes?: string | undefined
    },
    'date' | 'sets'
  >[] = []
  let note: string | undefined
  let date: string | null = null

  while ((match = regex.exec(input)) !== null) {
    console.log(match)
    const [, , reps, weight, unit, dateString, notes] = match
    date = dateString === 'Today' ? dayjs().format('YYYY-MM-DD') : dayjs(dateString).format('YYYY-MM-DD')
    note = notes ? notes.trim() : undefined

    exercises.push({
      reps: Number(reps),
      weight: Number(weight),
      unit: unit as (typeof units)[number],
      notes: note
    })
  }

  return { sets: exercises, date, note }
}
