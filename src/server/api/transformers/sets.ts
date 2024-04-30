import { type z } from 'zod'

import { exerciseRegex, setRegex } from '~/server/api/schemas/sets'
import { setInsertSchema } from '~/server/db/schema'
import dayjs, { normalizeDateString } from '~/utils/date'

export const parseExerciseString = (inputString: string) => {
  const matches = inputString.match(setRegex) ?? []

  return matches.map((match) => {
    const [sets, reps, weight, date, notes] = match.split(/\s+/)
    return { sets, reps, weight, date, notes }
  })
}

export const transformSetString = (input: string) => {
  const sets: Omit<z.infer<typeof setInsertSchema>, 'sets' | 'user_id'>[] = []

  const exerciseMatch = input.match(exerciseRegex)

  console.log({ exerciseMatch })

  if (exerciseMatch) {
    const exercises = parseExerciseString(exerciseMatch[0])

    console.log({ exercises })

    exercises.forEach((set) => {
      let date: Date = dayjs().toDate()

      date = normalizeDateString(set.date)

      const data = setInsertSchema.omit({ user_id: true }).parse({
        reps: parseInt(set.reps!),
        weight: parseInt(set.weight!),
        sets: parseInt(set.sets!)
      })

      console.log({ data })

      Array.from({ length: parseInt(set.sets!) }).forEach(() => {
        sets.push({ reps: data.reps, weight: data.weight, unit: data.unit ?? 'lbs', notes: data.notes?.trim(), date })
      })
    })
  }

  return { sets }
}

// 5 5 135lbs, 4 5 145lbs, 3 5 155lbs, Today, Felt great
