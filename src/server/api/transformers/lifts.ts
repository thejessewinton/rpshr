import { z } from 'zod'

import { liftRegex } from '~/server/api/schemas/lifts'
import { liftInsertSchema, units } from '~/server/db/schema'
import { normalizeDateString } from '~/utils/date'

export const transformLiftString = (input: string) => {
  const match = input.match(liftRegex)

  if (!match) return

  const [name, weight, unit, dateString] = match.slice(1)
  const date = normalizeDateString(dateString)

  const data = liftInsertSchema
    .omit({ user_id: true })
    .extend({
      weight: z.number(),
      unit: z.enum(units)
    })
    .parse({
      name,
      weight: parseInt(weight!),
      unit: unit ?? 'lbs',
      date: date
    })

  return {
    ...data,
    date
  }
}
