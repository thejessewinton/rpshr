'use server'

import { z } from 'zod'
import { zfd } from 'zod-form-data'

import { env } from '~/env'
import { resend } from '~/server/resend'

const waitlistSchema = zfd.formData({
  email: z.string().email()
})

type FormState = {
  message: string
  success: boolean
}

export const waitlist = async (prevState: FormState, formData: FormData) => {
  const { email } = waitlistSchema.parse(formData)

  await resend.contacts.create({
    email: email,
    audienceId: env.WAITLIST_AUDIENCE_ID
  })

  return {
    success: true,
    message: `You'll be notified when rpshr launches.`
  }
}

const feedbackSchema = zfd.formData({
  message: z.string()
})

export const feedbackAction = async (prevState: FormState, formData: FormData) => {
  const { message } = feedbackSchema.parse(formData)

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
}
