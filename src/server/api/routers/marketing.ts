import { z } from 'zod'

import { env } from '~/env'
import { createTRPCRouter, publicProcedure } from '~/server/api/trpc'
import { resend } from '~/server/resend'

export const marketingRouter = createTRPCRouter({
  signup: publicProcedure
    .input(
      z.object({
        email: z.string().email()
      })
    )
    .mutation(async ({ input }) => {
      await resend.contacts.create({
        email: input.email,
        audienceId: env.WAITLIST_AUDIENCE_ID
      })

      return {
        message: "You'll be notified when rpshr launches."
      }
    }),
  feedback: publicProcedure
    .input(
      z.object({
        message: z.string().max(255)
      })
    )
    .query(async ({ input }) => {
      await resend.emails.send({
        from: 'Feedback Form <feedback@rpshr.app>',
        subject: 'On-site Feedback',
        to: 'jrandallwinton@gmail.com',
        text: input.message
      })

      return {
        message: 'Thanks for your feedback.'
      }
    })
})
