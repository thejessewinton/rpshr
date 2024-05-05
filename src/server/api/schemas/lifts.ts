import { z } from 'zod'

export const liftRegex =
  /([A-Za-z\s]+?),\s*(\d+)\s*(lbs|kgs)\.?,\s*([A-Za-z]+(?:\s+\d{1,2}[-/]\d{1,2})?|\d{1,2}[-/]\d{1,2})/i

export const liftSchema = z.object({
  lift: z.string().regex(liftRegex)
})
