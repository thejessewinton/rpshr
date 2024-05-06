import { z } from 'zod'

export const workoutRegex =
  /\b(?:Today|Yesterday|\d{1,2}(?:\/\d{1,2}){1,2}(?:\s+)?(?:AD|BC)?(?:,)?|(\d+)\s*(?:(?:\s|x|@)\s*|\s)(\d+)\s+(\d+)(lbs|kgs)?\.?\s*(?:,(.*?))?\s*(?:,(.*?))?)$/i

export const setsRegex = /(\d+)\s+(\d+)\s+(\d+)(lbs?|kgs?)(?=(?:, |$))/g
export const setRegex = /(\d+|\w+)/g

export const dateAndNotesRegex = /\b(?:Today|Yesterday|\d{1,2}(?:[\/-]\d{1,2}){1,2}(?:\s+)?(?:,)?)(?:\s*,\s*)?(.*)$/

export const setSchema = z.object({
  sets: z.string().regex(setsRegex),
  lift_id: z.number()
})
