import { type z } from 'zod'

import { dateAndNotesRegex, exerciseRegex, workoutRegex } from '~/server/api/schemas/sets'
import { setInsertSchema } from '~/server/db/schema'
import dayjs, { normalizeDateString } from '~/utils/date'

export const transformSetString = (input: string) => {
  const sets: Omit<z.infer<typeof setInsertSchema>, 'sets' | 'user_id'>[] = []

  const exerciseMatch = input.match(exerciseRegex)

  if (exerciseMatch) {
    const exercises = exerciseMatch[0].match(workoutRegex)
    const dateAndNotes = exerciseMatch[0].match(dateAndNotesRegex)
    if (!exercises) return sets

    exercises.forEach((exercise) => {
      const [numberOfSets, numberOfReps, weight] = exercise.split(/\s+/)

      const [dateString, notes] = dateAndNotes![0].split(/,\s*/)
      let date: Date = dayjs().toDate()

      date = normalizeDateString(dateString)

      const data = setInsertSchema.omit({ user_id: true }).parse({
        reps: parseInt(numberOfReps!),
        weight: parseInt(weight!),
        sets: parseInt(numberOfSets!)
      })

      Array.from({ length: parseInt(numberOfSets!) }).forEach(() => {
        sets.push({ reps: data.reps, weight: data.weight, unit: data.unit ?? 'lbs', notes: notes?.trim(), date })
      })
    })
  }

  return sets
}

// 5 5 135lbs, 4 5 145lbs, 3 5 155lbs, Today, Felt great
