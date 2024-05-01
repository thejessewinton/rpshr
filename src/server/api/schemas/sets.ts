import { z } from 'zod'

export const workoutRegex = /(\d+)\s+(\d+)\s+(\d+lbs?)(?=(?:, |$))/g

export const exerciseRegex =
  /\b(?:Today|Yesterday|\d{1,2}(?:\/\d{1,2}){1,2}(?:\s+)?(?:AD|BC)?(?:,)?|(\d+)\s*(?:(?:\s|x|@)\s*|\s)(\d+)\s+(\d+)(lbs|kgs)?\.?\s*(?:,(.*?))?\s*(?:,(.*?))?)$/

export const dateAndNotesRegex = /\b(?:Today|Yesterday|\d{1,2}(?:[\/-]\d{1,2}){1,2}(?:\s+)?(?:,)?)(?:\s*,\s*)?(.*)$/

export const setSchema = z.object({
  sets: z.string().regex(workoutRegex),
  lift_id: z.number()
})
