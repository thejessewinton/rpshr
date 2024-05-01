import { type z } from 'zod'

import { dateAndNotesRegex, setRegex, setsRegex, workoutRegex } from '~/server/api/schemas/sets'
import { setInsertSchema } from '~/server/db/schema'
import dayjs, { normalizeDateString } from '~/utils/date'

export const transformSetString = (input: string) => {
  const sets: Omit<z.infer<typeof setInsertSchema>, 'sets' | 'user_id'>[] = []

  const exerciseMatch = input.match(workoutRegex)

  if (exerciseMatch) {
    const [firstMatch] = exerciseMatch

    const exercises = firstMatch.match(setsRegex)
    const dateAndNotes = firstMatch.match(dateAndNotesRegex)

    if (!exercises) return sets

    exercises.forEach((exercise) => {
      const [numberOfSets, numberOfReps, weight, unit] = exercise.match(setRegex)!

      const [dateString, notes] = dateAndNotes![0].split(/,\s*/)
      let date: Date = dayjs().toDate()

      date = normalizeDateString(dateString)

      const data = setInsertSchema.omit({ user_id: true }).parse({
        reps: parseInt(numberOfReps!),
        weight: parseInt(weight!),
        sets: parseInt(numberOfSets),
        unit
      })

      Array.from({ length: parseInt(numberOfSets) }).forEach(() => {
        sets.push({ reps: data.reps, weight: data.weight, unit: data.unit ?? 'lbs', notes: notes?.trim(), date })
      })
    })
  }

  return sets
}
