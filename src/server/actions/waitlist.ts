'use server'

import { eq } from 'drizzle-orm'
import { z } from 'zod'
import { zfd } from 'zod-form-data'

import { env } from '~/env'
import { db } from '~/server/db'
import { users } from '~/server/db/schema'
import { logsnag } from '~/server/logsnag'
import { resend } from '../resend'

type FormState = {
  message: string
  success?: boolean
}

export const waitlistAction = async (prevState: FormState, formData: FormData) => {
  const schema = zfd.formData({
    email: z.string().email()
  })

  const { success, data } = await schema.safeParseAsync(formData)

  if (!success) return { success: true, message: 'Please enter a valid email.' }

  await resend.contacts.create({
    email: data.email,
    audienceId: env.WAITLIST_AUDIENCE_ID
  })

  await logsnag.track({
    channel: 'waitlist',
    event: 'New Waitlist Signup',
    user_id: data.email,
    icon: '🚀',
    notify: true
  })

  return {
    success: true,
    message: `You'll be notified when rpshr launches.`
  }
}
