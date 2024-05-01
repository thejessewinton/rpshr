import { type z } from 'zod'

import { exerciseRegex, setRegex } from '~/server/api/schemas/sets'
import { setInsertSchema } from '~/server/db/schema'
import dayjs, { normalizeDateString } from '~/utils/date'

export const transformSetString = (input: string) => {
  const sets: Omit<z.infer<typeof setInsertSchema>, 'sets' | 'user_id'>[] = []
  const exerciseMatch = input.match(exerciseRegex)

  if (exerciseMatch) {
    console.log({ exerciseMatch })
    const exercises = exerciseMatch[0].match(setRegex)
    if (!exercises) return null

    exercises.forEach((exercise) => {
      const [numberOfSets, numberOfReps, weight] = exercise.split(/\s+/)
      let date: Date = dayjs().toDate()

      date = normalizeDateString('04-28-2024')

      const set = setInsertSchema.omit({ user_id: true }).parse({
        reps: parseInt(numberOfReps!),
        weight: parseInt(weight!),
        sets: parseInt(numberOfSets!)
      })

      Array.from({ length: parseInt(numberOfSets!) }).forEach(() => {
        sets.push({ reps: set.reps, weight: set.weight, unit: set.unit ?? 'lbs', notes: 'notes?.trim()', date })
      })
    })
  }

  return sets
}

// 5 5 135lbs, 4 5 145lbs, 3 5 155lbs, Today, Felt great
