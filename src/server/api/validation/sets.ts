import { z } from 'zod'

export const setRegex = /(\d+)x(\d+)@(\d+)(lbs|kgs)?\.?,?\s*/g

export const setSchema = z.object({
  sets: z.string().regex(setRegex),
  lift_id: z.number()
})
