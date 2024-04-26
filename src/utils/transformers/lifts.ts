import { z } from 'zod'

import { liftRegex } from '~/server/api/schemas/lifts'
import { liftInsertSchema } from '~/server/db/schema'
import { normalizeDate } from '~/utils/date'

export const transformLiftString = (input: string) => {
  const match = input.match(liftRegex)

  if (!match) return

  const [name, weight, unit, dateString] = match.slice(1)
  const date = normalizeDate(dateString)

  const data = liftInsertSchema
    .omit({ user_id: true })
    .extend({
      weight: z.number()
    })
    .parse({
      name,
      weight: parseInt(weight!),
      unit,
      date: date
    })

  return {
    ...data,
    date
  }
}
