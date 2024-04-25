import { z } from 'zod'

import { setRegex } from '~/server/api/validation/sets'
import { setInsertSchema } from '~/server/db/schema'

export const generateSetInsertData = (input: string) => {
  const matches = input.match(setRegex)

  if (!matches) return null

  const sets: Omit<z.infer<typeof setInsertSchema>, 'sets' | 'date' | 'user_id'>[] = []

  matches.forEach((match) => {
    const exerciseMatch = match.match(/(\d+)x(\d+)@(\d+)(lbs|kgs)?\.?/)
    if (exerciseMatch) {
      const [numberOfSets, numberOfReps, weight, unit] = exerciseMatch.slice(1)

      const data = setInsertSchema.omit({ user_id: true, date: true }).parse({
        reps: parseInt(numberOfReps!),
        weight: parseInt(weight!),
        sets: parseInt(numberOfSets!),
        unit
      })

      Array.from({ length: parseInt(numberOfSets!) }).forEach(() => {
        sets.push({ reps: data.reps, weight: data.weight, unit: data.unit })
      })
    }
  })

  return { sets: sets }
}
