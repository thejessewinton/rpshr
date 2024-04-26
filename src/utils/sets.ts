import { z } from 'zod'

import { exerciseRegex, setRegex } from '~/server/api/validation/sets'
import { setInsertSchema } from '~/server/db/schema'
import dayjs from './date'

export const generateSetInsertData = (input: string) => {
  const matches = input.match(setRegex)

  if (!matches) return null

  const sets: Omit<z.infer<typeof setInsertSchema>, 'sets' | 'user_id'>[] = []
  matches.forEach((match) => {
    const exerciseMatch = match.match(exerciseRegex)

    if (exerciseMatch) {
      const [numberOfSets, numberOfReps, weight, unit, dateString, notesString] = exerciseMatch.slice(1)
      const normalizeDate = dateString?.toLowerCase().trim()

      let date: Date = dayjs().toDate()
      let notes: string | undefined

      date =
        normalizeDate === 'today'
          ? dayjs().toDate()
          : normalizeDate === 'yesterday'
            ? dayjs().subtract(1, 'day').toDate()
            : dayjs(dateString).toDate()
      notes = notesString

      const data = setInsertSchema.omit({ user_id: true }).parse({
        reps: parseInt(numberOfReps!),
        weight: parseInt(weight!),
        sets: parseInt(numberOfSets!),
        unit
      })

      Array.from({ length: parseInt(numberOfSets!) }).forEach(() => {
        sets.push({ reps: data.reps, weight: data.weight, unit: data.unit, notes, date })
      })
    }
  })

  return { sets }
}
