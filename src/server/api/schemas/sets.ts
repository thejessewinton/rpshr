import { z } from 'zod'

export const setRegex = /(\d+)\s+(\d+)\s+(\d+lbs?)(?=(?:, |$))/g
export const exerciseRegex = /(\d+)\s*(?:(?:\s|x|@)\s*|\s)(\d+)\s+(\d+)(lbs|kgs)?\.?\s*(?:,(.*?))?\s*(?:,(.*?))?$/

export const setSchema = z.object({
  sets: z.string().regex(setRegex),
  lift_id: z.number()
})
