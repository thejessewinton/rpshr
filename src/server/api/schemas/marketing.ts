import { z } from 'zod'

export const waitlistSchema = z.object({
  email: z.string().email()
})

export const feedbackSchema = z.object({
  message: z.string().max(255)
})
