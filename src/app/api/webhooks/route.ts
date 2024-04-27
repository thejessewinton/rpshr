import type Stripe from 'stripe'

import { env } from '~/env'
import { stripe } from '~/server/stripe'

const relevantEvents = new Set([
  'checkout.session.completed',
  'customer.subscription.created',
  'customer.subscription.updated',
  'customer.subscription.deleted'
])

export const POST = async (req: Request) => {
  const body = await req.text()
  const sig = req.headers.get('stripe-signature')!
  let event: Stripe.Event

  try {
    if (!sig) return new Response('Webhook secret not found.', { status: 400 })
    event = stripe.webhooks.constructEvent(body, sig, env.STRIPE_WEBHOOK_SECRET)
  } catch (e) {
    return new Response('Invalid webhook secret.', { status: 400 })
  }

  if (relevantEvents.has(event.type)) {
    try {
      switch (event.type) {
        case 'customer.subscription.created':
        case 'customer.subscription.updated':
        // case 'customer.subscription.deleted':
        //   const subscription = event.data.object

        //   break
        // case 'checkout.session.completed':
        //   const checkoutSession = event.data.object

        //   break
        default:
          throw new Error('Unhandled event')
      }
    } catch (error) {
      console.log(error)
      return new Response('Webhook handler failed.', {
        status: 400
      })
    }
  } else {
    return new Response(`Unsupported event type: ${event.type}`, {
      status: 400
    })
  }
  return new Response(JSON.stringify({ received: true }))
}
