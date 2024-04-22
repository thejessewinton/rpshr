'use server'

import { z } from 'zod'
import { zfd } from 'zod-form-data'

import { resend } from '~/server/resend'

type FormState = {
  message: string
  success?: boolean
}

export const feedbackAction = async (prevState: FormState, formData: FormData) => {
  const schema = zfd.formData({
    message: z.string()
  })

  const { success, data } = await schema.safeParseAsync(formData)

  if (!success) return { success: true, message: 'Please try again.' }

  await resend.emails.send({
    from: 'Feedback Form <feedback@rpshr.app>',
    subject: 'On-site Feedback',
    to: 'jrandallwinton@gmail.com',
    text: data.message
  })

  return {
    success: true,
    message: `Thanks for your feedback.`
  }
}
