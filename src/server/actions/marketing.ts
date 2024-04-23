'use server'

import { z } from 'zod'
import { zfd } from 'zod-form-data'

import { env } from '~/env'
import { publicAction } from '~/server/actions'
import { logsnag } from '~/server/logsnag'
import { resend } from '~/server/resend'

const waitlistSchema = zfd.formData({
  email: z.string().email()
})

export const waitlist = publicAction(waitlistSchema, async ({ email }) => {
  await resend.contacts.create({
    email: email,
    audienceId: env.WAITLIST_AUDIENCE_ID
  })

  await logsnag.track({
    channel: 'waitlist',
    event: 'New Waitlist Signup',
    user_id: email,
    icon: '🚀',
    notify: true
  })

  return {
    success: true,
    message: `You'll be notified when rpshr launches.`
  }
})

const feedbackSchema = zfd.formData({
  message: z.string()
})

export const feedbackAction = publicAction(feedbackSchema, async ({ message }) => {
  await resend.emails.send({
    from: 'Feedback Form <feedback@rpshr.app>',
    subject: 'On-site Feedback',
    to: 'jrandallwinton@gmail.com',
    text: message
  })

  return {
    success: true,
    message: `Thanks for your feedback.`
  }
})
