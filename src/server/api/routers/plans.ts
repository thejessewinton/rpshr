import { TRPCError } from '@trpc/server'
import { z } from 'zod'

import { env } from '~/env'
import { createTRPCRouter, protectedProcedure } from '~/server/api/trpc'
import { resend } from '~/server/resend'
import { stripe } from '~/server/stripe'

export const plansRouter = createTRPCRouter({
  getCheckoutSessionLink: protectedProcedure.mutation(async ({ input }) => {
    try {
      return await stripe.checkout.sessions.create({})
    } catch {
      throw new TRPCError({
        code: 'BAD_REQUEST',
        message: 'Please try again.'
      })
    }
  })
})
