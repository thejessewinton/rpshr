import { TRPCError } from '@trpc/server'
import { eq } from 'drizzle-orm'

import { env } from '~/env'
import { createTRPCRouter, protectedProcedure } from '~/server/api/trpc'
import { db } from '~/server/db'
import { customer } from '~/server/db/schema'
import { stripe } from '~/server/stripe'

export const plansRouter = createTRPCRouter({
  getAllPlans: protectedProcedure.query(async () => {
    const { data } = await stripe.plans.list()

    return data
  }),
  getCheckoutSessionLink: protectedProcedure.query(async ({ ctx }) => {
    const currentCustomer = await db.query.customer.findFirst({
      where: eq(customer.user_id, ctx.session.user.id)
    })

    console.log(currentCustomer)

    if (!currentCustomer) {
      throw new TRPCError({
        code: 'BAD_REQUEST',
        message: 'Please try again.'
      })
    }

    try {
      return await stripe.checkout.sessions.create({
        customer: currentCustomer.stripe_customer_id,
        success_url: `${env.APP_URL}/profile?session_id={CHECKOUT_SESSION_ID}`,
        mode: 'subscription',
        line_items: [
          {
            price: 'price_1P9EpdEHYNNsKpHp5IlkDPVy',
            quantity: 1
          }
        ]
      })
    } catch (e) {
      console.log(e)
      throw new TRPCError({
        code: 'BAD_REQUEST',
        message: 'Please try again.'
      })
    }
  })
})
