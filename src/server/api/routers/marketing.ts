import { TRPCError } from '@trpc/server'

import { env } from '~/env'
import { feedbackSchema, waitlistSchema } from '~/server/api/schemas/marketing'
import { createTRPCRouter, publicProcedure } from '~/server/api/trpc'
import { resend } from '~/server/resend'

export const marketingRouter = createTRPCRouter({
  signup: publicProcedure.input(waitlistSchema).mutation(async ({ input }) => {
    try {
      await resend.contacts.create({
        email: input.email,
        audienceId: env.WAITLIST_AUDIENCE_ID
      })

      return {
        message: "You'll be notified when rpshr launches."
      }
    } catch {
      throw new TRPCError({
        code: 'BAD_REQUEST',
        message: 'Please try again.'
      })
    }
  }),
  feedback: publicProcedure.input(feedbackSchema).mutation(async ({ ctx, input }) => {
    await resend.emails.send({
      from: `Feedback <feedback@rpshr.app>`,
      subject: 'On-site Feedback',
      to: 'jrandallwinton@gmail.com',
      html: `${input.message} <br /><br /> Pathname: ${input.pathname} <br /><br /> User: ${ctx.session.user?.name}`
    })

    return {
      message: 'Thanks for your feedback.'
    }
  })
})
