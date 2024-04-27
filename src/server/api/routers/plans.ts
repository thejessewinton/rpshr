import { TRPCError } from '@trpc/server'

import { createTRPCRouter, protectedProcedure } from '~/server/api/trpc'
import { stripe } from '~/server/stripe'

export const plansRouter = createTRPCRouter({
  getAllPlans: protectedProcedure.query(async () => {
    const { data } = await stripe.plans.list()

    return data
  }),
  getCheckoutSessionLink: protectedProcedure.query(async () => {
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
